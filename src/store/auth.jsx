import { createContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        currentUser.getIdToken().then((idToken) => {
          setToken(idToken);
          setUser(currentUser);
          localStorage.setItem("token", idToken);
        });
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
