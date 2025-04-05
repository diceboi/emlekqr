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
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        toggleUserMenu();
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen, toggleUserMenu]);
  

  return (
    <>
      <div id="profile-nav" ref={menuRef} className={`absolute flex ${isUserMenuOpen === false ? 'left-0 pointer-events-none opacity-0' : 'left-0 pointer-events-auto opacity-100'} top-[70px] sm:right-20 w-fit py-4 h-auto bg-white transition-all rounded-b-2xl backdrop-blur-md shadow-xl z-0`}>
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
      <button onClick={handleOpenClose} className={`flex-nowrap justify-center items-center gap-2 transition-all duration-150 cursor-pointer py-1 px-2 lg:px-6 label min-h-[70px] min-w-max`}>
        <div className="relative lg:w-10 w-8 lg:h-10 h-8  rounded-full overflow-hidden">
          <Image src={userData?.image || '/blank-profile.webp'} fill style={{ objectFit: "cover" }} alt="Profile" />
        </div>
        {/*<Label classname={'cursor-pointer'}>{session ? `Szia ${session.user?.name?.split(' ').slice(-1)[0]}` : null}</Label>*/}
      </button>
    </>
  );
}
