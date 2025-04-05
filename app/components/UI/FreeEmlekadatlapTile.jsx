"use client"

import Image from "next/image"
import { useContext, useEffect, useState } from "react";

export default function FreeEmlekadatlapTile({ data }) {
  const [remainingDays, setRemainingDays] = useState(null);
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

  return (
    <>
      <div className="relative flex lg:flex-row flex-col gap-8 bg-white hover:bg-[--cream] rounded-xl border border-[--cream] p-4 min-h-[125px]">
        <div className="flex lg:flex-row flex-col gap-4 w-full">
          <div className="relative lg:min-w-[75px] lg:min-h-[75px] min-w-[50px] min-h-[50px] self-start">
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

            {data.uri && !data.uri.includes("@") && (
              <p className="text-xs">Azonosító: {data.uri}</p>
            )}

            <div className="flex lg:flex-nowrap flex-wrap gap-2">
              <p className="text-xs">Státusz: </p>
              {subscriptionStatus ? (
                <p className={`text-xs ${subscriptionStatus.status === "active" ? 'text-green-500' : 'text-red-500'}`}>
                  {subscriptionStatus.status === "active" ? 'Fizetett' : 'Nem fizetett'}
                </p>
              ) : data?.trial ? (
                <p className="text-xs text-[--blue]">Ingyenes adatlap</p>
              ) : (
                <p className="text-xs text-gray-500">Ellenőrzés alatt...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
