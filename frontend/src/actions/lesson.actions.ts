'use server'

import { db } from "../lib/prisma"
import { Flashcard, Question, StudyMode } from "../types"
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


export const getLesson = async (lessonId: string) => {
    try {
        const lesson = await db.lesson.findUnique({
            where: {
                id: lessonId
            }
        })

        return lesson
    } catch (error) {
        console.error('Error fetching lesson:', error)

    }
}

export const updateLessonWithExplanation = async (lessonId: string, explanation: string) => {
    try {
        await db.lesson.update({
            where: {
                id: lessonId
            },
            data: {
                explanation
            }
        })
    } catch (error) {
        console.error('Error updating lesson:', error)
    }
}

export const updateLessonWithQuestions = async (lessonId: string, questions: Question[]) => {
    try {
        await db.lesson.update({
            where: {
                id: lessonId
            },
            data: {
                questions
            }
        })
    } catch (error) {
        console.error('Error updating lesson:', error)
    }
}

export const updateLessonWithFlashcards = async (lessonId: string, flashcards: Flashcard[]) => {
    try {
        await db.lesson.update({
            where: {
                id: lessonId
            },
            data: {
                flashcards
            }
        })
    } catch (error) {
        console.error('Error updating lesson:', error)
    }
}