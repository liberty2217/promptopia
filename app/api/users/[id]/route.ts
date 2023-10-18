import User from '@models/user';
import { connectToDb } from '@utils/database';
import { NextRequest } from 'next/server';

export const GET = async (
  _request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();

    const prompts = await User.find({
      _id: params.id,
    }).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompts created by user', {
      status: 500,
    });
  }
};
