import { Schema, models, model } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Please enter a prompt'],
  },
  tag: {
    type: String,
    required: [true, 'Please enter a tag'],
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

interface IPrompt extends Document {
  _id: string;
  creator: {
    _id: string;
    email: string;
    username: string;
    image: string;
  };
  prompt: string;
  tag: string;
}

export type { IPrompt };

export default Prompt;
