import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
const SECRET_KEY =
  process.env.JWT_SECRET ?? "tzf413vuQTRp2pX7X5XtEOyHJd/FThUPG7cg9D9uhsU=";
const salt = 10;
const BACKEND = process.env.BACKEND_URL;
interface JWTPayload {
  _id: string;
  name: string;
  email: string;
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/dashboard",
    signOut: "/",
  },
  session: {
    strategy: "jwt", // Required for Credentials Provider
  },
  debug: process.env.TYPE === "development",
  providers: [
    Credentials({
      // Credentials keys must match the form field names (e.g., <input name="email">)
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) {
          return null;
        }
        const response = await fetch(`${BACKEND}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
          const decoded: JWTPayload = jwt.verify(data.token, SECRET_KEY) as JWTPayload;
          return {
            id: decoded._id,
            name: decoded.name,
            email: decoded.email,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // Runs when a new JWT is created (e.g., after login)
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        // 'user' here comes from the successful 'authorize' return value
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    // Runs every time a session is checked
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        // Pull 'id' and 'role' from the token and attach them to the session object
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
});
