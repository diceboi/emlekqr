"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname} from "next/navigation";
import { signIn ,useSession } from "next-auth/react";
import { toast } from "sonner";

import Loading from "../components/UI/Loading"

const ResetPasswordForm = () => {

    const pathname = usePathname()
    const params = pathname.slice(-40)

    console.log("Token from URL: ", params)

    const router = useRouter();
    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState(null);
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
                    token: params.token,
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
    }, [params.token]);
  
    const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };
  
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
          }),
        });
        if (res.status === 400) {
          toast.error('Ezzel az email címmel nem létezik felhasználó.')
        }
        if (res.status === 200) {
            toast.success('Elküldünk az email címedre egy jelszó visszaállító linket. Kattints az emailben található "Jelszó visszaállítás" gombra.')
          router.push("/bejelentkezes");
        }
      } catch (error) {
        toast.error('Valami hiba történt, próbáld meg újra később.')
        console.log(error);
      }
    };
  
    if (sessionStatus === "loading") {
      return <Loading />;
    }

  return (
    sessionStatus !== "authenticated" && (
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center text-white font-semibold mb-8">Jelszó visszaállítás</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Jelszó"
              required
            />
            <button
              type="submit"
              disabled={error.length > 0}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Új jelszó beállítása
            </button>
          </form>
        </div>
    )
  );
};

export default ResetPasswordForm;