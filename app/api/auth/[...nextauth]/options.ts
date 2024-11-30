import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/model/User';
import School from '@/model/School';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        async function checkUserInMultipleModel(identifier: string) {
          const [user, school] = await Promise.all([
            User.findOne({ email: identifier }),
            School.findOne({ contactEmail: identifier }),
          ]);

          return user || school || null;
        }

        try {
          const user = await checkUserInMultipleModel(credentials.identifier);

          if (!user) {
            throw new Error('No user found with this email');
          }

          // Handle verification status for found user
          if (user && !user.isVerified) {
            throw new Error('Please verify your account before login');
          }

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isPasswordCorrect) {
              throw new Error('Incorrect password');
            }
          }

          return user;
        } catch (error) {}

        // try {
        //   let loginUser;
        //   const user = await User.findOne({
        //     $or: [
        //       { email: credentials.identifier },
        //       { username: credentials.identifier },
        //     ],
        //   });

        //   if (!user) {
        //     const school = await School.findOne({
        //       contactEmail: credentials.identifier,
        //     });

        //     if (school) {
        //       loginUser = school;
        //     }
        //   }

        //   if (!user) {
        //     throw new Error('No user found with this email or username');
        //   }

        //   if (!user.isVerified) {
        //     throw new Error('Please verify your account before login');
        //   }

        //   const isPasswordCorrect = await bcrypt.compare(
        //     credentials.password,
        //     user.password
        //   );

        //   if (isPasswordCorrect) {
        //     return user;
        //   } else {
        //     throw new Error('Incorrect password');
        //   }
        // } catch (err: any) {
        //   console.error('Error in authorize function:', err.message);
        //   throw new Error(err.message);
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.role = user?.role;
        token.fullName = user?.fullName;
        token.name = user?.name;
      }
      console.log('JWT token:', token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.role = token.role;
        session.user.fullName = token.fullName;
        session.user.name = token.name;
      }
      console.log('Session:', session);
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
