"use client"

import { useRef, useEffect, useContext } from "react";
import { Context } from "./../../Context"
import Image from "next/image";

import { TbUser } from "react-icons/tb";
import { CgClose } from "react-icons/cg";

import { signOut, useSession } from "next-auth/react"
import Link from "next/link";

export default function UserMenu() {

  const {data: session} = useSession();

  const { setMobileMenuOpen, isUserMenuOpen, toggleUserMenu } = useContext(Context);

  const handleOpenClose = () => {
    toggleUserMenu();
    setMobileMenuOpen(false)
  };

  return (
    <>
    <div id="profile-nav" className={`absolute flex ${isUserMenuOpen === false ? 'left-20 pointer-events-none opacity-0' : 'left-0 pointer-events-auto opacity-100'} top-20 sm:right-20 w-full sm:max-w-min py-4 h-auto bg-[#ffffffd3] transition-all rounded-2xl backdrop-blur-md shadow-xl z-0`}>
        {session? <ul className="flex flex-col gap-2 px-4 menuitem">
            <Link href="/profil"><li className=" hover:bg-[--cream] py-1 px-2 rounded-full">Profil</li></Link>
            <li onClick={signOut} className="cursor-pointer hover:bg-[--cream] py-1 px-2 rounded-full">Kijelentkezés</li>
            </ul>
            : 
            <ul className="flex flex-col gap-2 px-4 menuitem">
            <Link href="/bejelentkezes"><li className=" text-nowrap hover:bg-[--cream] py-1 px-2 rounded-full">Bejelentkezés / Regisztráció</li></Link>
            </ul> 
        }
    </div>
    <button onClick={handleOpenClose} className={`${isUserMenuOpen === false ? 'flex' : 'hidden'} flex-nowrap justify-center items-center gap-2 border border-transparent hover:border-neutral-300 rounded-full transition-all duration-150 cursor-pointer py-1 px-2 lg:py-2 lg:px-4 label`}>
        <Image src={'/blank-profile.webp' || session.user.image} width={50} height={50} className="w-6 h-6 rounded-full" />
        {session? `Szia ${session.user?.name?.split(' ').slice(-1)[0]}` : null}
    </button>
    <button onClick={handleOpenClose} className={`${isUserMenuOpen === false ? 'hidden' : 'flex flex-nowrap border border-neutral-300'} justify-center items-center gap-2  rounded-full transition-all duration-150 cursor-pointer py-1 px-2 lg:py-2 lg:px-4 label`}>
        {session? `Szia ${session.user?.name?.split(' ').slice(-1)[0]}` : null}
        <CgClose className="w-6 h-6"/>
    </button>
    </>
  )
}
