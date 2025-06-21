import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // شغاله فقط على المتصفح
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); 

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
