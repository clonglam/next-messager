"use client"
import { signOut } from "next-auth/react"
import React from "react"

type Props = {}

function LogoutButton({}: Props) {
  return (
    <button
      onClick={() => signOut()}
      className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
    >
      Sign Out
    </button>
  )
}

export default LogoutButton
