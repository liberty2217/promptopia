import { connectToDb } from '@utils/database';
import Prompt from '@models/prompt';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDb();
    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
