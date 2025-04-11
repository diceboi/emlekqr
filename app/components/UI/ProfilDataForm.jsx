"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfilDataForm({
  email,
  vezeteknev,
  keresztnev,
  zip,
  city,
  street,
  floor,
  phone,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.vezeteknev + " " + data.keresztnev,
          vezeteknev: data.vezeteknev,
          keresztnev: data.keresztnev,
          email: email,
          zip: data.zip,
          city: data.city,
          address1: data.street,
          address2: data.floor,
          phone: data.phone,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to update user");

      if(response) {
        toast.success('Az emlékoldal sikeresen frissült')
        window.location.reload()
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center ">
      <h4>Adatok módosítása</h4>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-0">
          <p className="text-sm font-semibold">Vezetéknév</p>
          <input
            {...register("vezeteknev", { required: true })}
            aria-invalid={errors.vezeteknev ? "true" : "false"}
            className="p-2 bg-white rounded-lg border border-neutral-300"
            placeholder="Vezeteknev"
            defaultValue={vezeteknev}
          />
          {errors.vezeteknev?.type === "required" && (
            <p className="text-[--alert] text-sm" role="alert">
              Vezetéknév megadása kötelező
            </p>
          )}
        </div>

        <div className="flex flex-col gap-0">
          <p className="text-sm font-semibold">Keresztnév</p>
          <input
            {...register("keresztnev", { required: true })}
            aria-invalid={errors.keresztnev ? "true" : "false"}
            className="p-2 bg-white rounded-lg border border-neutral-300"
            placeholder="Keresztnév"
            defaultValue={keresztnev}
          />
          {errors.keresztnev?.type === "required" && (
            <p className="text-[--alert] text-sm" role="alert">
              Keresztnév megadása kötelező
            </p>
          )}
        </div>

        <div className="flex flex-col gap-0">
          <p className="text-sm font-semibold">Ir. szám</p>
          <input
            {...register("zip", { required: false })}
            aria-invalid={errors.zip ? "true" : "false"}
            className="p-2 bg-white rounded-lg border border-neutral-300"
            placeholder="Irányítószám"
            defaultValue={zip}
          />
          {errors.zip?.type === "required" && (
            <p className="text-[--alert] text-sm" role="alert">
              Irányítószám megadása kötelező
            </p>
          )}
        </div>

        <div className="flex flex-col gap-0">
          <p className="text-sm font-semibold">Település</p>
          <input
            {...register("city", { required: false })}
            aria-invalid={errors.city ? "true" : "false"}
            className="p-2 bg-white rounded-lg border border-neutral-300"
            placeholder="Település"
            defaultValue={city}
          />
          {errors.city?.type === "required" && (
            <p className="text-[--alert] text-sm" role="alert">
              Település megadása kötelező
            </p>
          )}
        </div>

        <div className="flex flex-col gap-0">
          <p className="text-sm font-semibold">Utca, házszám</p>
          <input
            {...register("street", { required: false })}
            aria-invalid={errors.street ? "true" : "false"}
            className="p-2 bg-white rounded-lg border border-neutral-300"
            placeholder="Utca, házszám"
            defaultValue={street}
          />
          {errors.street?.type === "required" && (
            <p className="text-[--alert] text-sm" role="alert">
              Utca házszám megadása kötelező
            </p>
          )}
        </div>

        <div className="flex flex-col gap-0">
          <p className="text-sm font-semibold">Emelet, ajtó</p>
          <input
            {...register("floor", { required: false })}
            aria-invalid={errors.floor ? "true" : "false"}
            className="p-2 bg-white rounded-lg border border-neutral-300"
            placeholder="Emelet, ajtó"
            defaultValue={floor}
          />
          {errors.floor?.type === "required" && (
            <p className="text-[--alert] text-sm" role="alert">
              Emelet ajtó megadása kötelező
            </p>
          )}
        </div>

        <div className="flex flex-col gap-0">
          <p className="text-sm font-semibold">Telefonszám</p>
          <input
            {...register("phone", { required: false })}
            aria-invalid={errors.phone ? "true" : "false"}
            className="p-2 bg-white rounded-lg border border-neutral-300"
            placeholder="Telefonszám"
            defaultValue={phone}
          />
          {errors.phone?.type === "required" && (
            <p className="text-[--alert] text-sm" role="alert">
              Telefonszám megadása kötelező
            </p>
          )}
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
