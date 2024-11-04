"use client"

import Image from "next/image"
import Link from "next/link";

import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { AiOutlineQrcode } from "react-icons/ai";
import { AiOutlineLayout } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiShoppingCart } from "react-icons/pi";

import { FaCircleCheck } from "react-icons/fa6";
import { IoIosInfinite } from "react-icons/io";

import Arrow from "./../components/Animations/Arrow"
import Camel from "./../components/Animations/Camel"
import Hearth from "./../components/Animations/Hearth"

import SecretCheckerModal from "../components/UI/SecretCheckerModal"
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "../Context";
import LoginForm from "./LoginForm";
import { loadStripe } from '@stripe/stripe-js';
import H1 from "./UI/H1";
import H2 from "./UI/H2";
import H3 from "./UI/H3";
import H4 from "./UI/H4";
import Paragraph from "./UI/Paragraph";
import Label from "./UI/Label";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Emlekerme({ session, userdata }) {

    const { openPopup, togglePopup, setOpenPopup } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        setLoading(true);
      
        try {
          const response = await fetch('/api/stripe/createCheckoutSession', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: session.user.email, // User's email
              productPriceId: 'price_1QEX5HBp9wE6DgiwQsbXZpbH', // Replace with your actual Stripe price ID
            }),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error}`);
          }
      
          const { sessionId } = await response.json();
      
          // Check if sessionId is received correctly
          if (!sessionId) {
            throw new Error('No session ID returned');
          }
      
          // Get the Stripe.js instance
          const stripe = await stripePromise;
      
          // Redirect to the Stripe Checkout page
          const { error } = await stripe.redirectToCheckout({
            sessionId,
          });
      
          if (error) {
            console.error('Error redirecting to Stripe:', error);
          }
      
        } catch (error) {
          console.error('Error creating checkout session:', error);
        } finally {
          setLoading(false);
        }
      };
      

    useEffect(() => {
        if (openPopup) {
            setOpenPopup(false);
        }
    }, [openPopup, setOpenPopup]);

  return (
    <>
    {openPopup && !session && (
        <SecretCheckerModal session={session}>
          <LoginForm />
        </SecretCheckerModal>
    )}
    <section className="flex flex-col gap-8 w-full lg:px-0 py-10 lg:py-20 min-h-[100vh]">

        <div className="relative flex flex-col container w-full m-auto px-4">

            <div className="relative flex flex-col gap-20 p-8 lg:flex-row w-full min-h-[60vh] bg-[--cream] bg-opacity-25 rounded-2xl">
                <div className="absolute top-0 left-[30vw] w-52 h-52 opacity-25 ">
                    <Arrow />
                </div>
                <div className="absolute top-2/3 left-[30vw] w-52 h-52 opacity-25">
                    <Camel />
                </div>
                <div className="absolute top-3/3 right-0 w-52 h-52 opacity-25">
                    <Hearth />
                </div>
                <div className="flex flex-col justify-center gap-8 p-8 w-1/2">
                    <H3 classname={"text-[--blue] px-2 p-1 bg-white w-fit rounded-full"}>EmlékQR emlékérme</H3>
                    <H1 classname={"text-[--rose]"}>Az emlékek életre kelnek</H1>
                    <Paragraph className="">A tökéletes, életre szóló ajándékot keresed?-  Lepd meg akár önmagad, vagy családodat - elevenítsétek fel együtt a csodás pillanatokat, meséljetek sosem hallott történeteket…
                    </Paragraph>
                </div>
            </div>

            <div className="absolute top-20 right-16 flex flex-col w-5/12 h-full">
                <div className="flex flex-col gap-8 sticky top-32 rounded-2xl m-8 bg-white shadow-2xl p-8">
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={[
                        { src: "/sirko-hero.jpg" },
                        { src: "/sirko-hero.jpg" },
                        { src: "/sirko-hero.jpg" },
                        ]}
                    />
                    <div className="flex flex-col gap-4">
                        <div className="px-4 py-2 rounded-3xl bg-[--rose] w-fit self-center"><p className="text-xl font-bold text-white">Novemberi kedvezmény </p></div>
                        <Image onClick={() => setOpen(true)} src="/sirko-hero.jpg" alt="EmlékQR érme termék" width={500} height={500} className="w-full h-auto cursor-pointer rounded-2xl hover:scale-105 transition-all duration-200"/>
                        <div className="grid grid-cols-3 gap-4">
                            <Image onClick={() => setOpen(true)} src="/sirko-hero.jpg" alt="EmlékQR érme termék" width={500} height={500} className="w-full h-auto cursor-pointer rounded-xl hover:scale-105 transition-all duration-200"/>
                            <Image onClick={() => setOpen(true)} src="/sirko-hero.jpg" alt="EmlékQR érme termék" width={500} height={500} className="w-full h-auto cursor-pointer rounded-xl hover:scale-105 transition-all duration-200"/>
                            <Image onClick={() => setOpen(true)} src="/sirko-hero.jpg" alt="EmlékQR érme termék" width={500} height={500} className="w-full h-auto cursor-pointer rounded-xl hover:scale-105 transition-all duration-200"/>
                        </div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                        <H4 classname={"text-[--rose]"}>990 Ft/hó</H4>
                        <p>vagy</p>
                        <H4 classname={"flex flex-nowrap gap-2 items-center text-[--rose] bg-[--cream] rounded-md p-2"}>9 900 Ft/év <Paragraph classname={"bg-[--rose] text-white p-2 rounded-md"}>-17%</ Paragraph></H4>
                        
                    </div>
                    <div className="flex flex-row gap-4">
                        {session && (!userdata.data.User.secret || userdata.data.User.secret === "") && (
                            <button
                            onClick={handleCheckout}
                            className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-[--blue] hover:bg-[--rose] hover:scale-105 transition-all text-white w-full"
                            disabled={loading}
                            >
                            <PiShoppingCart className="w-6 h-6" />
                            {loading ? "Átirányítás a pénztárba..." : "Tovább a pénztárba"}
                            </button>
                        )}
                        {!session && (
                            <button className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-[--blue] hover:bg-[--rose] hover:scale-105 transition-all text-white w-full" onClick={togglePopup}>
                                A vásárláshoz jelentkezz be
                            </button>
                        )}
                        {session && userdata.data.User.secret && userdata.data.User.secret !== "" && (
                            <button className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-[--blue] hover:bg-[--rose] hover:scale-105 transition-all text-white w-full cursor-not-allowed">
                                Aktiváld az adatlapod
                            </button>
                        )} 
                        
                    </div>
                    {session && userdata.data.User.secret && userdata.data.User.secret !== "" && (
                        <div className="text-[--error] p-4 border border-[--error] rounded-lg bg-red-500 bg-opacity-10">
                            <Paragraph>Jelenleg van egy adatlap előfizetésed amit nem aktiváltál. Egy újabb érme vásárlása előtt kérlek aktiváld az előző adatlapodat. Az aktiváló kódot, és az aktiválás menetét az email fiókodban találod. Ha esetleg eltelt 5 nap a rendelésed óta, és az érme még nem érkezett meg, vedd fel velünk a kapcsolatot a <Link className="underline" href="/kapcsolat">kapcsolat</Link> menüpontban található elérhetőségek egyikén.</Paragraph>
                        </div>
                    )} 
                    <div className="flex flex-col gap-4">
                        <Paragraph>Mit tartalmaz a csomag?</Paragraph>
                        <ul className="flex flex-col gap-2 list-disc">
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <AiOutlineQrcode className="text-[--blue] w-full h-auto"/> 
                                </div>
                                <Paragraph>
                                    2 db gravírozott aluminium emlékérmét (1 db tartalék)
                                </Paragraph>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <AiOutlineLayout className="text-[--blue] w-full h-auto"/>
                                </div>
                                <Paragraph>
                                    Egy szerkeszthető online emlékadatlapot ami kapcsolatban áll az érmével.
                                </Paragraph>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <IoDocumentTextOutline className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph>
                                    Nyomtatott használati leírást.
                                </Paragraph>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 pl-16 py-16 w-1/2">
                <div className="relative h-[350px]">
                    <Image src="/image-kepek/family-trip.webp" width={1000} height={500} className="absolute top-0 left-0 border-8 border-white shadow-xl w-2/3 -rotate-12"/>
                    <Image src="/image-kepek/family-trip2.webp" width={1000} height={500} className="absolute bottom-0 right-0 border-8 border-white shadow-xl w-2/3 rotate-6"/>
                </div>
                
                <H2 classname={"text-[--rose]"}>Mesélj el egy különleges történetet</H2>
                <Paragraph >Egy kirándulás, az első picúr a családban, egy életre szóló szerelem, sok sok esemény történik egy emberi élet alatt. Ne hagyd hogy ezek az emlékek feledésbe merüljenek.
                </Paragraph>
            </div>

            <div className="flex flex-col justify-center gap-4 pl-16 py-8 w-1/2">
                <H4 classname={"text-[--rose]"}>Az örökkévalóságig, és tovább...</H4>
                <div className="flex flex-col gap-8 p-8 bg-gradient-to-br from-[--blue-15] to-[--cream] rounded-2xl">
                    
                    <ul className="flex flex-col gap-8">
                            <li className="flex flex-nowrap gap-4 justify-start items-center">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph>
                                    <b>Anodizált</b> aluminium
                                </Paragraph>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph>
                                    <b>3M ultra erős</b> ragasztóval ellátva
                                </Paragraph>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph>
                                    <b>+1</b> tartalék érme
                                </Paragraph>
                            </li>
                        </ul>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 pl-16 py-16 w-1/2">
                <div className="">
                    <Image src="/image-kepek/fiok-kepek.webp" width={1000} height={500} className="rounded-xl"/>
                </div>
                
                <H2 classname={"text-[--rose]"}>Digitalizáld a fiókod</H2>
                <Paragraph>Fiókod tele van régi fotókkal? Gyönyörű fekete-fehér vagy akár szépia is van köztük? Digitalizáld! Ne hagyd elveszni, töltsd fel hogy örökre meglegyen.
                </Paragraph>
            </div>

            <div className="flex flex-col justify-center gap-4 pl-16 py-8 w-1/2">
                <div className="flex flex-col gap-8 p-8 bg-gradient-to-br from-[--rose-15] to-[--cream] rounded-2xl">
                    
                            <div className="flex flex-nowrap gap-4 justify-start items-center">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <IoIosInfinite className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph >
                                    Életre szóló garancia
                                </Paragraph>
                            </div>
                            <Paragraph>Ha az idők során megrongálódna vagy elveszne emlékérméd <b>ingyenesen cseréljük</b>!</Paragraph>

                </div>
            </div>

        </div>

        <div className="container m-auto flex flex-col gap-8 py-20">
        <H2 classname={"text-[--rose] ml-20"}>Ezt mondták rólunk</H2>
        <div className="relative flex flex-col gap-20 px-8 lg:flex-row w-full bg-[--cream] rounded-2xl">

        <div className="m-auto flex flex-col gap-20 p-8 lg:flex-row w-full bg-[--cream] rounded-2xl overflow-x-scroll z-0">
             
            <div className="flex flex-row min-w-max gap-10 p-8">

                <div className="flex flex-nowrap gap-4 max-w-[30vw]">
                    <div className="w-1/2">
                        <Image src="/image-kepek/family-trip.webp" width={300} height={300} className="rounded-xl"/>
                    </div>                 
                    <div className="flex flex-col w-1/2">
                        <Paragraph>Nagy Tímea</Paragraph>
                        <Paragraph>Nagyon meg vagyok elégedve a termékkel. Fél éve ragasztottam fel és még semmi baja</Paragraph>
                    </div>
                </div>

                <div className="flex flex-nowrap gap-4 max-w-[30vw]">
                    <div className="w-1/2">
                        <Image src="/image-kepek/family-trip.webp" width={300} height={300} className="rounded-xl"/>
                    </div>                 
                    <div className="flex flex-col w-1/2">
                        <Paragraph>Nagy Tímea</Paragraph>
                        <Paragraph>Nagyon meg vagyok elégedve a termékkel. Fél éve ragasztottam fel és még semmi baja</Paragraph>
                    </div>
                </div>

                <div className="flex flex-nowrap gap-4 max-w-[30vw]">
                    <div className="w-1/2">
                        <Image src="/image-kepek/family-trip.webp" width={300} height={300} className="rounded-xl"/>
                    </div>                 
                    <div className="flex flex-col w-1/2">
                        <Paragraph>Nagy Tímea</Paragraph>
                        <Paragraph>Nagyon meg vagyok elégedve a termékkel. Fél éve ragasztottam fel és még semmi baja</Paragraph>
                    </div>
                </div>

                <div className="flex flex-nowrap gap-4 max-w-[30vw]">
                    <div className="w-1/2">
                        <Image src="/image-kepek/family-trip.webp" width={300} height={300} className="rounded-xl"/>
                    </div>                 
                    <div className="flex flex-col w-1/2">
                        <Paragraph>Nagy Tímea</Paragraph>
                        <Paragraph>Nagyon meg vagyok elégedve a termékkel. Fél éve ragasztottam fel és még semmi baja</Paragraph>
                    </div>
                </div>
                </div>
            </div>
            <div className="absolute top-0 right-8 w-1/4 h-full bg-gradient-to-l from-[--cream] to-transparent rounded-2xl z-50 pointer-events-none"></div>
        </div>
        </div>
        
        
    </section>
    </>
  )
}
