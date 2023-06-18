import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    // NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    // GITHUB_ACCESS_TOKEN: z.string().min(1),
    REDIS_URL: z.string().min(1),

    PUSHER_SERVER_APPID: z.string().min(1),
    PUSHER_SERVER_KEY: z.string().min(1),
    PUSHER_SERVER_SECRET: z.string().min(1),
    PUSHER_SERVER_CLUSTER: z.string().min(1),

    // SMTP_FROM: z.string().min(1),
    // POSTMARK_API_TOKEN: z.string().min(1),
    // POSTMARK_SIGN_IN_TEMPLATE: z.string().min(1),
    // POSTMARK_ACTIVATION_TEMPLATE: z.string().min(1),
    // STRIPE_API_KEY: z.string().min(1),
    // STRIPE_WEBHOOK_SECRET: z.string().min(1),
    // STRIPE_PRO_MONTHLY_PLAN_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_PUSHER_KEY: z.string().min(1),
    NEXT_PUBLIC_PUSHER_CLUSTER: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    // GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    REDIS_URL: process.env.REDIS_URL,
    PUSHER_SERVER_APPID: process.env.PUSHER_SERVER_APPID,
    PUSHER_SERVER_KEY: process.env.PUSHER_SERVER_KEY,
    PUSHER_SERVER_SECRET: process.env.PUSHER_SERVER_SECRET,
    PUSHER_SERVER_CLUSTER: process.env.PUSHER_SERVER_CLUSTER,

    // SMTP_FROM: process.env.SMTP_FROM,
    // POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
    // POSTMARK_SIGN_IN_TEMPLATE: process.env.POSTMARK_SIGN_IN_TEMPLATE,
    // POSTMARK_ACTIVATION_TEMPLATE: process.env.POSTMARK_ACTIVATION_TEMPLATE,
    // STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    // STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    // STRIPE_PRO_MONTHLY_PLAN_ID: process.env.STRIPE_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_PUSHER_KEY: process.env.NEXT_PUBLIC_PUSHER_KEY,
    NEXT_PUBLIC_PUSHER_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
