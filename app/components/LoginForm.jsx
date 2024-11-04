"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn ,useSession } from "next-auth/react";
import Label from "../components/UI/Label"
import { toast } from "sonner";

import Loading from "../components/UI/Loading"
import H3 from "./UI/H3";

const LoginForm = () => {
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
      const password = e.target[1].value;
  
      if (!isValidEmail(email)) {
        toast.error('Az email cím érvénytelen')
        return;
      }
  
      if (!password || password.length < 8) {
        toast.error('A jelszó érvénytelen.')
        return;
      }
  
      const res = await signIn("credentials", {
        email,
        password, 
      });
  
      if (res?.error) {
        toast.success('Az email cím, vagy jelszó érvénytelen.')
      } else {
        setError("");
      }
    };
  
    if (sessionStatus === "loading") {
      return <Loading />;
    }

  return (
    sessionStatus !== "authenticated" && (
        <div className="flex flex-col items-center gap-4 bg-[--cream] p-8 rounded-3xl shadow-md lg:w-96">
          <H3 classname={"text-center text-[--rose] font-semibold mb-8"}>Bejelentkezés</H3>
          <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Jelszó"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white self-center"
            >
              Bejelentkezes
            </button>
          </form>
          <div className="self-center">
            <Label>Elfelejtetted a jelszót? <Link href={"/elfelejtett-jelszo"} className="text-[--blue] underline">Kattints ide</Link></Label>
          </div>
          <div className="text-center text-gray-500">vagy</div>
          <Link
            className="text-[--blue] underline"
            href="/regisztracio"
          >
            Regisztráció  
          </Link>
        </div>
    )
  );
};

export default LoginForm;