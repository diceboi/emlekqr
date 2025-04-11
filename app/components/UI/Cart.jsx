"use client"

import { useRef, useEffect, useContext } from "react";
import Image from "next/image";
import { Context } from "./../../Context"

import { CgClose } from "react-icons/cg";
import { PiShoppingCart } from "react-icons/pi";

export default function Cart() {

  const { setMobileMenuOpen, setUserMenuOpen, setCartMenuOpen, isCartMenuOpen, toggleCartMenu } = useContext(Context);
  const cartRef = useRef();

  const handleOpenClose = () => {
    toggleCartMenu();
    setMobileMenuOpen(false)
    setUserMenuOpen(false)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            setMobileMenuOpen(false);
            setUserMenuOpen(false);
            setCartMenuOpen(false);
        }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
        document.removeEventListener("click", handleClickOutside);
    };
  }, [setMobileMenuOpen, setUserMenuOpen, setCartMenuOpen]);

  return (
    <>
    <div id="cart" ref={cartRef} className={`absolute flex ${isCartMenuOpen === false ? 'left-20 pointer-events-none opacity-0' : 'left-0 pointer-events-auto opacity-100'} flex-col top-20 sm:right-20 w-full sm:max-w-[300px] py-4 h-auto bg-[#ffffffd3] transition-all rounded-2xl backdrop-blur-md shadow-xl z-0`}>
        <div className="flex items-center justify-center w-full border-b border-[--cream] pb-2 p-2">
          <h4>Kosár</h4>
        </div>
        <div id="cartitem" className="flex flex-nowrap gap-4 p-2">
          <div className="flex flex-col w-12 h-12 p-2">
              <Image src="/emlekqr-loading.gif" width={50} height={50}/>
          </div>
          <div className="flex flex-col gap-2">
              <p className="label">EmlékQR Emlékérme + digitális emlékoldal szolgáltatás</p>
              <div className="flex flex-nowrap justify-start items-center gap-2">
              <input id="qty" type="number" className="bg-[--cream] w-16 rounded-full text-center"/>
              <p className="label">db</p>
              </div>
              <div className="flex flex-nowrap justify-start py-2">
              <p className="font-black text-[--rose]">990 Ft / hó</p>
              </div>
          </div>
        </div>
        <div id="cartitem" className="flex flex-nowrap gap-4 p-2">
          <div className="flex flex-col w-12 h-12 p-2">
              <Image src="/emlekqr-loading.gif" width={50} height={50}/>
          </div>
          <div className="flex flex-col gap-2">
              <p className="label">EmlékQR Emlékérme + digitális emlékoldal szolgáltatás</p>
              <div className="flex flex-nowrap justify-start items-center gap-2">
              <input id="qty" type="number" className="bg-[--cream] w-16 rounded-full text-center"/>
              <p className="label">db</p>
              </div>
              <div className="flex flex-nowrap justify-start py-2">
              <p className="font-black text-[--rose]">990 Ft / hó</p>
              </div>
          </div>
        </div>
        <div className="flex flex-col px-4">
          <button className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 rounded-full bg-[--blue] hover:bg-[--rose] hover:scale-105 transition-all text-white ">Pénztár</button>
        </div>
    </div>
    <button onClick={handleOpenClose} className={`${isCartMenuOpen === false ? 'flex' : 'hidden'} flex-nowrap justify-center items-center gap-2 rounded-full transition-all duration-1500 cursor-pointer py-1 px-2 lg:py-2 lg:px-4 label`}>
      <PiShoppingCart className="w-6 h-6"/>
    </button>
    <button onClick={handleOpenClose} className={`${isCartMenuOpen === false ? 'hidden' : 'flex flex-nowrap border border-[--cream] shadow-lg'} justify-center items-center gap-2 rounded-full transition-all duration-1500 cursor-pointer py-1 px-2 lg:py-2 lg:px-4 label`}>
      <CgClose className="w-6 h-6"/>
    </button>
    </>
  )
}
