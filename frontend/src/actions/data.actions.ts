'use server'
import { Flashcard, Question } from "../types";

import { StudyMode } from "./../types";

export async function generateExplanation(topic: string, mode: StudyMode): Promise<string | undefined> {
  // Send the topic and mode to the backend
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: mode,
        stage: 'explain',
        prompt: 'Explain this topic: ' + topic
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.explanation


  } catch (error) {
    console.error('Error sending message:', error);
    return {error: 'There was an error generating explanation' };
  
  }
}

export async function generateQuestions(topic: string, mode: StudyMode): Promise<Question[] | undefined> {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: mode,
        // have to tell the llm to change no. of questions a/c to mode
        stage: 'quiz',
        prompt: ` Generate ${mode === 'beginner' ? 3 : mode === 'practice' ? 4 : 5} questions related to this topic: ${topic}`
      }),

    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.questions

  } catch (error) {
    console.error('Error sending message:', error);
    return {error: 'There was an error generating questions' };
  }
}




export async function generateFlashcards(topic: string, mode: StudyMode): Promise<Flashcard[] | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: topic.trim(),
        mode: mode,
        stage: 'review',
        prompt: ` Generate ${mode === 'beginner' ? 3 : mode === 'practice' ? 4 : 5} flashcards related to this topic: ${topic}`

      }),

    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.flashcards


  } catch (error) {
    console.error('Error sending message:', error);
        // You might want to show an error message to the user here
    return {error: 'There was an error generating flashcards' };

  }
}
