"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Loading from "../components/UI/Loading"

const RegisterForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
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
    const name = `${e.target[0].value} ${e.target[1].value}`;
    const vezeteknev = e.target[0].value;
    const keresztnev = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    if (!isValidEmail(email)) {
      setError("Az email cím érvénytelen");
      return;
    }

    if (!password || password.length < 8) {
      setError("A jelszó érvénytelen");
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
        setError("Ezzel az email címmel már létezik felhasználó");
      }
      if (res.status === 200) {
        setError("");
        router.push("/bejelentkezes");
      }
    } catch (error) {
      setError("Hiba, próbáld újra");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <Loading />;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#212121] p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center text-white font-semibold mb-8">Regisztráció</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Vezeteknev"
              name="vezeteknev"
              required
            />
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Keresztnev"
              name="keresztnev"
              required
            />
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              name="email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="password"
              name="password"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Regisztráció
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <div className="text-center text-gray-500 mt-4">vagy</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/bejelentkezes"
          >
            Bejelentkezés már meglévő felhasználóval
          </Link>
        </div>
      </div>
    )
  );
};

export default RegisterForm;