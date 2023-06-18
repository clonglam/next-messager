import redis from "@/redis"
import { Message } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  messages: Message[]
}

type ErrorData = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ body: "Method NOt Allowed" })
    return
  }

  try {
    const messagesRes = await redis.hvals("messages")

    const messages: Message[] = messagesRes
      .map((message) => JSON.parse(message))
      .sort((a, b) => a.created_at - b.created_at)

    res.status(200).json({ messages })
  } catch (err) {
    res.status(403).json({ body: "There is some error occured." })
  }
}
