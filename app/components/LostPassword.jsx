"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn ,useSession } from "next-auth/react";
import { toast } from "sonner";

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
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center text-white font-semibold mb-8">Elfelejtett jelszó</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Küldés
            </button>
          </form>
          <div className="text-center text-gray-500 mt-4">vagy</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/bejelentkezes"
          >
            Bejelentkezés
          </Link>
        </div>
    )
  );
};

export default LostPasswordForm;