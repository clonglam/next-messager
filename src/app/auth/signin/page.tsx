import SignInComponent from "@/components/SignInComponent"
import { Icons } from "@/components/icons"
import { Metadata } from "next"
import { getProviders } from "next-auth/react"
import React from "react"

type Props = {}
export const metadata: Metadata = {
  title: "Signin to Whatsapp",
}

async function SigninPage({}: Props) {
  const providers = await getProviders()

  return (
    <div className="max-w-md lg:max-w-2xl mx-auto px-5 flex flex-col items-center justify space-y-5 min-h-[85vh]">
      <div className="py-[10%]">
        <Icons.whatsapp className="rounded-full mx-2 w-20 h-20" />
      </div>

      <SignInComponent providers={providers} />
    </div>
  )
}

export default SigninPage
