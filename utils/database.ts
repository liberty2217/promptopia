import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDb = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
    });

    isConnected = true;
  } catch {}
};
