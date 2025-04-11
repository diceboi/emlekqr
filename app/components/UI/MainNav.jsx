"use client"

import Link from "next/link"
import Image from "next/image";
import { useRef, useEffect, useContext, useState } from "react";
import { Context } from "./../../Context"

import SeachBar from "./SearchBar"
import BaseLogo from "./BaseLogo"
import MobileLogo from "./MobileLogo"

import Cart from "./Cart"
import UserMenu from "./UserMenu"
import MobileMenu from "./MobileMenu"

import { BsQrCode } from "react-icons/bs";
import { TbMenu2, TbBrowserPlus,TbQrcode } from "react-icons/tb";
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

  const menuRef = useRef(null);

  const [openNotification, setOpenNotification] = useState(true)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMobileMenu();
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, toggleMobileMenu]);

  return (

    <nav className="flex flex-col justify-center w-full min-w-[330px] lg:w-full min-h-[70px] fixed top-0 z-[999] bg-white shadow-lg">
      {/*<div className={`${openNotification ? "flex" : "hidden"} flex-nowrap items-center justify-between px-4 gap-2 bg-[--error] w-full min-h-10`}>
        <div></div>
        <Label classname={"text-white leading-tight"}>Utoljára <b>tavalyi áron</b> 2025.02.28-ig | <Link href="/erme" className="lg:self-end"><Label classname={"text-white underline cursor-pointer"}>Az érmékhez</Label></Link></Label>
        
        <button onClick={() => setOpenNotification(prevState => (!prevState))}><CgClose className="w-6 h-6 text-white self-end" /></button>
      </div>*/}
      <div className="relative flex justify-between items-center h-full px-4 w-full z-50 ">
        <div className="flex flex-nowrap">
          <div  id="logo" className="flex justify-start w-full items-center gap-4 md:gap-0">
            
            <div id="mobile-nav" ref={menuRef} className={`absolute xl:hidden flex ${isMobileMenuOpen === false ? '-left-full' : 'left-0'} flex-col gap-4 px-4 top-[70px] w-full sm:w-[300px] py-4 h-auto bg-white transition-all rounded-none md:rounded-br-3xl`}>
                <div className="w-full self-center">
                    <SeachBar />
                </div>
                <ul className="flex flex-col gap-2 menuitem">
                  <Link href={"/hasznalata"} onClick={handleOpenClose}><li>Hogy működik?</li></Link>
                  <Link href={"/rolunk"} onClick={handleOpenClose}><li>Rólunk</li></Link>
                  <Link href={"/gyik"} onClick={handleOpenClose}><li>GYIK</li></Link>
                  <Link href={"/kapcsolat"} onClick={handleOpenClose}><li>Kapcsolat</li></Link>
                </ul>
            </div>
            <Link id="logo" href="/" className="min-w-[40px] md:min-w-[220px]">
                <BaseLogo />
                <MobileLogo/>
            </Link>
            <button id="hamburger" className="flex xl:hidden">
                <TbMenu2 className={`w-6 h-6 ${isMobileMenuOpen === true ? 'hidden' : 'flex'}`} onClick={handleOpenClose}/>
                <CgClose className={`w-6 h-6 ${isMobileMenuOpen === false ? 'hidden' : 'flex'}`} onClick={handleOpenClose}/>
            </button>
          </div>
          <div id="nav" className="flex flex-row justify-center items-center w-full">
            <ul className="hidden xl:flex flex-row menuitem">
              <Link href={"/hasznalata"}><li className="px-6 py-2 border border-transparent hover:bg-[--cream] transition-all min-w-max min-h-[70px] content-center">Hogy működik?</li></Link>
              <Link href={"/rolunk"}><li className="px-6 py-2 border border-transparent hover:bg-[--cream] transition-all min-w-max min-h-[70px] content-center">Rólunk</li></Link>
              <Link href={"/gyik"}><li className="px-6 py-2 border border-transparent hover:bg-[--cream] transition-all min-w-max min-h-[70px] content-center">GYIK</li></Link>
              <Link href={"/kapcsolat"}><li className="px-6 py-2 border border-transparent hover:bg-[--cream] transition-all min-w-max min-h-[70px] content-center">Kapcsolat</li></Link>
            </ul>
          </div>
          
        </div>
        <div className="xl:flex flex-col justify-center hidden w-full self-center">
          <SeachBar />
        </div>
        <div id="cta-user" className="relative flex flex-row justify-end min-w-fit gap-0">
          <div className="flex flex-col">
            <UserMenu />
          </div>
          <Link 
              href="/ingyenes-emlekoldal-keszites" 
              className="hidden sm:flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-4 rounded-2xl bg-[--cream] hover:border-[--blue] hover:bg-[--blue] transition-all text-[--rose] hover:text-white h-fit self-center mr-2">
                  <TbBrowserPlus 
                      className="w-8 h-8"
                  />
                  <label className='text-sm leading-4 cursor-pointer font-semibold'>
                    Ingyenes<br></br>emlékoldal
                  </label>
          </Link>
          <Link 
              href="/erme" 
              className="hidden sm:flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-4 rounded-2xl bg-gradient-to-br from-[--rose] to-[--blue] hover:bg-gradient-to-r hover:from-[--rose] hover:to-[--blue] transition-all text-white h-fit self-center">
                  <Image src="/emlekqr-plus-white.svg" alt="EmlékQR Plusz" title="Válts EmlékQR Plusz-ra" width={30} height={30} />
                  <label className='text-sm leading-4 cursor-pointer font-semibold'>
                    EmlékQR+<br></br>emlékoldal
                  </label>
          </Link>
          <Link 
              href="/ingyenes-emlekoldal-keszites" 
              className="sm:hidden flex flex-nowrap items-center justify-center py-1 px-2 rounded-xl text-[--blue] h-fit self-center mr-2 bg-[--cream]">
                  <TbBrowserPlus 
                      className="w-6 h-6"
                  />
          </Link>
          <Link 
              href="/erme" 
              className="sm:hidden flex flex-nowrap items-center justify-center py-1 px-2 rounded-xl bg-gradient-to-br from-[--rose] to-[--blue] text-white h-fit self-center">
                  <Image src="/emlekqr-plus-white.svg" alt="EmlékQR Plusz" title="Válts EmlékQR Plusz-ra" width={22} height={22} />
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
