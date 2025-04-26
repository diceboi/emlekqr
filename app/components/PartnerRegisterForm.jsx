"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter, useSearchParams  } from "next/navigation";
import { useSession } from "next-auth/react";
import H3 from "./UI/H3";
import { toast } from "sonner";
import { Context } from "../Context";
import { signIn } from "next-auth/react";

import Loading from "../components/UI/Loading"

const PartnerRegisterForm = ({ from, bgcolor, shadow, email, productPriceId, type, mode, title }) => {
  const [error, setError] = useState("");
  const [emailFromUrl, setEmailFromUrl] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
  
    if (emailFromQuery && isValidEmail(emailFromQuery)) {
      setEmailFromUrl(emailFromQuery);
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
      // ✅ Késleltetett toast, hogy biztos legyen, hogy megjelenik
      setTimeout(() => {
        toast.error("Nincs jogosultságod partnerként regisztrálni, vagy nem a kapott emailből nyitottad meg az oldalt.");
      }, 100);
    }
  }, [searchParams]);  

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = `${e.target[0].value} ${e.target[1].value}`;
    const vezeteknev = e.target[0].value;
    const keresztnev = e.target[1].value;
    const uzletnev = e.target[2].value;
    const bankszamlaszam = e.target[3].value;
    const email = e.target[4].value;
    const password = e.target[5].value;
    const aszf = e.target[6].checked;
    const marketing = e.target[7].checked;
    const type = 'partner'

    //Kupon Kód Generálás
    const randomFourDigits = Math.floor(1000 + Math.random() * 9000);
    const couponcode = `${vezeteknev[0] || ""}${keresztnev[0] || ""}${uzletnev[0] || ""}${randomFourDigits}`.toUpperCase();
  
    if (!isValidEmail(email)) {
      toast.error('Az email cím érvénytelen.');
      return;
    }
  
    if (!password || password.length < 8) {
      toast.error('A jelszónak legalább 8 karakter hosszúnak kell lennie.');
      return;
    }
  
    try {
      const res = await fetch("/api/auth/partner-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, vezeteknev, uzletnev, bankszamlaszam, keresztnev, email, password, aszf, marketing, type, couponcode }),
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
          toast.success("Sikeres regisztráció és bejelentkezés.");
          router.replace("/profil");

          await fetch("/api/email/partner-regisztracio", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, name, uzletnev, bankszamlaszam, couponcode }),
          });
          
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
        <div className={`flex flex-col items-center gap-4 ${bgcolor} p-4 rounded-3xl ${shadow} lg:w-96`}>
          <H3 classname={"text-center text-[--rose] font-semibold mb-8"}>{title}</H3>
          <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Vezeteknév"
              name="vezeteknev"
              required
            />
            <input
              type="text"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Keresztnév"
              name="keresztnev"
              required
            />
            <input
              type="text"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Üzletnév"
              name="uzletnev"
              required
            />
            <input
              type="text"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Bankszámlaszámod"
              name="bankszamlaszam"
              required
            />
            <input
              type="text"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Email"
              name="email"
              required
              defaultValue={emailFromUrl}
              disabled={true}
            />
            <input
              type="password"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="password"
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
              disabled={!isEmailValid}
              className={`flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full transition-all text-white self-center 
                ${isEmailValid ? 'bg-[--blue] hover:bg-[--blue-hover]' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Regisztráció
            </button>
          </form>
        </div>
  );
};

export default PartnerRegisterForm;