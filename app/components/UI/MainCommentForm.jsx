"use client";

import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { TbArrowUpRight } from "react-icons/tb";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from 'sonner'

export default function MainCommentForm({ session, currenttribute, main, to }) {

  const router = useRouter()
  
  const pathname = usePathname();
  const lastDigits = pathname.slice(-7);

  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [ userData, setUserData] = useState(null);
  const [ currentSession, setCurrentSession ] = useState(null)

  const getUserData = async (email) => {
    try {
      const response = await fetch(`/api/getUserData?email=${email}`);
      const result = await response.json();
      if (response.ok) {
        setUserData(result.data.User);
      } else {
        console.error("Error fetching user data:", result.error);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    // Fetch user data if session exists
    if (session?.user?.email) {
      getUserData(session.user.email);
    }
  }, [currentSession]);

  const onSubmit = async (data) => {
    const formData = {
      from: session ? session.user.name : data.Name,
      fromprofileid: userData._id,
      message: data.Komment,
      to: lastDigits,
      verified: false,
      deleted: false,
      parent: to,
      main: main,
      byregisteredprofile: session ? true : false
    };
  
    try {
      // Submit comment data
      const res = await fetch('/api/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formData })
      });
  
      const result = await res.json();
  
      if (res.ok) {
        toast.success('Az hozzászólást sikeresen elküldtük. Akkor fog megjelenni ha az adatlap tulajdonos jóváhagyja.');
        reset(); // Reset the form after successful submission
        router.refresh();
  
        // Submit notification data
        const notificationRes = await fetch('/api/addNotification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personal: true,
            viewed: false,
            notificationtype: "comment",
            adatlap: lastDigits,
            from: session ? session.user.name : data.Name,
            images: "",
            videos: "",
            message: "hozzászólt az adatlapodhoz"
          })
        });
  
        if (notificationRes.ok) {
          console.log('Notification sent successfully');
        } else {
          console.error('Error sending notification');
        }
      } else {
        console.error('Error submitting comment:', result);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('Hiba történt a hozzászólás beküldése közben.');
    }
  };
  

  return (
    <form className="flex flex-col gap-4 my-8" onSubmit={handleSubmit(onSubmit)}>
      {main === true ? (
        <h4>Hozzászólás</h4>
      ):(
        <h4>Válasz</h4>
      )}
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
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                src={ userData?.image || "/blank-profile.webp"}
                fill
                style={{ objectFit: "cover" }}
                alt="Profile"
              />
              </div>
              
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
