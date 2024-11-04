"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname} from "next/navigation";
import { signIn ,useSession } from "next-auth/react";
import { toast } from "sonner";
import H3 from "./UI/H3";
import Paragraph from "./UI/Paragraph";
import { TbEye, TbEyeClosed } from "react-icons/tb";

import Loading from "../components/UI/Loading"

const ResetPasswordForm = ({token}) => {

    const router = useRouter();
    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState(null);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    // const session = useSession();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch("/api/auth/verify-token", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    token: token,
                  }),
                });
                if (res.status === 400) {
                  toast.error('Hibás vagy lejárt token.')
                  setVerified(true)
                }
                if (res.status === 200) {
                  toast.success('Sikeres ellenőrzés.')
                  setVerified(true)
                  const userData = await res.json()
                  setUser(userData)
                }
              } catch (error) {
                toast.error('Valami hiba történt, próbáld meg újra később.')
                console.log(error);
              }
            };
        verifyToken();
    }, [token]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const password = e.target[0].value;

      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            email: user?.email,
          }),
        });
        if (res.status === 400) {
          toast.error('Az új jelszót nem sikerült beállítani.')
        }
        if (res.status === 200) {
            toast.success('Az új jelszó sikeresen beállításra került.')
          router.push("/bejelentkezes");
        }
      } catch (error) {
        toast.error('Valami hiba történt, próbáld meg újra később.')
        console.log(error);
      }
    };
  
    if (sessionStatus === "loading" || !verified) {
      return <Loading />;
    }

  return (
    sessionStatus !== "authenticated" && (
        <div className="flex flex-col items-center gap-4 bg-[--cream] p-8 rounded-3xl shadow-md lg:w-96">
          <H3 classname={"text-center text-[--rose] font-semibold mb-8"}>Jelszó változtatás</H3>
          <Paragraph classname={"text-center"}>Állíts be új jelszót a felhasználói fiókodhoz.</Paragraph>
          <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
            <div className="relative flex flex-col gap-0 w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
                placeholder="Jelszó"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(prevState => (!prevState))}
                className="absolute right-2 top-3"
              >
                {isPasswordVisible ? <TbEye className="min-w-5 min-h-5 text-[--rose]"/> : <TbEyeClosed className="min-w-5 min-h-5 text-[--rose]"/>}
              </button>
              </div>
              <button
                type="submit"
                disabled={error.length > 0}
                className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white self-center"
              >
                Új jelszó beállítása
              </button>
            
          </form>
        </div>
    )
  );
};

export default ResetPasswordForm;