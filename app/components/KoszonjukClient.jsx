"use client";

import React, { useEffect, useState } from 'react';
import H2 from './UI/H2';
import Paragraph from './UI/Paragraph';

export default function KoszonjukClient({ session, checkoutSession, randomNumber, couponCode }) {
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const updateUserData = async () => {
      if (session?.user?.email && checkoutSession?.customer_details?.email && !emailSent) {
        const customerDetails = checkoutSession.customer_details;
  
        const checkoutSessionData = {
          checkoutSession: checkoutSession.id,
          zip: customerDetails.address?.postal_code,
          city: customerDetails.address?.city,
          address1: customerDetails.address?.line1,
          address2: customerDetails.address?.line2 || '',
          phone: customerDetails.phone || '',
          stripeSubscription: checkoutSession.subscription || '',
          secret: randomNumber,
        };
  
        try {
          // 1. Adatbázis frissítés
          await fetch("/api/updateUser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: customerDetails.email,
              ...checkoutSessionData,
            }),
          });
  
          // 2. Várakozás 300ms (Resend szereti ha nem azonnal jön a második kérés)
          await new Promise((resolve) => setTimeout(resolve, 300));
  
          // 3. Admin + Ügyfél levél kiküldése
          await fetch("/api/email/vasarlas", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: customerDetails.email,
              name: customerDetails.name,
              address: `${customerDetails.address?.line1}, ${customerDetails.address?.city}, ${customerDetails.address?.postal_code}`,
              payment: (checkoutSession.amount_total / 100).toFixed(2),
              type: checkoutSession.metadata?.forma || '',
              secret: randomNumber,
              phone: customerDetails.phone || '',
              couponCode: couponCode || null,
            }),
          });
  
          setEmailSent(true); // csak akkor állítsd át, ha minden sikerült
        } catch (error) {
          console.error("Hiba az updateUserData során:", error);
        }
      }
    };
  
    updateUserData();
  }, [session, checkoutSession, randomNumber, emailSent, couponCode]);
  

  return (
    <section className="flex flex-col items-center w-full py-20 px-4 min-h-[93vh]">
      <div className="container flex flex-col items-center gap-8 m-auto p-8 bg-[--cream] rounded-2xl">
        <H2 classname={"text-[--rose] text-center"}>Köszönjük a vásárlást</H2>
        <Paragraph classname={"text-center lg:w-1/2"}>
          Jelenleg nincs más dolgod, mint megvárni, amíg megérkezik az érme, és követni az email-ben leírt lépéseket emlékoldalad aktiválásához.
        </Paragraph>
      </div>
    </section>
  );
}
