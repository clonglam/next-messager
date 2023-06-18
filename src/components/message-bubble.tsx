import { Message } from "@/types"
import { useSession } from "next-auth/react"
import Image from "next/image"
import React from "react"

type Props = { message: Message }

function MessageBubble({ message }: Props) {
  const { data: session } = useSession()
  const isUser = session && session?.user?.email != message.email

  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "hidden"}`}>
        <Image
          className="rounded-full mx-2 aspect-square"
          src={message.profilePic}
          alt={`${message.username}_profilepic`}
          height={10}
          width={50}
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] first-letter:
        ${isUser ? "hidden" : "text-red-400 text-left"}
        `}
        >
          {message.username}
        </p>

        <div className="flex items-end">
          <div
            className={` w-fit  px-3 py-2 rounded-lg ${
              isUser
                ? "bg-[#E0FFD1] text-[#081305]"
                : " bg-white text-[#151515]"
            }`}
          >
            <span>{message.message}</span>

            <span className="text-[0.65rem] italic px-2 text-gray-400">
              {new Date(message.created_at).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
