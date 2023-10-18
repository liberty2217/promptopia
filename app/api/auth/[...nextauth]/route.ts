import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDb } from '@utils/database';
import User from '@models/user';

/**
 * all functions to need to wake up & connect to db everytime - serverless approach
 *  */
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  /**
   * nextjs methods in callbacks are predefined: signIn, redirect, session, jwt and etc.
   * */
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({
          email: session?.user?.email!,
        });

        session.user.id = sessionUser?._id.toString();
        return session;
      } catch (error) {
        throw new Error('Session callback error');
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDb();
        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', '').toLowerCase(),
            image: profile?.image,
          });
        }

        return true;
      } catch (err) {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
