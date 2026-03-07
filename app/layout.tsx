import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Use deployment URL so og:image works when sharing (set NEXT_PUBLIC_SITE_URL in prod, or Vercel sets VERCEL_URL)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://v0-marklanding.vercel.app')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Mark – The World\'s First AI Bookmark',
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
      { url: '/favicon.ico', sizes: '256x256', type: 'image/x-icon' },
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
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1802973231089444');
fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://www.facebook.com/tr?id=1802973231089444&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
