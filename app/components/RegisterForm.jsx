"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import H3 from "./UI/H3";
import { toast } from "sonner";
import { Context } from "../Context";
import { signIn } from "next-auth/react";

import Loading from "../components/UI/Loading"

const RegisterForm = ({ from, bgcolor, shadow, email, productPriceId, type, mode, title }) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const {form, setForm, togglePopup, openPopup} = useContext(Context)

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
    const aszf = e.target[4].checked;
    const marketing = e.target[5].checked;
  
    if (!isValidEmail(email)) {
      toast.error('Az email cím érvénytelen.');
      return;
    }
  
    if (!password || password.length < 8) {
      toast.error('A jelszónak legalább 8 karakter hosszúnak kell lennie.');
      return;
    }
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, vezeteknev, keresztnev, email, password, aszf, marketing }),
      });
  
      if (res.status === 400) {
        toast.error('Ezzel az email címmel már létezik felhasználó.');
      } else if (res.status === 200) {
        const { token } = await res.json();
  
        // Automatikus bejelentkeztetés NextAuth segítségével
        const signInRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
  
        if (signInRes?.ok) {

          await fetch("/api/email/regisztracio", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              name,
              keresztnev,
              vezeteknev,
            }),
          });

          toast.success("Sikeres regisztráció és bejelentkezés.");
          togglePopup()
          window.location.reload()
          router.replace("#emlekerme");
          
        } else {
          toast.error("Bejelentkezési hiba történt.");
        }
      }
    } catch (error) {
      toast.error('Valami hiba történt, próbáld újra később.');
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <Loading />;
  }

  return (
    sessionStatus !== "authenticated" && (
        <div className={`flex flex-col items-center gap-4 ${bgcolor} p-4 rounded-3xl ${shadow} lg:w-96`}>
          <H3 classname={"text-center text-[--rose] font-semibold lg:mb-8 mb-4"}>{title}</H3>
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
              placeholder="Jelszó"
              name="password"
              required
            />

            <div className="flex items-start gap-2 mb-4 text-sm text-gray-700">
              <input
                type="checkbox"
                id="aszf"
                name="aszf"
                required
                className="mt-1"
              />
              <label htmlFor="aszf">
                Elolvastam, megértettem és elfogadom az{" "}
                <Link href="/altalanos-szerzodesi-feltetelek" className="text-[--blue] underline" target="_blank">
                  Általános Szerződési Feltételek
                </Link>
                -ben foglaltakat.
              </label>
            </div>

            <div className="flex items-start gap-2 mb-4 text-sm text-gray-700">
              <input
                type="checkbox"
                id="marketing"
                name="marketing"
                className="mt-1"
              />
              <label htmlFor="marketing">
                Szeretnék tájékoztatást kapni új funkciókról, érdekességekről, illetve egyéb marketing célú üzenetekről e-mail formájában.
              </label>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white self-center"
            >
              {" "}
              Regisztráció
            </button>
          </form>
          <div className="text-center text-gray-500 mt-4">vagy</div>

          {openPopup ? (
            <button
              className="text-[--blue] text-center w-fit border border-[--blue] rounded-full py-1 px-4 lg:py-2 lg:px-6 hover:bg-[--blue] hover:text-white transition-all"
              onClick={() => setForm('login')}
            >
              Bejelentkezés már meglévő felhasználóval  
            </button>
          ):(
            <Link
              className="text-[--blue] text-center w-fit hover:underline transition-all"
              href="/bejelentkezes"
            >
              Bejelentkezés már meglévő felhasználóval  
            </Link>
          )}
        </div>
    )
  );
};

export default RegisterForm;