import { StudyMode, Question, Flashcard } from "@/types";

export function generateMockExplanation(topic: string, mode: StudyMode): string {
  const explanations = {
    beginner: `# Understanding ${topic}

Let me break down **${topic}** in simple terms for you.

## What is it?

${topic} is a fundamental concept that helps us understand how things work. Think of it as a building block that forms the foundation of more complex ideas.

## Key Points

1. **Foundation**: ${topic} serves as a starting point for learning
2. **Applications**: It's used in many real-world scenarios
3. **Importance**: Understanding this concept opens doors to more advanced topics

## Simple Example

Imagine you're learning to ride a bike. ${topic} is like learning to balance first - once you master this basic skill, everything else becomes easier.

## Why It Matters

Understanding ${topic} helps you:
- Build stronger foundational knowledge
- Connect related concepts together
- Apply these ideas in practical situations

Ready to test your understanding? Let's move on to some questions!`,
    
    practice: `# Deep Dive: ${topic}

Now let's explore **${topic}** with more depth and practical applications.

## Core Concepts

${topic} involves several interconnected ideas that work together to create a comprehensive framework for understanding.

### Key Components

1. **Theoretical Foundation**: The underlying principles that govern ${topic}
2. **Practical Applications**: How ${topic} is applied in real-world scenarios
3. **Advanced Considerations**: Edge cases and special situations to be aware of

## Detailed Breakdown

### Primary Aspects
- **Structure**: How ${topic} is organized and implemented
- **Functionality**: What ${topic} accomplishes and why it's effective
- **Integration**: How ${topic} connects with related concepts

### Common Patterns

You'll often see ${topic} used in conjunction with other methodologies to achieve optimal results. Understanding these patterns helps you apply the concept more effectively.

## Practice Applications

Consider scenarios where ${topic} plays a crucial role:
- Problem-solving situations
- Decision-making processes
- Strategic planning contexts

Let's test your understanding with some challenging questions!`,
    
    exam: `# Comprehensive Analysis: ${topic}

An in-depth examination of **${topic}** covering theoretical foundations, practical applications, and advanced considerations.

## Academic Framework

${topic} represents a significant area of study with far-reaching implications across multiple domains.

### Theoretical Underpinnings

1. **Historical Context**: The evolution of ${topic} and its development over time
2. **Core Principles**: Fundamental laws and theories that define ${topic}
3. **Research Foundations**: Key studies and findings that shaped our understanding

## Critical Analysis

### Strengths and Limitations

**Advantages:**
- Provides robust framework for analysis
- Enables systematic approach to complex problems
- Facilitates reproducible results

**Considerations:**
- Context-dependent effectiveness
- Requires careful implementation
- May need adaptation for specific scenarios

### Advanced Applications

${topic} extends beyond basic applications to include:
- **Cross-disciplinary Integration**: How ${topic} intersects with other fields
- **Innovation Opportunities**: Ways to advance the field
- **Future Directions**: Emerging trends and research areas

## Synthesis

Mastering ${topic} requires understanding not just the "what" and "how," but also the "why" and "when." This holistic approach enables you to apply the concept effectively across diverse contexts.

## Critical Thinking

Consider:
- How does ${topic} compare to alternative approaches?
- What assumptions underlie the application of ${topic}?
- How might ${topic} evolve in the future?

Prepare for comprehensive assessment questions that test depth of understanding!`
  };

  return explanations[mode];
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
