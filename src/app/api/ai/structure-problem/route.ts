import { structureProblem, MOCK_RESPONSES } from '@/lib/ai/gemini';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { problem } = body;

    if (!problem || typeof problem !== 'string' || problem.trim().length === 0) {
      return NextResponse.json(
        { error: 'Problem text is required' },
        { status: 400 }
      );
    }

    // Call Gemini to structure the problem
    const structured = await structureProblem(problem);

    // If structuring fails, return mock response
    if (!structured) {
      return NextResponse.json(
        {
          ...MOCK_RESPONSES.structuredProblem,
          demo: true,
          message: 'Using demo data - AI service unavailable',
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      ...structured,
      demo: false,
    });
  } catch (error) {
    console.error('Error in structure-problem route:', error);

    // Return mock response on error
    return NextResponse.json(
      {
        ...MOCK_RESPONSES.structuredProblem,
        demo: true,
        message: 'Using demo data - error occurred',
      },
      { status: 200 }
    );
  }
}
