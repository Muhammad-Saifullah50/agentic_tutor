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
                flashcards: [],
                questions: [],
                userId: user.id
            }
        });

        return lesson
    } catch (error) {
        console.error('error creating leson', error)
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

export const getUserLessons = async () => {
    try {
        const user = await getCurrentUserfromDb();

        if (!user) {
            throw new Error('User not authenticated');
        }

        const lessons = await db.lesson.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return lessons;
    } catch (error) {
        console.error('Error fetching user lessons:', error);
        return []
    }
}

export const getLessonById = async (lessonId: string) => {
    try {
        const lesson = await db.lesson.findUnique({
            where: {
                id: lessonId
            },
        })

        return lesson
    } catch (error) {
        console.error('Error fetching lesson:', error)
        return null
    }
}