'use client'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const getUrl = () => window.location.href
const getTime = () => new Date().toISOString()
const getEmpty = () => ''

export function DemoOriginBanner({ origin }: { origin: 'vercel' | 'cloudflare' }) {
  const url = useSyncExternalStore(subscribe, getUrl, getEmpty)
  const time = useSyncExternalStore(subscribe, getTime, getEmpty)

  const bg = origin === 'vercel' ? 'bg-blue-600' : 'bg-green-600'

  return (
    <div className={`${bg} text-white p-3 text-sm font-mono`}>
      <p>Served by: <strong>{origin.toUpperCase()}</strong></p>
      <p>URL: {url}</p>
      <p>Rendered at: {time}</p>
    </div>
  )
}
