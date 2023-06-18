import { env } from "@/env.mjs"
import Redis from "ioredis"

const redis = new Redis(env.REDIS_URL)

export default redis
