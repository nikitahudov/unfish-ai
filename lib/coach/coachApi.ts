import type { Message, CoachMode } from '@/types/coach';
import { buildCoachContext } from './contextBuilder';
import { buildSystemPrompt } from './promptBuilder';

interface CoachResponse {
  message: string;
  error?: string;
}

export async function sendMessageToCoach(
  messages: Message[],
  mode: CoachMode
): Promise<CoachResponse> {
  try {
    const context = buildCoachContext();
    const systemPrompt = buildSystemPrompt(context, mode);

    // Convert messages to API format
    const apiMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await fetch('/api/coach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: apiMessages,
        systemPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from coach');
    }

    const data = await response.json();
    return { message: data.message };
  } catch (error) {
    console.error('Coach API error:', error);
    return {
      message: '',
      error: 'Sorry, I encountered an error. Please try again.',
    };
  }
}
