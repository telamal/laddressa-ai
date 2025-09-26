import './globals.css'

export const metadata = {
  title: 'Laddrressa.ai - AI-Powered Local Business Discovery',
  description: 'Discover local businesses with AI-powered search and recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}