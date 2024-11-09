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
import Modal from "./UI/Modal";
import { motion } from "framer-motion";
import H1 from "./UI/H1";
import H2 from "./UI/H2";
import H3 from "./UI/H3";
import H4 from "./UI/H4";
import Paragraph from "./UI/Paragraph";
import Label from "./UI/Label";

import EmlekermeSquare from "../components/Emlekerme/EmlekermeSquare";
import EmlekermeCircle from "../components/Emlekerme/EmlekermeCircle";
import EmlekermeOval from "../components/Emlekerme/EmlekermeOval";

import { TbSquare, TbCircle, TbOvalVertical } from "react-icons/tb";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Emlekerme({ session, userdata }) {

    const { openPopup, togglePopup, setOpenPopup } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visibleErme, setVisibleErme] = useState("négyzet")
    const [payment, setPayment] = useState("price_1QHwPVBp9wE6DgiwSjovJVtG");
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
              productPriceId: payment, // Replace with your actual Stripe price ID
              type: visibleErme
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

      console.log("Payment ID: ", payment)

  return (
    <>
    <Modal openstate={openPopup === "Login"} onClose={() => togglePopup(null)}>
        <LoginForm />
    </Modal>

    <section className="flex flex-col lg:gap-8 w-full lg:px-0 py-10 lg:py-20 min-h-[100vh]">

        <div className="relative flex flex-col container w-full m-auto px-4">

            <div className="relative flex flex-col gap-20 lg:p-8 lg:flex-row w-full min-h-[60vh] bg-[--cream] bg-opacity-25 rounded-2xl">
                <div className="absolute lg:top-0 top-44 lg:left-[30vw] left-0 w-52 h-52 opacity-25 ">
                    <Arrow />
                </div>
                <div className="absolute top-2/3 lg:left-[30vw] left-[30vw] w-52 h-52 opacity-25">
                    <Camel />
                </div>
                <div className="absolute lg:top-3/3 -top-16 lg:right-0 -right-6 w-52 h-52 opacity-25">
                    <Hearth />
                </div>
                <div className="flex flex-col justify-center gap-8 p-8 lg:w-1/2">
                    <Paragraph classname={"text-[--blue] px-2 p-1 bg-white w-fit rounded-full uppercase"}>EmlékQR emlékérme</Paragraph>
                    <H1 classname={"text-[--rose]"}>Az emlékek életre kelnek</H1>
                    <Paragraph className="">A tökéletes, életre szóló ajándékot keresed?-  Lepd meg akár önmagad, vagy családodat - elevenítsétek fel együtt a csodás pillanatokat, meséljetek sosem hallott történeteket…
                    </Paragraph>
                </div>
            </div>

            <div className="lg:absolute top-20 right-16 flex flex-col w-full lg:w-5/12 h-full">
                <div className="flex flex-col gap-8 sticky top-40 rounded-2xl lg:m-8 mt-8 bg-white lg:shadow-2xl shadow-md p-8">
                    <div className="flex flex-col">
                        { payment === "price_1QHwPVBp9wE6DgiwSjovJVtG" && (
                            <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                            className="flex flex-col gap-1 justify-center items-center px-4 py-2 rounded-3xl bg-[--error] w-fit self-center h-auto shadow-md -mt-20">
                            <Paragraph classname={"text-white"}>Használd a <b><b>NOVQR</b></b> kuponkódot</Paragraph>
                            <Label classname={"text-white"}>havi 500Ft kedvezményért, 3 hónapig</Label>
                            <button onClick={() => togglePopup("CouponInfo")}><Label classname={"text-white underline cursor-pointer"}>Részletek</Label></button>
                        </motion.div>
                        )}
                        { payment === "price_1QHwPqBp9wE6DgiwiHztrtkq" && (
                            <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                            className="flex flex-col gap-1 justify-center items-center px-4 py-2 rounded-3xl bg-[--error] w-fit self-center h-auto shadow-md -mt-20">
                            <Paragraph classname={"text-white"}>Használd a <b><b>NOVQR1</b></b> kuponkódot</Paragraph>
                            <button onClick={() => togglePopup("CouponInfo")}><Label classname={"text-white underline cursor-pointer"}>Részletek</Label></button>
                        </motion.div>
                        )}
                        { visibleErme === "négyzet" && (
                            <EmlekermeSquare />
                        )}
                        { visibleErme === "kör" && (
                            <EmlekermeCircle />
                        )}
                        { visibleErme === "ovál" && (
                            <EmlekermeOval />
                        )}
                        
                        <div className="flex flex-col gap-2">
                            <Label classname={""}>Válassz formát: </Label>
                            <div className="grid grid-cols-3 bg-[--cream] rounded-3xl shadow-inner">
                                <button 
                                    onClick={() => setVisibleErme("négyzet")} 
                                    className={`flex flex-nowrap justify-center items-center px-4 py-2 gap-2 h-full rounded-l-3xl ${visibleErme === "négyzet" ? "bg-[--blue] hover:bg-[--blue]" : "bg-transparent hover:bg-[--blue-15]"} transition-all`}
                                >
                                    <TbSquare className={`${visibleErme === "négyzet" ? "text-white" : "text-[--blue]"} min-w-6 min-h-6`}/>
                                    <Label classname={`cursor-pointer ${visibleErme === "négyzet" ? "text-white" : "text-black"}`}>Négyzet</Label>
                                </button>
                                <button 
                                    onClick={() => setVisibleErme("kör")} 
                                    className={`flex flex-nowrap justify-center items-center px-4 py-2 gap-2 ${visibleErme === "kör" ? "bg-[--blue] hover:bg-[--blue]" : "bg-transparent hover:bg-[--blue-15]"} transition-all`}
                                >
                                    <TbCircle  className={`${visibleErme === "kör" ? "text-white" : "text-[--blue]"} min-w-6 min-h-6`}/>
                                    <Label classname={`cursor-pointer ${visibleErme === "kör" ? "text-white" : "text-black"}`}>Kör</Label>
                                </button>
                                <button 
                                    onClick={() => setVisibleErme("ovál")} 
                                    className={`flex flex-nowrap justify-center items-center px-4 py-2 gap-2 rounded-r-3xl ${visibleErme === "ovál" ? "bg-[--blue] hover:bg-[--blue]" : "bg-transparent hover:bg-[--blue-15]"} transition-all`}
                                >
                                    <TbOvalVertical  className={`${visibleErme === "ovál" ? "text-white" : "text-[--blue]"} min-w-6 min-h-6`}/>
                                    <Label classname={`cursor-pointer ${visibleErme === "ovál" ? "text-white" : "text-black"}`}>Ovális</Label>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Label classname={""}>Válassz fizetési módot: </Label>
                        <div className="grid grid-cols-2 bg-[--cream] rounded-3xl shadow-inner">
                            <button 
                                onClick={() => setPayment("price_1QHwPVBp9wE6DgiwSjovJVtG")} 
                                className={`flex flex-nowrap justify-center items-center px-4 py-2 gap-2 rounded-l-3xl ${payment === "price_1QHwPVBp9wE6DgiwSjovJVtG" ? "bg-[--blue] hover:bg-[--blue]" : "bg-transparent hover:bg-[--blue-15]"} transition-all`}
                            >
                                <Label classname={`cursor-pointer ${payment === "price_1QHwPVBp9wE6DgiwSjovJVtG" ? "text-white" : "text-black"}`}>1 000Ft / hó</Label>
                            </button>
                            <button 
                                onClick={() => setPayment("price_1QHwPqBp9wE6DgiwiHztrtkq")} 
                                className={`flex flex-nowrap justify-center items-center px-4 py-2 gap-2 rounded-r-3xl ${payment === "price_1QHwPqBp9wE6DgiwiHztrtkq" ? "bg-[--blue] hover:bg-[--blue]" : "bg-transparent hover:bg-[--blue-15]"} transition-all`}
                            >
                                <Label classname={`cursor-pointer ${payment === "price_1QHwPqBp9wE6DgiwiHztrtkq" ? "text-white" : "text-black"}`}>10 000Ft / év</Label>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row gap-4">
                        {session && (!userdata.data.User.secret || userdata.data.User.secret === "") && (
                            <button
                            onClick={handleCheckout}
                            className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-[--rose] hover:bg-[--rose-hover] hover:scale-105 transition-all text-white w-full"
                            disabled={loading}
                            >
                            <PiShoppingCart className="w-6 h-6" />
                            {loading ? "Átirányítás a pénztárba..." : "Tovább a pénztárba"}
                            </button>
                        )}
                        {!session && (
                            <button onClick={() => togglePopup("Login")} className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-[--rose] hover:bg-[--rose-hover] hover:scale-105 transition-all text-white w-full">
                                A vásárláshoz jelentkezz be
                            </button>
                        )}
                        {session && userdata.data.User.secret && userdata.data.User.secret !== "" && (
                            <button className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-[--rose] hover:bg-[--rose-hover] hover:scale-105 transition-all text-white w-full cursor-not-allowed">
                                Aktiváld az adatlapod
                            </button>
                        )} 
                        
                    </div>
                    {session && userdata.data.User.secret && userdata.data.User.secret !== "" && (
                        <div className="text-[--error] p-4 border border-[--error] rounded-lg bg-red-500 bg-opacity-10">
                            <Label>Jelenleg van egy adatlap előfizetésed amit nem aktiváltál. Egy újabb érme vásárlása előtt kérlek aktiváld az előző adatlapodat. Az aktiváló kódot, és az aktiválás menetét az email fiókodban találod. Ha esetleg eltelt 5 nap a rendelésed óta, és az érme még nem érkezett meg, vedd fel velünk a kapcsolatot a <Link className="underline" href="/kapcsolat">kapcsolat</Link> menüpontban található elérhetőségek egyikén.</Label>
                        </div>
                    )} 
                    <div className="flex flex-col gap-4">
                        <Label>Mit tartalmaz a csomag?</Label>
                        <ul className="flex flex-col gap-2 list-disc">
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <AiOutlineQrcode className="text-[--blue] w-full h-auto"/> 
                                </div>
                                <Label>
                                    Szálcsiszolt felületű UV álló bakelit/műgyanta alapanyagú lézergravírozott időjárásálló QR kóddal ellátott érmét, erős kétoldalas ragasztóval ellátva.
                                </Label>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <AiOutlineLayout className="text-[--blue] w-full h-auto"/>
                                </div>
                                <Label>
                                    Egy könnyen szerkeszthető bárhonnan, bármilyen okoseszközről elérhető online emlékadatlapot ami kapcsolatban áll az érmével.
                                </Label>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <IoDocumentTextOutline className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Label>
                                    Köszönőkártyát.
                                </Label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:pl-16 lg:py-16 py-8 lg:w-1/2">
                <div className="relative h-[350px]">
                    <Image src="/image-kepek/family-trip.webp" width={1000} height={500} className="absolute lg:top-0 top-16 left-4 border-8 border-white shadow-xl w-2/3 -rotate-12"/>
                    <Image src="/image-kepek/family-trip2.webp" width={1000} height={500} className="absolute lg:bottom-0 bottom-16 right-4 border-8 border-white shadow-xl w-2/3 rotate-6"/>
                </div>
                
                <H2 classname={"text-[--rose]"}>Mesélj el egy különleges történetet</H2>
                <Paragraph >Egy kirándulás, az első picúr a családban, egy életre szóló szerelem, sok sok esemény történik egy emberi élet alatt. Ne hagyd hogy ezek az emlékek feledésbe merüljenek.
                </Paragraph>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:pl-16 py-8 lg:w-1/2">
                <H4 classname={"text-[--rose]"}>Az örökkévalóságig, és tovább...</H4>
                <div className="flex flex-col gap-8 p-8 bg-gradient-to-br from-[--blue-15] to-[--cream] rounded-2xl">
                    
                    <ul className="flex flex-col gap-8">
                            <li className="flex flex-nowrap gap-4 justify-start items-center">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph>
                                    <b>Gyönyörű szálcsiszolt</b> felület
                                </Paragraph>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph>
                                    <b>Erős</b> ragasztóval ellátva
                                </Paragraph>
                            </li>
                            <li className="flex flex-nowrap gap-4 justify-start items-start">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <FaCircleCheck className="text-[--blue] w-auto h-full"/>
                                </div>
                                <Paragraph>
                                    <b>UV álló</b> kültéri műgyanta alapanyagú érme
                                </Paragraph>
                            </li>
                        </ul>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:pl-16 lg:py-16 py-8 lg:w-1/2">
                <div className="">
                    <Image src="/image-kepek/fiok-kepek.webp" width={1000} height={500} className="rounded-xl"/>
                </div>
                
                <H2 classname={"text-[--rose]"}>Digitalizáld a fiókod</H2>
                <Paragraph>Fiókod tele van régi fotókkal? Gyönyörű fekete-fehér vagy akár szépia is van köztük? Digitalizáld! Ne hagyd elveszni, töltsd fel hogy örökre meglegyen.
                </Paragraph>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:pl-16 py-8 lg:w-1/2">
                <div className="flex flex-col gap-8 p-8 bg-gradient-to-br from-[--rose-15] to-[--cream] rounded-2xl">
                    
                            <div className="flex flex-nowrap gap-4 justify-start items-center">
                                <div className="flex justify-center items-center min-w-6 h-6">
                                    <IoIosInfinite className="text-[--blue] w-auto h-full"/>
                                </div>
                                <H4 >
                                    Életre szóló garancia
                                </H4>
                            </div>
                            <Paragraph>Ha az idők során megrongálódna vagy elveszne emlékérméd <b>ingyenesen cseréljük</b>!</Paragraph>

                </div>
            </div>

        </div>        
        
    </section>
    </>
  )
}
