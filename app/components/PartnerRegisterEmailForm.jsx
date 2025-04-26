"use client";

import { useSession } from "next-auth/react";
import { toast } from "sonner";

import Loading from "../components/UI/Loading"

const PartnerRegisterEmailForm = () => {
  const { data: session, status: sessionStatus } = useSession();

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
  
    if (!isValidEmail(email)) {
      toast.error('Az email cím érvénytelen.');
      return;
    }
  
    try {
      const res = await fetch("/api/email/partner-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (res.status === 400) {
        toast.error('Valami hiba történt.');
      } else if (res.status === 200) {
        toast.success('Kérelmedet elküldtük. Hamarosan E-mailben válaszolunk.')
      }
    } catch (error) {
      toast.error('Valami hiba történt, próbáld újra később.');
      console.log(error);
    }
  };

  return (
    <form className="flex lg:flex-row flex-col gap-8 w-full items-center" onSubmit={handleSubmit}>
        <input
        type="text"
        className="w-full border text-black rounded-3xl px-4 py-2 focus:outline-none focus:border-[--rose] focus:text-black"
        placeholder="Email cím"
        name="email"
        required
        />

        <button
        type="submit"
        className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--rose] hover:bg-[--rose-hover] transition-all text-white self-center"
        >
        {" "}
        Jelentkezek
        </button>
    </form>
  );
};

export default PartnerRegisterEmailForm;