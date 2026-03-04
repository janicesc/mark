import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Use deployment URL so og:image works when sharing (Vercel sets VERCEL_URL; use env override for production)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://v0-marklanding.vercel.app')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Mark – The World\'s First AI Bookmark | Mark Engineering',
  description: 'Turn what you underline into searchable knowledge. Mark captures your highlights and turns physical notes into digital insights.',
  generator: 'v0.app',
  openGraph: {
    title: 'Mark – The World\'s First AI Bookmark',
    description: 'Turn what you underline into searchable knowledge. Mark captures your highlights and turns physical notes into digital insights.',
    url: siteUrl,
    siteName: 'Mark',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Mark – The World\'s First AI Bookmark',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mark – The World\'s First AI Bookmark',
    description: 'Turn what you underline into searchable knowledge.',
    images: ['/og.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
