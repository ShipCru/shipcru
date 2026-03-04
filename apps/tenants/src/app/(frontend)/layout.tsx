import { Metadata } from 'next'
import React from 'react'

import { getServerSideURL } from '@/utils/getURL'
import { mergeOpenGraph } from '@/utils/mergeOpenGraph'

import '@/assets/styles/globals.css'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-primary antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@rocket_resume',
  },
}
