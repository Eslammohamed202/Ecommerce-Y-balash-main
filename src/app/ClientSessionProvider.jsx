// components/ClientSessionProvider.jsx
"use client";

import { SessionProvider } from "next-auth/react";

export function ClientSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
