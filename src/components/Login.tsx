import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../api/supabase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalState } from "./GlobalStateProvider";

export const Login = () => {
  const { session } = useGlobalState();

  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session]);

  if (!session) {
    return (
      <div
        className="w-full h-full flex justify-center items-center bg-[#060ce9]"
        style={{ width: "500px", margin: "0 auto" }}
      >
        <div className="flex flex-col gap-4 w-full max-w-lg">
          <h1 className="text-7xl font-bold font-korinna gold-text text-center">
            LOGIN
          </h1>
          <div className="bg-white rounded-lg px-6 py-3 shadow-md">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
              redirectTo="https://buzzinga.io"
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
