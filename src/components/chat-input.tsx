"use client"
import { Message } from "@/types"
import fetcher from "@/utils/fetch-messages"
import { Session } from "next-auth"
import React, { FormEvent, useRef } from "react"
import useSWR from "swr"
import { v4 as uuid } from "uuid"

interface Props {
  session: Session | null
}
function ChatInput({ session }: Props) {
  const messageInputRef = useRef<HTMLInputElement>(null)
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/messages", fetcher)

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!session || !messageInputRef) return

    if (messageInputRef.current && messageInputRef.current.value != "") {
      const inputedMessage = messageInputRef.current.value

      const message: Message = {
        id: uuid(),
        message: inputedMessage,
        created_at: Date.now(),
        username: session?.user?.name || "",
        email: session?.user?.email || "",
        profilePic: session?.user?.image || "",
      }

      const uploadMessageToUpstash = async () => {
        const data = await fetch("/api/addMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }).then((res) => res.json())

        console.log("message: ", data.message)
        console.log("messages: ", messages!)

        return [data.message, ...messages!]
      }

      await mutate(uploadMessageToUpstash, {
        optimisticData: [message, ...messages!],
        rollbackOnError: true,
      })

      messageInputRef.current.value = ""
    }
  }

  return (
    <form
      onSubmit={(e) => onSubmitHandler(e)}
      className="bg-white fixed bottom-0 px-10 py-5 z-50 w-full flex justify-between items-center space-x-2 border-t border-gray-100"
    >
      <input
        ref={messageInputRef}
        disabled={!session}
        type="text"
        className="flex-1 h-9 rounded border-gray-300 border
        focus:outline-none focus:ring-2 focus:ring-green-600 focus-transparent px-5 py-3 
        disabled:opacity disabled:cursor-not-allowed"
        placeholder="Enter message here..."
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  )
}

export default ChatInput
