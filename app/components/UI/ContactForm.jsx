"use client"

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const response = await fetch('/api/email/regisztracio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmissionResult('Sikeres üzenetküldés!');
      } else {
        setSubmissionResult('Hiba történt az üzenet küldése közben.');
      }
    } catch (error) {
      setSubmissionResult('Hálózati hiba történt.');
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-[600px] m-auto"
    >
      <input
        placeholder="Név*"
        name="name"
        {...register("name", { required: true })}
        className="p-4 text-lg bg-[--cream] rounded-3xl"
      />
      {errors.name && (
        <span className="text-red-500 text-sm">A név megadása kötelező</span>
      )}

      <input
        placeholder="E-mail*"
        name="email"
        {...register("email", {
          required: true,
          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        })}
        className="p-4 text-lg bg-[--cream] rounded-3xl"
      />
      {errors.email && (
        <span className="text-red-500 text-sm">
          Valós e-mail cím megadása kötelező. Kérlek ellenőrizd az elírásokat.
        </span>
      )}

      <input
        placeholder="Tárgy*"
        name="subject"
        {...register("subject", { required: true })}
        className="p-4 text-lg bg-[--cream] rounded-3xl"
      />
      {errors.subject && (
        <span className="text-red-500 text-sm">A tárgy megadása kötelező</span>
      )}

      <textarea
        placeholder="Üzenet*"
        name="message"
        rows={8}
        {...register("message", { required: true })}
        className="p-4 text-lg bg-[--cream] rounded-3xl"
      />
      {errors.message && (
        <span className="text-red-500 text-sm">
          Az üzenet megadása kötelező
        </span>
      )}

      <div className="flex flex-nowrap items-start gap-2">
        <input
          type="checkbox"
          name="acceptance"
          id="acceptance"
          {...register("acceptance", { required: true })}
          className="p-4 text-lg bg-[--cream] rounded-3xl mt-1"
        />
        <label htmlFor="acceptance">
          Elolvastam, megértettem, és elfogadom az <Link href={"/adatkezelesi-tajekoztato"} className="text-[--blue] underline">Adatkezelési tájékoztatóban</Link> foglaltakat.*
        </label>
      </div>
      {errors.acceptance && (
        <span className="text-red-500 text-sm">
          Az adatkezelési tájékoztató elfogadása kötelező.
        </span>
      )}

      <button
        type="submit"
        className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white w-fit self-center"
        disabled={isSubmitting}
      >{isSubmitting ? 'Küldés...' : 'Küldés'}</button>

      {submissionResult && (
        <p className="text-center text-sm mt-4">{submissionResult}</p>
      )}
    </form>
  );
}
