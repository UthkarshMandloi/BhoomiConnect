// @ts-ignore - next-auth beta version incompatibility with Next.js 16
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-secret',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn() {
      // Allow all sign-ins for demo
      return true;
    },
    async session({ session }) {
      // Add mock role for demo
      if (session?.user) {
        (session.user as any).role = 'gov_officer';
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
