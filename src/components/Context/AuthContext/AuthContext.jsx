// import { createContext, useEffect, useState } from "react";

// export const authContext = createContext();

// export default function AuthContextProvider({ children }) {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     // شغاله فقط على المتصفح
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []); 

//   return (
//     <authContext.Provider value={{ token, setToken }}>
//       {children}
//     </authContext.Provider>
//   );
// }


import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // لو لسه بيحمل التوكن من localStorage ما تعرضش المحتوى
  if (loading) return null;

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}

