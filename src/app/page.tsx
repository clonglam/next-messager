import ChatInput from "@/components/chat-input"
import MessageList from "@/components/message-list"
import { env } from "@/env.mjs"
import { Message } from "@/types"
import { getServerSession } from "next-auth"
import React from "react"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { Metadata } from "next"

type Props = {}

export const metadata: Metadata = {
  title: "Whatsapp Clone",
}

async function HomePage({}: Props) {
  const session = await getServerSession(authOptions)

  const data = await fetch(env.NEXT_PUBLIC_APP_URL + "/api/getMessages").then(
    (res) => res.json()
  )

  const messages: Message[] = data.messages

  return (
    <main className="pb-10">
      <div className="bg-gray-100 min-h-[100vh]">
        <MessageList initialMessages={messages} session={session} />
        <ChatInput session={session} />
      </div>
    </main>
  )
}

export default HomePage
