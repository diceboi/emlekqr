"use client"

import { useState, useRef, useEffect } from "react";
import BaseLogo from "./BaseLogo"
import Link from "next/link"

import { TbMenu2 } from "react-icons/tb";
import { TbUser } from "react-icons/tb";
import { TbHammer } from "react-icons/tb";
import { CgClose } from "react-icons/cg";

export default function MainNav() {

  const [mobilemenuopen, setMobilemenuopen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobilemenuopen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  function toggleMobileMenu() {
    setMobilemenuopen((prev) => !prev);
  }

  return (

    <nav className="w-full min-w-[330px] lg:w-11/12 h-[70px] fixed top-0 z-50 bg-[#ffffffc7] backdrop-blur-md -translate-x-1/2 left-1/2 rounded-none lg:rounded-b-2xl shadow-xl">
      <div className="relative flex justify-between h-full px-4 w-full">
        <div  id="logo" className="flex justify-start w-3/12 items-center gap-4">

          <button id="hamburger" className="flex lg:hidden">
            <TbMenu2 className={`w-6 h-6 ${mobilemenuopen === true ? 'hidden' : 'flex'}`} onClick={toggleMobileMenu}/>
            <CgClose className={`w-6 h-6 ${mobilemenuopen === false ? 'hidden' : 'flex'}`} onClick={toggleMobileMenu}/>
          </button>
          
          <div ref={menuRef} id="mobile-nav" className={`absolute lg:hidden flex ${mobilemenuopen === false ? '-left-full' : 'left-0'} top-[70px]  w-full sm:w-[300px] py-4 h-auto bg-[--cream] transition-all`}>
            <ul className="flex flex-col gap-2 px-4 menuitem">
              <li>Használata</li>
              <li>Rólunk</li>
              <li>GYIK</li>
              <li>Felfedezés</li>
              <li>Kapcsolat</li>
            </ul>
          </div>

          <Link id="logo" href="/" className="min-w-[150px] xl:min-w-[200px]">
            <BaseLogo />
          </Link>
        </div>

        <div id="nav" className="flex flex-row justify-center items-center w-6/12 gap-4">
          <ul className="hidden lg:flex flex-row gap-8 px-4 menuitem">
            <li>Használata</li>
            <li>Rólunk</li>
            <li>GYIK</li>
            <li>Felfedezés</li>
            <li>Kapcsolat</li>
          </ul>
        </div>

        <div id="cta" className="flex flex-row justify-end items-center w-full lg:w-3/12 gap-2 lg:gap-4">
          <ul className="flex flex-row gap-4">
            <Link href="/profil">
              <TbUser className="w-6 h-6"/>
            </Link>
          </ul>
          
          <Link 
              href="/erem-muhely" 
              className="hidden sm:flex flex-nowrap items-center justify-center gap-2 hover:gap-3 py-1 px-4 lg:py-2 lg:px-6 ml-1 hover:ml-0 rounded-full bg-[--blue] hover:bg-[--rose] transition-all text-white">
                  <TbHammer 
                      className="w-6 h-6"
                  />
                  Érme műhely
          </Link>

          <Link 
              href="/erem-muhely" 
              className="sm:hidden flex flex-nowrap items-center justify-center gap-2 hover:gap-3 py-1 px-4 lg:py-2 lg:px-6 ml-1 hover:ml-0 rounded-full bg-[--blue] hover:bg-[--rose] transition-all text-white">
                  <TbHammer 
                      className="w-6 h-6"
                  />
          </Link>
        </div>
      </div>
    </nav>
  )
}
