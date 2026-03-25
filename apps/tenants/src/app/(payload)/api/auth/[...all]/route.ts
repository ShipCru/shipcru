import { getAuth, getCockroachDb } from '@/plugins/betterAuthBridge'
import { handleBridgeSignIn } from '@/plugins/betterAuthBridge/handleBridgeSignIn'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const url = new URL(request.url)

  if (url.pathname.endsWith('/auth/bridge/sign-in')) {
    return handleBridgeSignIn(request, getAuth(), getCockroachDb())
  }

  return new Response('Not Found', { status: 404 })
}

export async function GET() {
  return new Response('Not Found', { status: 404 })
}
