import NextAuth, { AuthOptions } from "next-auth"
import googleProvider from "next-auth/providers/google"
import { db } from "@/prisma/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters"


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        googleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async session({session, user}) {
            session.user = {...session.user, id: user.id} as {
                id: string,
                name: string,
                email: string,
            };
            return session
        },
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }