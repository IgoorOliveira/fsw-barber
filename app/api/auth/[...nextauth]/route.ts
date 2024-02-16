import NextAuth from "next-auth"
import googleProvider from "next-auth/providers/google"
import { db } from "@/prisma/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters"

const handler = NextAuth({
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        googleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ]
  
})

export { handler as GET, handler as POST }