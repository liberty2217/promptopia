import Prompt from '@models/prompt';
import { connectToDb } from '@utils/database';

/** since Next 13 names are predefined:
 * GET, POST, etc.*/
export const GET = async () => {
  try {
    await connectToDb();

    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
};
