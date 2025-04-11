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
        <Paragraph classname={"text-center lg:w-1/2"}>Jelenleg nincs más dolgod, mint megvárni, amíg megérkezik az érme, és követni az email-ben leírt lépéseket emlékoldalad aktiválásához.</Paragraph>
      </div>
    </section>
  );
}



{/*
Checkout Session: {
  id: 'cs_test_b1QavgiZIic6c939xuK9MQBO5HqcWa8WyH9XjrCmuVMlC0ficL0oFU7dnp',
  object: 'checkout.session',
  adaptive_pricing: { enabled: true },
  after_expiration: null,
  allow_promotion_codes: true,
  amount_subtotal: 3500000,
  amount_total: 3500000,
  automatic_tax: { enabled: false, liability: null, status: null },
  billing_address_collection: 'required',
  cancel_url: 'http://localhost:3000/erme',
  client_reference_id: null,
  client_secret: null,
  collected_information: { shipping_details: { address: [Object], name: 'Szász Szabolcs' } },
  consent: null,
  consent_collection: null,
  created: 1742984406,
  currency: 'huf',
  currency_conversion: null,
  custom_fields: [],
  custom_text: {
    after_submit: null,
    shipping_address: null,
    submit: null,
    terms_of_service_acceptance: null
  },
  customer: 'cus_R6PcLFHEWvhkQ7',
  customer_creation: null,
  customer_details: {
    address: {
      city: 'Kaposvár',
      country: 'HU',
      line1: 'Egyenesi út. 101.',
      line2: null,
      postal_code: '7400',
      state: null
    },
    email: 'szasz.szabolcs1995@gmail.com',
    name: 'Szász Szabolcs',
    phone: '+36303068676',
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: null,
  discounts: [],
  expires_at: 1743070805,
  invoice: null,
  invoice_creation: {
    enabled: false,
    invoice_data: {
      account_tax_ids: null,
      custom_fields: null,
      description: null,
      footer: null,
      issuer: null,
      metadata: {},
      rendering_options: null
    }
  },
  livemode: false,
  locale: null,
  metadata: { forma: 'négyzet' },
  mode: 'payment',
  payment_intent: 'pi_3R6r4nBp9wE6Dgiw0QIQ4SYj',
  payment_link: null,
  payment_method_collection: 'if_required',
  payment_method_configuration_details: null,
  payment_method_options: { card: { request_three_d_secure: 'automatic' } },
  payment_method_types: [ 'card' ],
  payment_status: 'paid',
  permissions: null,
  phone_number_collection: { enabled: true },
  recovered_from: null,
  saved_payment_method_options: {
    allow_redisplay_filters: [ 'always' ],
    payment_method_remove: null,
    payment_method_save: null
  },
  setup_intent: null,
  shipping_address_collection: { allowed_countries: [ 'HU' ] },
  shipping_cost: null,
  shipping_details: {
    address: {
      city: 'Kaposvár',
      country: 'HU',
      line1: 'Egyenesi út. 101.',
      line2: null,
      postal_code: '7400',
      state: null
    },
    carrier: null,
    name: 'Szász Szabolcs',
    phone: null,
    tracking_number: null
  },
  shipping_options: [],
  status: 'complete',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3000/koszonjuk?session_id={CHECKOUT_SESSION_ID}',
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  ui_mode: 'hosted',
  url: null
}*/}