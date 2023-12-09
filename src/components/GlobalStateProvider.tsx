import React, { useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../api/supabase";

export type ContextType = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
};

const GlobalStateContext = React.createContext<ContextType | null>(
  null
) as React.Context<ContextType>;

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const localSession = localStorage.getItem("bz-session")
    ? JSON.parse(localStorage.getItem("bz-session") || "")
    : null;
  const [session, setSession] = useState<Session | null>(localSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        localStorage.setItem("bz-session", JSON.stringify(session));
      } else {
        localStorage.removeItem("bz-session");
      }
      localStorage.setItem("bz-userId", session?.user.id || "");
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        localStorage.setItem("bz-session", JSON.stringify(session));
      } else {
        localStorage.removeItem("bz-session");
      }
      localStorage.setItem("bz-userId", session?.user.id || "");
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
