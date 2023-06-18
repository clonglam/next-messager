import { getServerSession } from "next-auth/next"

import { Providers } from "@/components/providers"
import SiteHeader from "@/components/site-header"
import "@/styles/globals.css"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  )
}
