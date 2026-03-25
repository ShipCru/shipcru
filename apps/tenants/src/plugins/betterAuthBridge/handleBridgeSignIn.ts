import type { BetterAuthInstance } from './betterAuth'
import type { CockroachDb } from './db'

import { eq } from 'drizzle-orm'
import { createLocalReq, getPayload } from 'payload'
import configPromise from '@payload-config'

import { mintPayloadToken } from './mintPayloadToken'
import { users } from './schema'
import { syncShadowUser } from './syncUser'

export async function handleBridgeSignIn(
  request: Request,
  auth: BetterAuthInstance,
  crdb: CockroachDb,
) {
  const payload = await getPayload({ config: configPromise })

  try {
    let body: { email?: string; password?: string }
    try {
      body = await request.json()
    } catch {
      return Response.json({ error: 'Request body must be valid JSON' }, { status: 400 })
    }

    const { email, password } = body || {}

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Verify credentials via better-auth against CockroachDB
    let authResponse: Response
    try {
      authResponse = await auth.api.signInEmail({
        body: { email, password },
        asResponse: true,
      })
    } catch (authError) {
      console.error('[Bridge] signInEmail failed:', authError)
      return Response.json({ error: 'Authentication service unavailable' }, { status: 503 })
    }

    if (!authResponse.ok) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Fetch the full user from CockroachDB (better-auth response
    // may not include all fields like permissions)
    let crdbUser
    try {
      crdbUser = await crdb.query.users.findFirst({
        where: eq(users.email, email),
      })
    } catch {
      return Response.json({ error: 'Authentication service unavailable' }, { status: 503 })
    }

    if (!crdbUser) {
      return Response.json({ error: 'User not found' }, { status: 401 })
    }

    const req = await createLocalReq({}, payload)

    // Sync shadow user in Payload's Neon DB
    const shadowUser = await syncShadowUser(
      payload,
      {
        id: crdbUser.id,
        email: crdbUser.email,
        name: crdbUser.name,
        permissions: crdbUser.permissions,
      },
      req,
    )

    // Mint Payload JWT and set cookie
    const { token, cookieName, maxAge, secure, sameSite } = await mintPayloadToken(
      payload,
      shadowUser,
      req,
    )

    const cookieParts = [
      `${cookieName}=${token}`,
      'HttpOnly',
      'Path=/',
      `Max-Age=${maxAge}`,
      `SameSite=${sameSite}`,
    ]
    if (secure) cookieParts.push('Secure')

    return Response.json({ success: true }, { headers: { 'Set-Cookie': cookieParts.join('; ') } })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Authentication failed'

    const isKnownError = message.includes('not available') || message.includes('Invalid')

    payload.logger.error({ err: error }, 'Bridge sign-in error')

    return Response.json(
      { error: isKnownError ? message : 'Authentication failed' },
      { status: 500 },
    )
  }
}
