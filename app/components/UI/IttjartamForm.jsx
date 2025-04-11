"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import H4 from "./H4";

export default function IttjartamForm({ userId, adatlap }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/addIttjartam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: {
            userId: userId,
            name: data.name,
            message: data.message,
            adatlap: adatlap,
            anonym: name ? false : true,
          },
        }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Failed to post message");

      if (response) {
        toast.success("Az üzenetet sikeresen hozzáadtad.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <H4 classname={"text-center text-[--rose]"}>Írj egy pár szót!</H4>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-0">
          <p className="text-sm font-semibold">Név (nem kötelező)</p>
          <input
            {...register("name")}
            className="p-2 bg-white rounded-lg border border-neutral-300"
            placeholder="Név"
          />
        </div>

        <div className="flex flex-col gap-0">
          <p className="text-sm font-semibold">Üzenet (nem kötelező)</p>
          <textarea
            {...register("message")}
            className="p-2 bg-white rounded-lg border border-neutral-300"
            placeholder="Üzenet"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="self-center px-2 py-1 bg-[--blue] hover:bg-[--rose] rounded-full transition-all text-white w-fit"
        >
          Küldés
        </button>
      </form>
    </div>
  );
}
