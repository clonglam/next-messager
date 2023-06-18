"use client"

import { env } from "@/env.mjs"
import { getProviders, signIn } from "next-auth/react"
import React from "react"

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

function SignInComponent({ providers }: Props) {
  return (
    <div>
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-gray-100 px-5 py-3 rounded shadow-sm"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: env.NEXT_PUBLIC_APP_URL,
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default SignInComponent
