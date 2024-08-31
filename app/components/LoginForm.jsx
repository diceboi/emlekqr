"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn ,useSession } from "next-auth/react";

import Loading from "../components/UI/Loading"

const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    // const session = useSession();
    const { data: session, status: sessionStatus } = useSession();
  
    useEffect(() => {
      if (sessionStatus === "authenticated") {
        router.replace("/emlekadatlapok");
      }
    }, [sessionStatus, router]);
  
    const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
  
      if (!isValidEmail(email)) {
        setError("Az email cím érvénytelen");
        return;
      }
  
      if (!password || password.length < 8) {
        setError("A jelszó érvénytelen");
        return;
      }
  
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
  
      if (res?.error) {
        setError("Az email cím vagy jelszó érvénytelen");
        if (res?.url) router.replace("/emlekadatlapok/0000001");
      } else {
        setError("");
      }
    };
  
    if (sessionStatus === "loading") {
      return <Loading />;
    }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center text-white font-semibold mb-8">Bejelentkezés</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Jelszó"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Bejelentkezes
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="text-center text-gray-500 mt-4">vagy</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/regisztracio"
          >
            Regisztráció
          </Link>
        </div>
      </div>
    )
  );
};

export default LoginForm;