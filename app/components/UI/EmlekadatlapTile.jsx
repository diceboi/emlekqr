"use client"

import Image from "next/image"
import Link from "next/link"
import { TbTrash } from "react-icons/tb"
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";

export default function Emlekadatlaptile({ data }) {
  const { togglePopup, setDeletableSubId } = useContext(Context);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  useEffect(() => {
    // Fetch subscription status if there's a subscription ID
    const fetchSubscriptionStatus = async () => {
      if (data.subscription) {
        try {
          const response = await fetch('/api/stripe/checkPayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subscriptionId: data.subscription }),
          });

          const result = await response.json();
          setSubscriptionStatus(result); // Save the status (e.g., 'active', 'canceled')
        } catch (error) {
          console.error('Error fetching subscription status:', error);
        }
      }
    };

    fetchSubscriptionStatus();
  }, []);

  const handleDeleteClick = () => {
    setDeletableSubId(data.subscription); // Set the current subscription ID as deletable
    togglePopup("deleteAdatlap"); // Open the modal or trigger popup
  };

  return (
    <>
      <div className="relative flex flex-row gap-8 bg-white hover:bg-[--cream] rounded-xl border border-[--cream] p-4">
        <div className="flex flex-row gap-4 w-full">
          <div className="relative w-[75px] h-[75px] self-center">
            {data.profileimage && (
              <Image 
                src={data.profileimage}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"
                alt="Profile Image"
              />
            )}
            {!data.profileimage && (
              <Image 
                src='/blank-profile.webp'
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"
                alt="Blank Profile Image"
              />
            )}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <h4 className="text-lg">{data.name}</h4>
              <p className="text-sm">({data.age})</p>
            </div>
            <p className="text-xs">Azonosító: {data.uri}</p>

            <div className="flex flex-nowrap gap-2">
              <p className="text-xs">Státusz: </p>
              {subscriptionStatus ? (
                <p className={`text-xs ${subscriptionStatus.status === "active" ? 'text-green-500' : 'text-red-500'}`}>
                  {subscriptionStatus.status === "active" ? 'Fizetett' : 'Nem fizetett'}
                </p>
              ) : (
                <p className="text-xs text-gray-500">Ellenőrzés alatt...</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-end items-end min-w-fit">
          <TbTrash className="absolute top-4 right-4 w-6 h-6 text-[--error] hover:text-white bg-transparent hover:bg-[--error] p-1 cursor-pointer rounded-full" onClick={handleDeleteClick} />
          <Link href={`/emlekadatlapok/${data.uri}`} className="px-2 py-1 bg-[--blue] hover:bg-[--rose] rounded-full transition-all text-white text-xs w-fit">Adatlap megtekintése</Link>
        </div>
      </div>
    </>
  );
}
