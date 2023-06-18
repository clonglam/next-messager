import React from "react"
import { Icons } from "./icons"
import Link from "next/link"
import LogoutButton from "./logout-button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

type Props = {}

async function SiteHeader({}: Props) {
  const session = await getServerSession(authOptions)

  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center px-5 py-3 shadow-sm max-w-4xl mx-auto">
        <div className="flex space-x-2 items-center">
          <Icons.whatsapp className="w-6 h-6 md:w-10 md:h-10" />

          <div>
            <p className="text-green-600 text-sm">Logged in as:</p>
            <p className="text-gray-800 font-semibold">{session.user?.name}</p>
          </div>
        </div>

        <LogoutButton />
      </header>
    )

  return (
    <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm max-w-4xl mx-auto">
      <div className="flex items-center space-x-5 text-gray-600">
        <Icons.whatsapp className="w-6 h-6 md:w-10 md:h-10" />

        <p className="text-sm md:text-md">Welcome to Whatsapp Business</p>
      </div>

      <Link
        href="/auth/signin"
        className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-2 rounded-md"
      >
        Sign In
      </Link>
    </header>
  )
}

export default SiteHeader
