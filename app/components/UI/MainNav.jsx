"use client"

import Link from "next/link"
import { useRef, useEffect, useContext } from "react";
import { Context } from "./../../Context"

import BaseLogo from "./BaseLogo"
import MobileLogo from "./MobileLogo"

import Cart from "./Cart"
import UserMenu from "./UserMenu"
import MobileMenu from "./MobileMenu"

import { BsQrCode } from "react-icons/bs";
import { TbMenu2 } from "react-icons/tb";
import { CgClose } from "react-icons/cg";

export default function MainNav() {

  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen, setUserMenuOpen, setCartMenuOpen, isUserMenuOpen, toggleUserMenu, isCartMenuOpen, toggleCartMenu } = useContext(Context);

  const handleOpenClose = () => {
    toggleMobileMenu();
    setUserMenuOpen(false)
    setCartMenuOpen(false)
  };

  return (

    <nav className="w-full min-w-[330px] lg:w-full h-[70px] fixed top-0 z-50 bg-white border-b border-[--cream]">
      <div className="relative flex justify-between h-full px-4 w-full z-50">
        <div className="flex flex-nowrap gap-8">
          <div  id="logo" className="flex justify-start w-full items-center gap-4">
            <button id="hamburger" className="flex lg:hidden">
                <TbMenu2 className={`w-6 h-6 ${isMobileMenuOpen === true ? 'hidden' : 'flex'}`} onClick={handleOpenClose}/>
                <CgClose className={`w-6 h-6 ${isMobileMenuOpen === false ? 'hidden' : 'flex'}`} onClick={handleOpenClose}/>
            </button>
            <div id="mobile-nav" className={`absolute lg:hidden flex ${isMobileMenuOpen === false ? '-left-full' : 'left-0'} top-[70px] w-full sm:w-[300px] py-4 h-auto bg-[--cream] transition-all`}>
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
          </div>
          <div id="nav" className="flex flex-row justify-center items-center w-full gap-4">
            <ul className="hidden lg:flex flex-row gap-8 px-4 menuitem">
              <li>Használata</li>
              <li>Rólunk</li>
              <li>GYIK</li>
              <li>Felfedezés</li>
              <li>Kapcsolat</li>
            </ul>
          </div>
        </div>
        <div id="cta-user" className="relative flex flex-row justify-end items-center min-w-fit gap-1 lg:gap-2">
          <div className="flex flex-row ">
            <UserMenu />
            <Cart />
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
    </nav>
  )
}
