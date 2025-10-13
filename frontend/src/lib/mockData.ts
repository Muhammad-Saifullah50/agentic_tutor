import { StudyMode, Question, Flashcard } from "@/types";

export async function generateMockExplanation(topic: string, mode: StudyMode): Promise<string> {
  // Send the topic and mode to the backend
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: topic.trim(),
        mode: mode,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data, 'data')
    return data.explanation

    
  } catch (error) {
    console.error('Error sending message:', error);
    // You might want to show an error message to the user here
    
  }
}

export function generateMockQuestions(topic: string, mode: StudyMode): Question[] {
  const baseQuestions = [
    {
      id: "q1",
      question: `What is the primary purpose of ${topic}?`,
      options: [
        "To provide a framework for understanding",
        "To complicate simple concepts",
        "To replace existing methods",
        "To serve as an alternative approach"
      ],
      correctAnswer: 0,
      explanation: `The primary purpose of ${topic} is to provide a framework for understanding and applying related concepts effectively.`
    },
    {
      id: "q2",
      question: `Which of the following is a key component of ${topic}?`,
      options: [
        "Random implementation",
        "Structured methodology",
        "Unorganized approach",
        "Isolated application"
      ],
      correctAnswer: 1,
      explanation: `${topic} relies on structured methodology to ensure consistent and reliable results.`
    },
    {
      id: "q3",
      question: `How does ${topic} relate to practical applications?`,
      options: [
        "It's purely theoretical",
        "It has no real-world use",
        "It bridges theory and practice",
        "It only applies in specific cases"
      ],
      correctAnswer: 2,
      explanation: `${topic} effectively bridges theoretical concepts with practical applications, making it valuable in real-world scenarios.`
    },
    {
      id: "q4",
      question: `What level of understanding does ${topic} require?`,
      options: [
        "Surface-level awareness only",
        "Deep comprehension of fundamentals",
        "No prior knowledge needed",
        "Expert-level mastery from start"
      ],
      correctAnswer: 1,
      explanation: `Understanding ${topic} requires deep comprehension of its fundamental principles to apply it effectively.`
    },
    {
      id: "q5",
      question: `Which best describes the importance of ${topic}?`,
      options: [
        "Optional supplementary knowledge",
        "Foundational for advanced topics",
        "Outdated approach",
        "Niche application only"
      ],
      correctAnswer: 1,
      explanation: `${topic} serves as a foundational concept that's essential for understanding more advanced topics.`
    }
  ];

  // Return different number of questions based on mode
  if (mode === "beginner") {
    return baseQuestions.slice(0, 3);
  } else if (mode === "practice") {
    return baseQuestions.slice(0, 4);
  } else {
    return baseQuestions;
  }
}

export function generateMockFlashcards(topic: string, mode: StudyMode): Flashcard[] {
  const allFlashcards = [
    {
      id: "f1",
      front: `What is ${topic}?`,
      back: `${topic} is a fundamental concept that provides a framework for understanding and applying related ideas in various contexts.`,
      remembered: false
    },
    {
      id: "f2",
      front: `Why is ${topic} important?`,
      back: `${topic} is important because it forms the foundation for more advanced concepts and has practical applications in real-world scenarios.`,
      remembered: false
    },
    {
      id: "f3",
      front: `What are the key components of ${topic}?`,
      back: `The key components include theoretical foundation, practical applications, and systematic methodology for implementation.`,
      remembered: false
    },
    {
      id: "f4",
      front: `How do you apply ${topic} in practice?`,
      back: `Apply ${topic} by understanding the fundamentals, identifying appropriate contexts, and implementing structured approaches based on the principles.`,
      remembered: false
    },
    {
      id: "f5",
      front: `What are common misconceptions about ${topic}?`,
      back: `Common misconceptions include thinking it's purely theoretical or overly complex. In reality, ${topic} is practical and accessible with proper understanding.`,
      remembered: false
    },
    {
      id: "f6",
      front: `How does ${topic} connect to other concepts?`,
      back: `${topic} serves as a bridge between foundational knowledge and advanced applications, connecting multiple related areas of study.`,
      remembered: false
    },
    {
      id: "f7",
      front: `What skills are needed to master ${topic}?`,
      back: `Mastering ${topic} requires critical thinking, systematic analysis, practical application skills, and understanding of underlying principles.`,
      remembered: false
    },
    {
      id: "f8",
      front: `When should you use ${topic}?`,
      back: `Use ${topic} when you need a structured approach to understanding complex ideas or solving problems that require systematic thinking.`,
      remembered: false
    }
  ];

  // Return different numbers based on mode
  if (mode === "beginner") {
    return allFlashcards.slice(0, 5);
  } else if (mode === "practice") {
    return allFlashcards.slice(0, 6);
  } else {
    return allFlashcards;
  }
}
