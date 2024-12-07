"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Label from "../components/UI/Label"
import { toast } from "sonner";
import { TbEye, TbEyeClosed } from "react-icons/tb";
import { Context } from "../Context";

import Loading from "../components/UI/Loading"
import H3 from "./UI/H3";

const LoginForm = ({ from, bgcolor, shadow, email, productPriceId, type, mode, title, params }) => {
    const router = useRouter();
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    // const session = useSession();
    const { data: session, status: sessionStatus } = useSession();
    const {form, setForm, togglePopup, openPopup} = useContext(Context)
  
    console.log(params)

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
        redirect: false,
      });
  
      if (res?.error) {
        toast.error('Az email cím, vagy jelszó érvénytelen.')
      } else {
        togglePopup()
        toast.success('Sikeres bejelentkezés.')
        window.location.reload()
        router.replace("#emlekerme");
      }
    };
  
    if (sessionStatus === "loading") {
      return <Loading />;
    }

  return (
    sessionStatus !== "authenticated" && (
        <div className={`flex flex-col items-center gap-4 ${bgcolor} p-4 rounded-3xl ${shadow} lg:w-96`}>
          <H3 classname={"text-center text-[--rose] font-semibold mb-8"}>{title}</H3>
          <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
              placeholder="Email"
              required
            />
            <div className="relative flex flex-col justify-center gap-0 w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="w-full border text-black rounded-3xl px-4 py-2 mb-4 focus:outline-none focus:border-[--rose] focus:text-black"
                placeholder="Jelszó"
                required
              />
              <button
              type="button"
              onClick={() => setPasswordVisible(prevState => (!prevState))}
              className="absolute right-2 top-3 text-gray-500"
              >
                {isPasswordVisible ? <TbEye className="min-w-5 min-h-5 text-[--rose]"/> : <TbEyeClosed className="min-w-5 min-h-5 text-[--rose]"/>}
              </button>
            </div>
            
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

          {openPopup ? (
            <button
              className="text-[--blue] text-center w-fit border border-[--blue] rounded-full py-1 px-4 lg:py-2 lg:px-6 hover:bg-[--blue] hover:text-white transition-all"
              onClick={() => setForm('register')}
            >
              Regisztráció  
            </button>
          ):(
            <Link
              className="text-[--blue] text-center w-fit border border-[--blue] rounded-full py-1 px-4 lg:py-2 lg:px-6 hover:bg-[--blue] hover:text-white transition-all"
              href="/regisztracio"
            >
              Regisztráció  
            </Link>
          )}
          
        </div>
    )
  );
};

export default LoginForm;