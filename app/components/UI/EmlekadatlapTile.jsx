"use client"

import Image from "next/image"
import Link from "next/link"
import { TbTrash, TbArrowBadgeRightFilled, TbArrowBadgeDownFilled, TbQrcode } from "react-icons/tb"
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import Modal from "./Modal";
import H1 from "./H1";
import Label from "./Label";
import H3 from "./H3";
import H4 from "./H4";
import Paragraph from "./Paragraph";

export default function EmlekadatlapTile({ data }) {
  const { openPopup, togglePopup, setDeletableSubId, setDeletableAdatlapId, popupUri, setPopupUri } = useContext(Context);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [remainingDays, setRemainingDays] = useState(null);

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

  // Kiszámolja, hány nap van vissza a 15 napos próbaidőszakból
  useEffect(() => {
    if (data.createdAt) {
      const createdDate = new Date(data.createdAt); // Átalakítjuk dátummá
      const currentDate = new Date(); // Jelenlegi dátum
      const diffTime = currentDate - createdDate; // Különbség milliszekundumban
      const diffDays = 15 - Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 15 napból kivonjuk az eltelt napokat
      setRemainingDays(diffDays > 0 ? diffDays : 0); // Ha már letelt, akkor 0-t állítunk be
    }
  }, [data.createdAt]);

  const handleDeleteClick = () => {
    setDeletableSubId(data.subscription);
    setDeletableAdatlapId(data._id); // Set the current subscription ID as deletable
    togglePopup("deleteAdatlap"); // Open the modal or trigger popup
  };

  return (
    <>
      <Modal openstate={openPopup === "Connect" && popupUri === data.uri} onClose={() => {togglePopup(null); setPopupUri(null);}}>
          <div className="flex flex-col gap-8">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              <div className="relative flex flex-col gap-2 items-center justify-between bg-[--cream] rounded-xl p-2">
                <Image src="/ermek/negyzet-erme.webp" width={100} height={100} alt="Érme" className="lg:w-[100px] w-[75px] h-auto"/>
                <h3 className="text-xl text-center font-semibold tracking-tight text-[--rose]">Vásárolj egy érmét</h3>
                <TbArrowBadgeRightFilled className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 min-w-12 h-auto text-[--blue] z-10"/>
                <TbArrowBadgeDownFilled className="block lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 min-w-12 h-auto text-[--blue] z-10"/>
              </div>
              <div className="relative flex flex-col gap-2 items-center justify-between bg-[--cream] rounded-xl p-2">
                <Image src="/image-kepek/scan.webp" width={100} height={100} alt="Érme" className="lg:w-[100px] w-[75px] h-auto"/>
                <h3 className="text-xl text-center font-semibold tracking-tight text-[--rose]">Olvasd be</h3>
                <TbArrowBadgeRightFilled className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 min-w-12 h-auto text-[--blue] z-10"/>
                <TbArrowBadgeDownFilled className="block lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 min-w-12 h-auto text-[--blue] z-10"/>
              </div>
              <div className="flex flex-col gap-2 items-center justify-between bg-[--cream] rounded-xl p-2">
                <Image src="/ermek/negyzet-erme.webp" width={100} height={100} alt="Érme" className="lg:w-[100px] w-[75px] h-auto"/>
                <h3 className="text-xl text-center font-semibold tracking-tight text-[--rose]">Kapcsold össze</h3>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Label><b>1. lépés:</b> Vásárolj egy érmét!</Label>
              <Label><b>2. lépés:</b> A telefonod kamerájával olvasd be a QR kódot. (Ha régebbi telefonod van, akkor tölts le egy QR kód olvasó alkalmazást.)</Label>
              <Label><b>3. lépés:</b> Miután megnyitottad a QR kódon található oldalt, írd be a 6 számjegyű kódot amit email-ben kaptál vásárlás után. Ha az ellenőrzés sikeres, válaszd ki melyik ingyenes adatlapodat szeretnéd összekötni az érmével, vagy kezdj el szerkeszteni egy teljesen új adatlapot.</Label>
              <div className="flex lg:flex-row flex-col gap-4 self-center">
              <Link 
                  href="/erme" 
                  className="flex flex-nowrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-[--rose] to-[--blue] hover:bg-gradient-to-r hover:from-[--rose] hover:to-[--blue] transition-all text-white">
                      <TbQrcode 
                          className="w-6 h-6"
                      />
                      <span >
                        Érme rendelés
                      </span>
              </Link>
              </div>
              
            </div>
          </div>
      </Modal>
      <div className={`relative flex lg:flex-row flex-col gap-8 ${data.paymentStatus === 'free' ? 'bg-white  hover:bg-[--cream]' : 'bg-[--blue-15]  hover:bg-[--blue-50]'} rounded-xl border border-[--blue-15] hover:border-[--cream] p-4 min-h-[125px]`}>
        <div className="flex lg:flex-row flex-col gap-4 w-full">
          <div className={`flex flex-col items-center justify-center lg:w-[75px] lg:h-[75px] w-[50px] h-[50px] self-start ${data.paymentStatus === 'free' ? 'bg-gradient-to-br from-[--white] to-[--white]' : 'bg-gradient-to-br from-[--rose] to-[--blue]'} rounded-full p-1`}>
            <div className={`relative lg:w-[65px] lg:h-[65px] w-[40px] h-[40px] rounded-full ${data.paymentStatus === 'free' ? 'border border-gray-300' : 'border border-transparent'}`}>
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
          </div>
          <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <h4 className="text-lg">{data.name}</h4>
              <p className="text-sm">({data.age})</p>
              {data.paymentStatus === 'free' ? (
                null
              ):(
                <Image src='/emlekqr-plus-color.svg' width={20} height={20} title="EmlékQR Plus (az adatlaphoz érme is tartozik)" className="" alt="EmlékQR Plus" />
              )}
            </div>

            {data.uri && !data.uri.includes("@") && (
              <p className="text-xs">Azonosító: {data.uri}</p>
            )}

            <div className="flex lg:flex-nowrap flex-wrap gap-2">
              <p className="text-xs">Státusz: </p>
              {subscriptionStatus ? (
                <div className="text-xs">
                  <p className={subscriptionStatus.status === "active" ? 'text-green-500' : 'text-red-500'}>
                    {subscriptionStatus.status === "active" ? 'Fizetett' : 'Nem fizetett'}
                  </p>
                  {data?.paymentMethod && (
                    <p className="text-gray-500">Fizetési mód: {data.paymentMode}</p>
                  )}
                </div>
              ) : data?.paymentStatus === 'free' ? (
                <div className="text-xs text-[--blue]">
                  <p>Ingyenes adatlap</p>
                  {data?.paymentMethod && (
                    <p className="text-gray-500">Fizetési mód: {data.paymentMode}</p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-500">Ellenőrzés alatt...</p>
              )}

            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-end lg:items-end items-start gap-2 min-w-fit">
          <TbTrash className="absolute top-4 right-4 w-6 h-6 text-[--error] hover:text-white bg-transparent hover:bg-[--error] p-1 cursor-pointer rounded-full" onClick={handleDeleteClick} />
          <Link href={`/emlekadatlapok/${data.uri}`} className="px-2 py-1 bg-[--blue] hover:bg-[--blue-hover] rounded-full transition-all text-white text-xs lg:w-fit">Adatlap megtekintése</Link>
          {data.paymentStatus === 'free' && (
            <button onClick={() => {togglePopup("Connect"); setPopupUri(data.uri)}} className="px-2 py-1 bg-gradient-to-br from-[--rose] to-[--blue] hover:bg-gradient-to-r hover:from-[--rose] hover:to-[--blue] rounded-full transition-all text-white text-xs lg:w-fit">Összekapcsolás érmével</button>
          )}
        </div>
      </div>
    </>
  );
}
