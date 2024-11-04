"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn ,useSession } from "next-auth/react";
import { toast } from "sonner";
import H3 from "./UI/H3";
import Paragraph from "./UI/Paragraph";

import Loading from "../components/UI/Loading"

const LostPasswordForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    // const session = useSession();
    const { data: session, status: sessionStatus } = useSession();
  
    const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
  
      if (!isValidEmail(email)) {
        setError("Az email cím érvénytelen");
        return;
      }

      try {
        const res = await fetch("/api/auth/forget-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
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
        <div className="flex flex-col items-center gap-4 bg-[--cream] p-8 rounded-3xl shadow-md lg:w-96">
          <H3 classname={"text-center text-[--rose] font-semibold mb-8"}>Elfelejtett jelszó</H3>
          <Paragraph classname={"text-center"}>Írd be az email címedet amivel regisztráltál, hogy egy jelszó visszaállító linket küldhessünk neked.</Paragraph>
          <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
            <input
              type="email"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Email"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white self-center"
            >
              Visszaállító email kérése
            </button>
          </form>
          <div className="text-center text-gray-500 mt-4">vagy</div>
          <Link
            className="text-[--blue] underline"
            href="/bejelentkezes"
          >
            Bejelentkezés
          </Link>
        </div>
    )
  );
};

export default LostPasswordForm;