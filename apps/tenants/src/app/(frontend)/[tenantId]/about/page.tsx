import { DemoNav } from '@/components/demo/DemoNav'
import { DemoOriginBanner } from '@/components/demo/DemoOriginBanner'
import { DemoProgrammaticNav } from '@/components/demo/DemoProgrammaticNav'

export default function About() {
  return (
    <div className="min-h-screen">
      <DemoOriginBanner origin="cloudflare" />
      <DemoNav />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">About (Cloudflare)</h1>
        <p className="text-gray-600 mb-6">
          This version of /about is served by Cloudflare via OpenNext.
          If you see this, the Router Worker is correctly routing to the new origin.
        </p>
        <DemoProgrammaticNav targetPath="/" label="Navigate programmatically to / (router.push)" />
      </main>
    </div>
  )
}
