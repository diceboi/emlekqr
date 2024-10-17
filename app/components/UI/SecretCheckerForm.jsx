"use client"

import { useForm } from "react-hook-form"
import { useState, useEffect, } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SecretCheckerForm({user}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [uri, setUri] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const lastDigits = pathname.slice(-7);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setUri(lastDigits);
  }, []);

  const onSubmit = async (writtensecret) => {
    setIsSubmitting(true);
    setSubmissionResult(null);

    const email = user.email

    const legitSecret = user.secret

    const subscriptionId = user.stripeSubscription

    if (legitSecret.toString().trim() === writtensecret.writtensecret.toString().trim()) {
      try {
        const response = await fetch('/api/addSecretToEmlekadatlap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ writtensecret: writtensecret.writtensecret, uri, email, subscriptionId }),
        });
  
        if (response.ok) {
          setSubmissionResult('Sikeres Ellenőrzés!');
          router.refresh()
        } else {
          setSubmissionResult('Hiba történt az ellenőrzés közben.');
        }
      } catch (error) {
        setSubmissionResult('Hálózati hiba történt.');
      }



        try {
          const res = await fetch(`/api/auth/secret`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
      
          if (!res.ok) {
            throw new Error("Failed to delete sercret from user");
          }
      
          // Parse the JSON response
          const data = await res.json();
          console.log("Secret successfully deleted:", data);
          return data;
        } catch (error) {
          console.error("Error sending secret to API:", error);
        }


  
      setIsSubmitting(false);
    } else {
      setSubmissionResult('Az ellenőrzési kód nem egyezik az emailben elküldött kóddal. Ellenőrizd le, hogy helyesen írtad-e be.')
      setIsSubmitting(false);
    };
    }

    

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >

      <input
        placeholder="Emailben kapott titkos kód"
        name="writtensecret"
        {...register("writtensecret", {
          required: true,
          pattern: /^\d{6}$/g,
        })}
        className="p-4 text-lg bg-[--white]"
      />
      {errors.email && (
        <span className="text-red-500 text-sm">
          A kód kizárólag 6db számjegyet tartalmazhat
        </span>
      )}

      <input
        type="submit"
        className="w-fit px-5 py-3 bg-[--aquamarine] hover:bg-[--dukeblue] transition-all text-black hover:text-white cursor-pointer self-center"
        disabled={isSubmitting}
        value={isSubmitting ? 'Ellenőrzés...' : 'Ellenőrzés'}
      />

      {submissionResult && (
        <p className="text-center text-sm mt-4">{submissionResult}</p>
      )}
    </form>
  );
}
