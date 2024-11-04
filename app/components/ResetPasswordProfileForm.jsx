"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { TbEye, TbEyeClosed } from "react-icons/tb";

export default function ResetPasswordProfileForm({ session }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          email: session.user?.email,
        }),
      });

      if (response.status === 400) {
        toast.error("Az új jelszó beállítása nem sikerült.");
      } else if (response.status === 200) {
        toast.success(
          "Sikeresen megváltoztattad a jelszavad, jelentkezz be újra az új jelszavaddal."
        );
        signOut();
      } else {
        toast.error("Ismeretlen hiba történt.");
      }
    } catch (error) {
      toast.error("Valami hiba történt, próbáld meg újra később.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center ">
      <h4>Jelszó módosítása</h4>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col gap-0">
          <input
            {...register("password", { required: true })}
            aria-invalid={errors.password ? "true" : "false"}
            className="p-2 bg-white rounded-lg border border-neutral-300 pr-10"
            placeholder="Új jelszó"
            type={isPasswordVisible ? "text" : "password"}
          />
          {errors.password?.type === "required" && (
            <p className="text-[--alert] text-sm" role="alert">
              Jelszó megadása kötelező
            </p>
          )}

          <button
            type="button"
            onClick={() => setPasswordVisible(prevState => (!prevState))}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {isPasswordVisible ? <TbEye className="min-w-5 min-h-5 text-[--rose]"/> : <TbEyeClosed className="min-w-5 min-h-5 text-[--rose]"/>}
          </button>
        </div>

        <button
          type="submit"
          className="self-center px-2 py-1 bg-[--blue] hover:bg-[--rose] rounded-full transition-all text-white w-fit"
        >
          Frissítés
        </button>
      </form>
    </div>
  );
}
