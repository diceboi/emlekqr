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
import { LiaShippingFastSolid } from "react-icons/lia";

import Arrow from "./../components/Animations/Arrow"
import Camel from "./../components/Animations/Camel"
import Hearth from "./../components/Animations/Hearth"

import SecretCheckerModal from "../components/UI/SecretCheckerModal"
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "../Context";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
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

const STRIPE_PRICE_ID_ONE = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ONE;
const STRIPE_PRICE_ID_TWO = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TWO;
const STRIPE_PRICE_ID_THREE = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_THREE;

export default function EmlekermeInner({ session, userdata, classname }) {

    const { openPopup, togglePopup, setOpenPopup } = useContext(Context);
    const [open, setOpen] = useState(false);
    const {form, setForm} = useContext(Context)
    const [loading, setLoading] = useState(false);
    const [visibleErme, setVisibleErme] = useState("négyzet")
    const [payment, setPayment] = useState('');
    const [mode, setMode] = useState('')
    const router = useRouter();

    useEffect(() => {
        setPayment(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ONE);
        setMode('subscription')
    }, []);

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
              type: visibleErme,
              mode: mode
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

  return (
    <>
    <Modal openstate={openPopup === "Login"} onClose={() => togglePopup(null)}>
        <>
        {form === 'register' && (
            <RegisterForm from={"erme"} email={session?.user.email} productPriceId={payment} type={visibleErme} mode={mode} title={"A vásárlás folytatásához regisztrálj"}/>
        )}
        {form === 'login' && (
            <LoginForm from={"erme"} email={session?.user.email} productPriceId={payment} type={visibleErme} mode={mode} title={"A vásárlás folytatásához jelentkezz be"}/>
        )}
        </>  
    </Modal>

        <div id="emlekerme" className={`flex flex-col gap-8 rounded-2xl bg-white lg:shadow-2xl shadow-md lg:p-8 p-4 ${classname}`}>
            <div className="flex flex-col">
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
                        onClick={() => setPayment(STRIPE_PRICE_ID_ONE, setMode('subscription'))} 
                        className={`flex flex-nowrap justify-center items-center px-4 py-2 gap-2 rounded-l-3xl ${payment === STRIPE_PRICE_ID_ONE ? "bg-[--blue] hover:bg-[--blue]" : "bg-transparent hover:bg-[--blue-15]"} transition-all`}
                    >
                        <Label classname={`cursor-pointer ${payment === STRIPE_PRICE_ID_ONE ? "text-white" : "text-black"}`}>7000 Ft / év</Label>
                    </button>
                    <button 
                        onClick={() => setPayment(STRIPE_PRICE_ID_TWO, setMode('payment'))} 
                        className={`flex flex-nowrap justify-center items-center px-4 py-2 gap-2 rounded-r-3xl ${payment === STRIPE_PRICE_ID_TWO ? "bg-[--blue] hover:bg-[--blue]" : "bg-transparent hover:bg-[--blue-15]"} transition-all`}
                    >
                        <Label classname={`cursor-pointer ${payment === STRIPE_PRICE_ID_TWO ? "text-white" : "text-black"}`}>40 000 Ft örök érvényű</Label>
                    </button>
                </div>
                {/*<motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="flex flex-col gap-1 justify-center items-center px-4 py-2 rounded-3xl bg-[--error] w-full self-center h-auto shadow-md">
                    <Paragraph classname={"text-white text-center"}>Utoljára tavalyi áron 2025.02.28-ig</Paragraph>
                </motion.div>*/}
                {/*
                { payment === STRIPE_PRICE_ID_ONE && (
                    <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="flex flex-col gap-1 justify-center items-center px-4 py-2 rounded-3xl bg-[--error] w-full self-center h-auto shadow-md">
                    <Paragraph classname={"text-white text-center"}>Használd a <b><b>KARACSONYHO</b></b> kuponkódot</Paragraph>
                    <Label classname={"text-white"}>az ingyenes első hónapért</Label>
                    <button onClick={() => togglePopup("CouponInfo")}><Label classname={"text-white underline cursor-pointer"}>Részletek</Label></button>
                </motion.div>
                )}
                { payment === STRIPE_PRICE_ID_TWO && (
                    <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="flex flex-col gap-1 justify-center items-center px-4 py-2 rounded-3xl bg-[--error] w-full self-center h-auto shadow-md">
                    <Paragraph classname={"text-white text-center"}>Használd a <b><b>KARACSONYEV</b></b> kuponkódot</Paragraph>
                    <Label classname={"text-white"}>1000 Ft kedvezményért az éves összegből</Label>
                    <button onClick={() => togglePopup("CouponInfo")}><Label classname={"text-white underline cursor-pointer"}>Részletek</Label></button>
                </motion.div>
                )}
                { payment === STRIPE_PRICE_ID_THREE && (
                    <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="flex flex-col gap-1 justify-center items-center px-4 py-2 rounded-3xl bg-[--error] w-full self-center h-auto shadow-md">
                    <Paragraph classname={"text-white text-center"}>Használd a <b><b>KARACSONYOROK</b></b> kuponkódot</Paragraph>
                    <Label classname={"text-white"}>2100 Ft kedvezményért a teljes összegből</Label>
                    <button onClick={() => togglePopup("CouponInfo")}><Label classname={"text-white underline cursor-pointer"}>Részletek</Label></button>
                </motion.div>
                )}
                */}
            </div>

            <div className="flex flex-row items-center justify-center gap-4">
                {session && (!userdata?.data.User.secret || userdata?.data.User.secret === "") && (
                    <button
                    onClick={handleCheckout}
                    className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-gradient-to-br from-[--rose] to-[--blue] hover:bg-gradient-to-r hover:scale-105 transition-all text-white w-fit"
                    disabled={loading}
                    >
                    <PiShoppingCart className="w-6 h-6" />
                    {loading ? "Átirányítás a pénztárba..." : "Tovább a pénztárba"}
                    </button>
                )}
                {!session && (
                    <button onClick={() => {setForm('login'), togglePopup("Login")}} className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-gradient-to-br from-[--rose] to-[--blue] hover:bg-gradient-to-r hover:scale-105 transition-all text-white w-fit">
                        <PiShoppingCart className="w-6 h-6" />
                        Tovább a pénztárba
                    </button>
                )}
                {session && userdata?.data.User.secret && userdata?.data.User.secret !== "" && (
                    <button className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-[--rose] hover:bg-[--rose-hover] hover:scale-105 transition-all text-white w-full cursor-not-allowed">
                        Aktiváld az emlékoldalt
                    </button>
                )} 
                
            </div>
            {session && userdata?.data.User.secret && userdata?.data.User.secret !== "" && (
                <div className="text-[--error] p-4 border border-[--error] rounded-lg bg-red-500 bg-opacity-10">
                    <Label>Jelenleg van egy EmlékQR+ előfizetésed amit nem aktiváltál. Egy újabb érme vásárlása előtt kérlek aktiváld az előző emlékoldalad. Az aktiváló kódot, és az aktiválás menetét az email fiókodban találod. Ha esetleg eltelt 5 nap a rendelésed óta, és az érme még nem érkezett meg, vedd fel velünk a kapcsolatot a <Link className="underline" href="/kapcsolat">kapcsolat</Link> menüpontban található elérhetőségek egyikén.</Label>
                </div>
            )} 
            <div className="flex flex-col gap-4">
                <Label classname={"font-bold"}>Mit adunk?</Label>
                <ul className="flex flex-col gap-2 list-disc">
                    <li className="flex flex-nowrap gap-4 justify-start items-start border-b border-[--cream] pb-2">
                        <div className="flex justify-center items-center min-w-6 h-6">
                            <AiOutlineQrcode className="text-[--blue] w-full h-auto"/> 
                        </div>
                        <Label>
                            Szálcsiszolt felületű UV álló bakelit/műgyanta alapanyagú lézergravírozott időjárásálló QR kóddal ellátott érmét, erős kétoldalas ragasztóval ellátva.
                        </Label>
                    </li>
                    <li className="flex flex-nowrap gap-4 justify-start items-start border-b border-[--cream] pb-2">
                        <div className="flex justify-center items-center min-w-6 h-6">
                            <AiOutlineLayout className="text-[--blue] w-full h-auto"/>
                        </div>
                        <Label>
                            Egy könnyen szerkeszthető bárhonnan, bármilyen okoseszközről elérhető online emlékoldal ami kapcsolatban áll az érmével, és korlátlan mennyiségű képpel, videóval, szöveggel tölthető fel.
                        </Label>
                    </li>
                    <li className="flex flex-nowrap gap-4 justify-start items-start border-b border-[--cream] pb-2">
                        <div className="flex justify-center items-center min-w-6 h-6">
                            <LiaShippingFastSolid className="text-[--blue] w-full h-auto"/> 
                        </div>
                        <Label>
                            Ingyenes szállítást.
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
    </>
  )
}
