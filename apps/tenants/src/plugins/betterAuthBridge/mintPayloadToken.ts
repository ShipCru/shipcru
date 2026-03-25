import type { User } from '@/payload-types'
import type { Payload, PayloadRequest } from 'payload'

import { getFieldsToSign, jwtSign } from 'payload'
import { addSessionToUser } from 'payload/shared'

export async function mintPayloadToken(payload: Payload, user: User, req: PayloadRequest) {
  const sanitizedConfig = payload.collections.users.config
  const authConfig = sanitizedConfig.auth

  let sid: string | undefined
  if (authConfig.useSessions) {
    const session = await addSessionToUser({
      collectionConfig: sanitizedConfig,
      payload,
      req,
      user: { ...user, collection: 'users' },
    })
    sid = session.sid
  }

  const fieldsToSign = getFieldsToSign({
    collectionConfig: sanitizedConfig,
    email: user.email,
    sid,
    user: { ...user, collection: 'users' },
  })

  const tokenExpiration = authConfig.tokenExpiration ?? 7200
  const { token } = await jwtSign({
    fieldsToSign,
    secret: payload.secret,
    tokenExpiration,
  })

  const cookieOpts = authConfig.cookies
  const cookieName = `${payload.config.cookiePrefix ?? 'payload'}-token`
  const secure = cookieOpts?.secure ?? process.env.NODE_ENV === 'production'
  const sameSite = cookieOpts?.sameSite === false ? 'Lax' : (cookieOpts?.sameSite ?? 'Lax')

  return { token, cookieName, maxAge: tokenExpiration, secure, sameSite }
}
