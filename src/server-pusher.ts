import Pusher from "pusher"
import { env } from "./env.mjs"

export const serverPusher = new Pusher({
  appId: env.PUSHER_SERVER_APPID,
  key: env.PUSHER_SERVER_KEY,
  secret: env.PUSHER_SERVER_SECRET,
  cluster: env.PUSHER_SERVER_CLUSTER,
  useTLS: true,
})
