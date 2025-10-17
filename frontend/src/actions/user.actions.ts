'use server'

import { auth } from "@clerk/nextjs/server"
import { db } from "../lib/prisma"

export const getCurrentUserfromDb = async () => {
    try {
        const { userId } = await auth()

        const dbUser = await db.user.findUnique({
            where: {
                clerkId: userId
            }
        })

        return dbUser
    } catch (error) {
        console.error('Error fetching currentUser', error)
    }
}