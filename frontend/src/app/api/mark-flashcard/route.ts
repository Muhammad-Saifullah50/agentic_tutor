import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real application, you would save the flashcard result to a database
    // This is a simplified version that just returns success
    return Response.json({ 
      success: true,
      message: body.remembered ? 'Flashcard marked as remembered' : 'Flashcard marked as forgotten'
    });
  } catch (error) {
    console.error('Error processing flashcard mark:', error);
    return Response.json({ error: 'Failed to process flashcard mark' }, { status: 500 });
  }
}