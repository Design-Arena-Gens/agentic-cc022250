import { NextResponse } from 'next/server';
import { generateStoryboard } from '@/lib/storyboard';
import { storyboardRequestSchema } from '@/lib/validation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = storyboardRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const storyboard = await generateStoryboard(parsed.data);

    return NextResponse.json(storyboard);
  } catch (error) {
    console.error('Storyboard generation failed', error);
    return NextResponse.json(
      {
        error: 'Unable to generate storyboard'
      },
      { status: 500 }
    );
  }
}
