import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The email address of the user. */
      email: string;
      /** The name of the user. */
      name?: string;
      /** The image of the user. */
      image?: string;
      /** The unique ID of the user. */
      id?: string; // Add your custom field like this.
    };
  }
  interface Profile {
    picture: string;
  }
}
