import Prompt from '@models/prompt';
import { connectToDb } from '@utils/database';
import { NextRequest } from 'next/server';

type Params = {
  id: string;
};

export const GET = async (
  _request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    await connectToDb();

    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) {
      return new Response(JSON.stringify({ message: 'Prompt not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDb();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ message: 'Prompt not found' }), {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
};

export const DELETE = async (
  _request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    await connectToDb();

    await Prompt.findByIdAndDelete(params.id);

    return new Response(JSON.stringify({ message: 'Prompt deleted' }), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify(e), { status: 500 });
  }
};
