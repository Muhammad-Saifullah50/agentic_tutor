import { StudyMode, Question, Flashcard } from "./../types";

export async function generateMockExplanation(topic: string, mode: StudyMode): Promise<string> {
  // Send the topic and mode to the backend
  try {
    const response = await fetch(`http://localhost:8000/send-message`, {
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
    // You might want to show an error message to the user here

  }
}

export async function generateMockQuestions(topic: string, mode: StudyMode) {

  try {
    const response = await fetch(`http://localhost:8000/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: mode,
        // have to tell the llm to change no. of questions a/c top mode
        stage: 'quiz',
        prompt: ` Generate 3 questions related to this topic: ${topic}`
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.questions
    // have to send data corrxcclkty from here 

  } catch (error) {
    console.error('Error sending message:', error);
    // You might want to show an error message to the user here

  }
  // Return different number of questions based on mode
  // if (mode === "beginner") {
  //   return baseQuestions.slice(0, 3);
  // } else if (mode === "practice") {
  //   return baseQuestions.slice(0, 4);
  // } else {
  //   return baseQuestions;
  // }
}

export async function generateMockFlashcards(topic: string, mode: StudyMode) {
  try {
    const response = await fetch(`http://localhost:8000/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: topic.trim(),
        mode: mode,
        stage: 'review',
        prompt: ` Generate 4 flashcards related to this topic: ${topic}`

      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data, 'data')
    return data.flashcards


  } catch (error) {
    console.error('Error sending message:', error);
    // You might want to show an error message to the user here

  }
}
