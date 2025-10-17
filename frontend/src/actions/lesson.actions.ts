'use server'

import { db } from "../lib/prisma"
import { StudyMode } from "../types"
import { getCurrentUserfromDb } from "./user.actions"

export const createLesson = async (topic: string, clerkId: string, mode: StudyMode) => {

    try {

        const user = await getCurrentUserfromDb();

        const lesson = await db.lesson.create({
            data: {
                topic,
                mode,
                clerkId: clerkId,
                flashcards: [],
                questions: [],
                userId: user.id
            }
        });

        return lesson
    } catch (error) {
        
    }
}


