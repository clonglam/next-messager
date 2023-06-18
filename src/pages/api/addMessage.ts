import redis from "@/redis"
import { serverPusher } from "@/server-pusher"
import { Message } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  message: Message
}

type ErrorData = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ body: "Method NOt Allowed" })
    return
  }

  const { message } = req.body

  const newMessage = {
    ...message,
    created_at: Date.now(),
  }

  try {
    await redis.hset(`messages`, message.id, JSON.stringify(newMessage))

    serverPusher.trigger("messages", "new-message", newMessage)

    res.status(200).json({ message: newMessage })
  } catch (err) {
    res.status(403).json({ body: "There is some error occured." })
  }
}
