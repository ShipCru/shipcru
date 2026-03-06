export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json(
    {
      timestamp: Date.now(),
      iso: new Date().toISOString(),
      rand: Math.random(),
    },
    {
      headers: { 'Cache-Control': 'no-store' },
    },
  )
}
