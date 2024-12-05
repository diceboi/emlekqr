"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import H3 from "./UI/H3";
import { toast } from "sonner";

import Loading from "../components/UI/Loading"

const RegisterForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/erme");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = `${e.target[0].value} ${e.target[1].value}`;
    const vezeteknev = e.target[0].value;
    const keresztnev = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    if (!isValidEmail(email)) {
      toast.error('Az email cím érvénytelen.')
      return;
    }

    if (!password || password.length < 8) {
      toast.error('A jelszónak legalább 8 karakter hosszúnak kell lennie.')
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          keresztnev,
          vezeteknev,
          email,
          password,
        }),
      });
      if (res.status === 400) {
        toast.error('Ezzel az email címmel már létezik felhasználó.')
      }
      if (res.status === 200) {
        toast.success('Sikeres regisztráció.')
        router.push("/bejelentkezes");
      }
    } catch (error) {
      toast.error('Valami hiba történt, próbáld újra később.')
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <Loading />;
  }

  return (
    sessionStatus !== "authenticated" && (
        <div className="flex flex-col items-center gap-4 bg-[--cream] p-8 rounded-3xl shadow-md lg:w-96">
          <H3 classname={"text-center text-[--rose] font-semibold mb-8"}>Regisztráció</H3>
          <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Vezeteknev"
              name="vezeteknev"
              required
            />
            <input
              type="text"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Keresztnev"
              name="keresztnev"
              required
            />
            <input
              type="text"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Email"
              name="email"
              required
            />
            <input
              type="password"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="password"
              name="password"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white self-center"
            >
              {" "}
              Regisztráció
            </button>
          </form>
          <div className="text-center text-gray-500 mt-4">vagy</div>
          <Link
            className="text-[--blue] underline text-center"
            href="/bejelentkezes"
          >
            Bejelentkezés már meglévő felhasználóval
          </Link>
        </div>
    )
  );
};

export default RegisterForm;