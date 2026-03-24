import { DemoNav } from '@/components/demo/DemoNav'
import { DemoOriginBanner } from '@/components/demo/DemoOriginBanner'

export default function Pricing() {
  return (
    <div className="min-h-screen">
      <DemoOriginBanner origin="cloudflare" />
      <DemoNav />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Pricing (Cloudflare)</h1>
        <p className="text-gray-600">
          This version of /pricing is served by Cloudflare via OpenNext.
          If you see this, the Router Worker is correctly routing to the new origin.
        </p>
      </main>
    </div>
  )
}
