"use client"

import Modal from "./Modal"
import { useContext, useState, useEffect } from "react"
import { Context } from "../../Context"
import H1 from "./H1"
import Image from "next/image"
import { TbArrowRight } from "react-icons/tb"
import Link from "next/link"

export default function BeforeLeavePopup() {

    const { openPopup, togglePopup } = useContext(Context);
    const [lastScrollY, setLastScrollY] = useState(0);
  
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        togglePopup("BeforeLeavePopup");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < lastScrollY - 50) { // User scrolled up by at least 50px
        togglePopup("BeforeLeavePopup");
        window.removeEventListener("scroll", handleScroll); // Show only once
      }
      setLastScrollY(scrollY);
    };
  
    useEffect(() => {
      if (window.innerWidth > 768) { // Desktop behavior
        document.addEventListener("mouseleave", handleMouseLeave);
      } else { // Mobile behavior
        window.addEventListener("scroll", handleScroll);
      }
      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
        <Modal openstate={openPopup === "BeforeLeavePopup"} onClose={() => togglePopup(null)} classname={"min-h-[500px] overflow-hidden"}>
            <Image src="/nyeremenyjatek_popup.webp" fill style={{ objectFit: "cover", objectPosition: "center" }} />
            <Link href="https://fb.watch/vO8pbuEaE5/" target="__blank" className="absolute bottom-4 right-4 bg-[--cream] rounded-full p-2">
                <TbArrowRight className="text-[--rose] min-w-5 min-h-5"/>
            </Link>
        </Modal>
  )
}

