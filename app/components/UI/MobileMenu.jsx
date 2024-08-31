"use client"

import { useContext } from "react";
import { Context } from "./../../Context"
import Link from "next/link"

import BaseLogo from "./BaseLogo"
import MobileLogo from "./MobileLogo"

import { TbMenu2 } from "react-icons/tb";
import { CgClose } from "react-icons/cg";

export default function MobileMenu() {

  const { isMobileMenuOpen, toggleMobileMenu } = useContext(Context);

  const handleOpenClose = () => {
    toggleMobileMenu();
  }

  return (
    <>
    <button id="hamburger" className="flex lg:hidden">
        <TbMenu2 className={`w-6 h-6 ${isMobileMenuOpen === true ? 'hidden' : 'flex'}`} onClick={handleOpenClose}/>
        <CgClose className={`w-6 h-6 ${isMobileMenuOpen === false ? 'hidden' : 'flex'}`} onClick={handleOpenClose}/>
    </button>
    <div ref={menuRef} id="mobile-nav" className={`absolute lg:hidden flex ${isMobileMenuOpen === false ? '-left-full' : 'left-0'} top-[70px] w-full sm:w-[300px] py-4 h-auto bg-[--cream] transition-all`}>
        <ul className="flex flex-col gap-2 px-4 menuitem">
            <li>Használata</li>
            <li>Rólunk</li>
            <li>GYIK</li>
            <li>Felfedezés</li>
            <li>Kapcsolat</li>
        </ul>
    </div>
    <Link id="logo" href="/" className="min-w-[40px] md:min-w-[200px]">
        <BaseLogo />
        <MobileLogo/>
    </Link>
    </>
  )
}

