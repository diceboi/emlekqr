"use client"

import Link from "next/link"
import { useRef, useEffect, useContext, useState } from "react";
import { Context } from "./../../Context"

import SeachBar from "./SearchBar"
import BaseLogo from "./BaseLogo"
import MobileLogo from "./MobileLogo"

import Cart from "./Cart"
import UserMenu from "./UserMenu"
import MobileMenu from "./MobileMenu"

import { BsQrCode } from "react-icons/bs";
import { TbMenu2 } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import H4 from "./H4";
import Paragraph from "./Paragraph";
import Label from "./Label";
import Modal from "./Modal";

export default function MainNav() {

  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen, setUserMenuOpen, setUserMenuClose, isUserMenuOpen, toggleUserMenu, openPopup, togglePopup } = useContext(Context);

  const handleOpenClose = () => {
    toggleMobileMenu();
  };

  const [openNotification, setOpenNotification] = useState(true)

  return (

    <nav className="w-full min-w-[330px] lg:w-full min-h-[70px] fixed top-0 z-50 bg-white shadow-lg">
      <div className={`${openNotification ? "flex" : "hidden"} flex-nowrap items-center justify-center px-4 gap-2 bg-[--error] w-full min-h-10`}>
        <Label classname={"text-white leading-tight"}>Használd a <b><b>KARACSONYHO</b></b> vagy <b><b>KARACSONYEV</b></b> vagy <b><b>KARACSONYOROK</b></b> kuponkódot havi vagy éves kedvezményért! <button onClick={() => togglePopup("CouponInfo")} className="lg:self-end"><Label classname={"text-white underline cursor-pointer"}>Részletek</Label></button></Label>
        
        <button onClick={() => setOpenNotification(prevState => (!prevState))}><CgClose className="w-6 h-6 text-white" /></button>
      </div>
      <div className="relative flex justify-between items-center h-full px-4 py-4 w-full z-50 ">
        <div className="flex flex-nowrap gap-8">
          <div  id="logo" className="flex justify-start w-full items-center gap-4">
            <button id="hamburger" className="flex lg:hidden">
                <TbMenu2 className={`w-6 h-6 ${isMobileMenuOpen === true ? 'hidden' : 'flex'}`} onClick={handleOpenClose}/>
                <CgClose className={`w-6 h-6 ${isMobileMenuOpen === false ? 'hidden' : 'flex'}`} onClick={handleOpenClose}/>
            </button>
            <div id="mobile-nav" className={`absolute lg:hidden flex ${isMobileMenuOpen === false ? '-left-full' : 'left-0'} flex-col gap-4 px-4 top-[70px] w-full sm:w-[300px] py-4 h-auto bg-[--cream] transition-all`}>
                <ul className="flex flex-col gap-2 menuitem">
                  <Link href={"/hasznalata"} onClick={handleOpenClose}><li>Hogy működik?</li></Link>
                  <Link href={"/rolunk"} onClick={handleOpenClose}><li>Rólunk</li></Link>
                  <Link href={"/gyik"} onClick={handleOpenClose}><li>GYIK</li></Link>
                  <Link href={"/kapcsolat"} onClick={handleOpenClose}><li>Kapcsolat</li></Link>
                  
                </ul>
                <div className="w-full self-center">
                    <SeachBar />
                  </div>
            </div>
            <Link id="logo" href="/" className="min-w-[40px] md:min-w-[200px]">
                <BaseLogo />
                <MobileLogo/>
            </Link>
          </div>
          <div id="nav" className="flex flex-row justify-center items-center w-full gap-4">
            <ul className="hidden lg:flex flex-row gap-2 px-4 menuitem">
              <Link href={"/hasznalata"}><li className="px-4 py-2 border border-transparent hover:border-neutral-300 rounded-full transition-all min-w-max">Hogy működik?</li></Link>
              <Link href={"/rolunk"}><li className="px-4 py-2 border border-transparent hover:border-neutral-300 rounded-full transition-all min-w-max">Rólunk</li></Link>
              <Link href={"/gyik"}><li className="px-4 py-2 border border-transparent hover:border-neutral-300 rounded-full transition-all min-w-max">GYIK</li></Link>
              <Link href={"/kapcsolat"}><li className="px-4 py-2 border border-transparent hover:border-neutral-300 rounded-full transition-all min-w-max">Kapcsolat</li></Link>
            </ul>
          </div>
          
        </div>
        <div className="lg:flex flex-col justify-center hidden w-full self-center">
          <SeachBar />
        </div>
        <div id="cta-user" className="relative flex flex-row justify-end items-center min-w-fit gap-1 lg:gap-2">
          <div className="flex flex-row ">
            <UserMenu />
          </div>
          <Link 
              href="/erme" 
              className="hidden sm:flex flex-nowrap items-center justify-center gap-2 hover:gap-3 py-1 px-4 lg:py-2 lg:px-6 ml-1 hover:ml-0 rounded-full bg-[--blue] hover:bg-[--rose] transition-all text-white">
                  <BsQrCode 
                      className="w-6 h-6"
                  />
                  Az érme
          </Link>
          <Link 
              href="/erme" 
              className="sm:hidden flex flex-nowrap items-center justify-center gap-2 hover:gap-3 py-1 px-4 lg:py-2 lg:px-6 ml-1 hover:ml-0 rounded-full bg-[--blue] hover:bg-[--rose] transition-all text-white">
                  <BsQrCode 
                      className="w-6 h-6"
                  />
          </Link>
        </div>
      </div>
      
      {/*<Modal openstate={openPopup === "CouponInfo"} onClose={() => togglePopup(null)}>
        <div className="flex flex-col gap-4">
            <Paragraph><span className="font-bold text-[--rose]">KARACSONYHO</span> kupon (havi előfizetéshez): A kupon az első hónapot ingyenesen biztosítja.</Paragraph>
            <Paragraph><span className="font-bold text-[--rose]">KARACSONYEV</span> kupon (éves előfizetéshez): A kupon 1000Ft kedvezményt nyújt az éves 5 000 Ft-os összegből azaz az első évért csak 4000 Ft-ot kell fizetned.</Paragraph>
            <Paragraph><span className="font-bold text-[--rose]">KARACSONYOROK</span> kupon (örök érvényű vásárláshoz): A kupon 2100 Ft kedvezményt nyújt a teljes 35 000 Ft-os összegből azaz az első évért csak 32 900 Ft-ot kell fizetned.</Paragraph>
            <Paragraph>A három kuponkód december 31. 23:59-ig érvényes.</Paragraph>
        </div>
      </Modal>*/}
    </nav>
  )
}
