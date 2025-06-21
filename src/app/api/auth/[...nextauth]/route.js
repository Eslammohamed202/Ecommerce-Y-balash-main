// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken"; 

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.userType) {
          throw new Error("Email, password, and user type are required");
        }

        try {
          // اختيار الـ API بناءً على userType
          const apiUrl =
            credentials.userType === "seller"
              ? "https://y-balash.vercel.app/api/seller-login"
              : "https://y-balash.vercel.app/api/auth/login";

          const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Login failed");
          }

          if (credentials.userType === "seller" && !data.user) {
            throw new Error("User data not found in response");
          }

          if (credentials.userType === "client" && !data.token) {
            throw new Error("Token not found in response");
          }

          // للكلاينت: استخدام الإيميل من الطلب وفك الـ token لاستخراج الـ id
          if (credentials.userType === "client") {
            let userId;
            try {
              const decoded = jwt.decode(data.token); // فك الـ token
              userId = decoded?.id || "unknown"; // استخدام الـ id من الـ token أو قيمة افتراضية
            } catch (error) {
              console.error("Error decoding JWT:", error);
              userId = "unknown"; // قيمة افتراضية لو فشل فك الـ token
            }

            return {
              id: userId,
              email: credentials.email, // استخدام الإيميل من الطلب
              userType: credentials.userType,
              token: data.token,
            };
          }

          // للسيلر: التعامل مع الـ response العادي
          return {
            id: data.user.id,
            email: data.user.email,
            userType: credentials.userType,
            restaurantId: data.user.restaurantId,
            token: data.token,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userType = user.userType;
        token.token = user.token;
        if (user.userType === "seller") {
          token.restaurantId = user.restaurantId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.userType = token.userType;
      session.user.token = token.token;
      if (token.userType === "seller") {
        session.user.restaurantId = token.restaurantId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };