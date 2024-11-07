"use client";

import React, { useEffect, useState } from 'react';
import H2 from './UI/H2';
import Paragraph from './UI/Paragraph';

export default function KoszonjukClient({ session, checkoutSession, randomNumber }) {

  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const updateUserData = async () => {
      if (session?.user?.email && checkoutSession?.customer_details?.email) {
        const customerDetails = checkoutSession.customer_details;
        const checkoutSessionData = {
          checkoutSession: checkoutSession.id,
          zip: customerDetails.address?.postal_code,
          city: customerDetails.address?.city,
          address1: customerDetails.address?.line1,
          address2: customerDetails.address?.line2 || '',
          phone: customerDetails.phone || '',
          stripeSubscription: checkoutSession.subscription || '',
          secret: randomNumber, // Use the server-provided random number
        };

        // Call your API to update user data
        await fetch("/api/updateUser", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: customerDetails.email,
            ...checkoutSessionData
          }),
        });

        // Send email to both admin and customer
        await fetch("/api/email/vasarlas", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: customerDetails.email,
            name: customerDetails.name,
            address: `${customerDetails.address?.line1}, ${customerDetails.address?.city}, ${customerDetails.address?.postal_code}`,
            payment: (checkoutSession.amount_total / 100).toFixed(2),
            type: checkoutSession.metadata.forma, // Assuming 'forma' is in metadata
            secret: randomNumber,
            email: customerDetails.email,
            phone: customerDetails.phone
          }),
        });
      }
    };
    setEmailSent(true);
    updateUserData();
  }, [session, checkoutSession, randomNumber, emailSent]);

  return (
    <section className="flex flex-col items-center w-full py-20 px-4 min-h-[93vh]">
      <div className="container flex flex-col items-center gap-8 m-auto p-8 bg-[--cream] rounded-2xl">
        <H2 classname={"text-[--rose] text-center"}>Köszönjük a vásárlást</H2>
        <Paragraph classname={"text-center lg:w-1/2"}>Jelenleg nincs más dolgod, mint megvárni, amíg megérkezik az érme, és követni az email-ben leírt lépéseket emlékadatlapod aktiválásához.</Paragraph>
      </div>
    </section>
  );
}
