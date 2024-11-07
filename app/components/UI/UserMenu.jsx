"use client";

import { useRef, useEffect, useContext, useState } from "react";
import { Context } from "./../../Context";
import Image from "next/image";
import { TbUser } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Label from "./Label";

export default function UserMenu() {
  const { data: session } = useSession();
  const { setMobileMenuOpen, isUserMenuOpen, toggleUserMenu } = useContext(Context);
  const [userData, setUserData] = useState(null);

  // Function to fetch user data by email
  const getUserData = async (email) => {
    try {
      const response = await fetch(`/api/getUserData?email=${email}`);
      const result = await response.json();
      if (response.ok) {
        setUserData(result.data.User);
      } else {
        console.error("Error fetching user data:", result.error);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    // Fetch user data if session exists
    if (session?.user?.email) {
      getUserData(session.user.email);
    }
  }, [session]);

  const handleOpenClose = () => {
    toggleUserMenu();
  };

  return (
    <>
      <div id="profile-nav" className={`absolute flex ${isUserMenuOpen === false ? 'right-20 pointer-events-none opacity-0' : 'right-0 pointer-events-auto opacity-100'} top-20 sm:right-20 w-fit py-4 h-auto bg-[#ffffffd3] transition-all rounded-2xl backdrop-blur-md shadow-xl z-0`}>
        {session ? (
          <ul className="flex flex-col gap-2 px-4 menuitem">
            <Link href="/profil" onClick={handleOpenClose}>
              <li className="hover:bg-[--cream] py-1 px-2 rounded-full">Profil</li>
            </Link>
            <li onClick={() => {signOut(); handleOpenClose()}} className="cursor-pointer hover:bg-[--cream] py-1 px-2 rounded-full">
              Kijelentkezés
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col gap-2 px-4 menuitem">
            <Link href="/bejelentkezes">
              <li className="text-nowrap hover:bg-[--cream] py-1 px-2 rounded-full">Bejelentkezés / Regisztráció</li>
            </Link>
          </ul>
        )}
      </div>
      <button onClick={handleOpenClose} className={`${isUserMenuOpen === false ? 'flex' : 'hidden'} flex-nowrap justify-center items-center gap-2 border border-transparent hover:border-neutral-300 rounded-full transition-all duration-150 cursor-pointer py-1 px-2 lg:py-2 lg:px-4 label`}>
        <div className="relative w-6 h-6 rounded-full overflow-hidden">
          <Image src={userData?.image || '/blank-profile.webp'} fill style={{ objectFit: "cover" }} alt="Profile" />
        </div>
        <Label>{session ? `Szia ${session.user?.name?.split(' ').slice(-1)[0]}` : null}</Label>
      </button>
      <button onClick={handleOpenClose} className={`${isUserMenuOpen === false ? 'hidden' : 'flex flex-nowrap border border-neutral-300'} justify-center items-center gap-2 rounded-full transition-all duration-150 cursor-pointer py-1 px-2 lg:py-2 lg:px-4 label`}>
        <div className="relative w-6 h-6 rounded-full overflow-hidden">
          <Image src={userData?.image || '/blank-profile.webp'} fill style={{ objectFit: "cover" }} alt="Profile" />
        </div>
        <Label>{session ? `Szia ${session.user?.name?.split(' ').slice(-1)[0]}` : null}</Label>
        <CgClose className="w-4 h-4" />
      </button>
    </>
  );
}
