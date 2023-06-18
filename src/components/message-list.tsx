"use client"

import { Message } from "@/types"
import fetcher from "@/utils/fetch-messages"
import React, { useEffect } from "react"
import useSWR from "swr"
import MessageBubble from "./message-bubble"
import { clientPusher } from "@/clientPusher"
import { Session } from "next-auth"

type Props = {
  initialMessages: Message[]
  session: Session | null
}

function MessageList({ initialMessages, session }: Props) {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/messages", fetcher)

  useEffect(() => {
    const channel = clientPusher.subscribe("messages")

    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return

      if (!messages) {
        mutate(fetcher)
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        })
      }

      return () => {
        channel.unbind_all()
        channel.unsubscribe()
      }
    })
  }, [messages, mutate])
  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessages).map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList
