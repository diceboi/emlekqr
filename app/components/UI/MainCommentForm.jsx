"use client";

import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { TbArrowUpRight } from "react-icons/tb";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from 'sonner'

export default function MainCommentForm({ session, currenttribute }) {

  const router = useRouter()
  
  const pathname = usePathname();
  const lastDigits = pathname.slice(-7);

  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // Create a formData object to send to the API
    const formData = {
      from: session ? session.user.name : data.Name,
      fromprofileid: "",
      message: data.Komment,
      to: lastDigits,
      verified: false,
      deleted: false,
      parent: "",
      main: true,
      byregisteredprofile: session ? true : false
    };

    try {
      const res = await fetch('/api/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formData })
      });

      const result = await res.json();

      if (res.ok) {
        console.log('Comment submitted:', result);
        toast.success('Az hozzászólást sikeresen elküldtük. Akkor fog megjelenni ha az adatlap tulajdonos jóváhagyja.')
        // Reset the form after successful submission
        reset();
        router.refresh()
      } else {
        console.error('Error submitting comment:', result);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form className="flex flex-col gap-4 my-8" onSubmit={handleSubmit(onSubmit)}>
      <h4>Hozzászólás</h4>
      <div className="flex flex-col gap-4 bg-[--cream] p-4 rounded-xl">
        {!session && (
          <>
            <input
              className="bg-transparent p-2 focus:appearance-none outline-0"
              placeholder="Név"
              {...register("Name", { required: true })}
              aria-invalid={errors.Name ? "true" : "false"}
            />
            {errors.Name?.type === "required" && (
              <p role="alert" className="text-xs text-[--error]">
                Név kitöltése kötelező
              </p>
            )}
          </>
        )}
        {session && (
          <>
            <div className="flex flex-nowrap items-center gap-2">
              <Image
                src={"/blank-profile.webp"}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
                alt="Profile"
              />
              <input
                className="bg-transparent p-2 focus:appearance-none outline-0 pointer-events-none"
                value={session.user.name}
                {...register("Name", { required: true })}
                aria-invalid={errors.Name ? "true" : "false"}
                readOnly
              />
            </div>
            {errors.Name?.type === "required" && (
              <p role="alert" className="text-xs text-[--error]">
                Név kitöltése kötelező
              </p>
            )}
          </>
        )}
        <input
          className="bg-transparent p-2 focus:appearance-none outline-0"
          placeholder="Hozzászólás"
          {...register("Komment", { required: true })}
          aria-invalid={errors.Komment ? "true" : "false"}
        />
        {errors.Komment?.type === "required" && (
          <p role="alert" className="text-xs text-[--error]">
            Hozzászólás kitöltése kötelező
          </p>
        )}
        <button type="submit" className="w-fit self-end">
          <TbArrowUpRight className="w-8 h-8 p-1 bg-white rounded-full hover:text-white hover:bg-[--blue] transition-all" />
        </button>
      </div>
    </form>
  );
}
