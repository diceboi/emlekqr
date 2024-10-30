"use client";

import React, { useEffect } from 'react';

export default function KoszonjukClient({ session, checkoutSession, randomNumber }) {
  useEffect(() => {
    const updateUserData = async () => {
      if (session?.user?.email && checkoutSession?.customer_details?.email) {
        const customerDetails = checkoutSession.customer_details;
        const checkoutSessionData = {
          session_id: checkoutSession.id,
          zip: customerDetails.address?.postal_code,
          city: customerDetails.address?.city,
          address_line1: customerDetails.address?.line1,
          address_line2: customerDetails.address?.line2 || '',
          phone: customerDetails.phone || '',
          subscription_id: checkoutSession.subscription || '',
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
      }
    };

    updateUserData();
  }, [session, checkoutSession, randomNumber]);

  return (
    <section className="w-full py-20">
      <div className="container flex flex-col gap-8 m-auto p-4 bg-[--cream] rounded-2xl">
        <h2 className="text-[--rose] text-center">Köszönjük a vásárlást</h2>
        <p className="text-center">Jelenleg nincs más dolgod, mint megvárni, amíg megérkezik az érme.</p>
        <p className="text-center">Rendelési azonosítód: <strong>{randomNumber}</strong></p>
        {session?.user?.email && <p>{session.user.email}</p>}
        {checkoutSession && (
          <div className="text-center">
            <p>Customer: {checkoutSession.customer}</p>
            <p>Total Amount: ${(checkoutSession.amount_total / 100).toFixed(2)}</p>
          </div>
        )}
      </div>
    </section>
  );
}
