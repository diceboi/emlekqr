"use client"

import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion"
import UploadForm from "../Emlekadatlap/S3UploadForm"
import { usePathname } from 'next/navigation'


export default function UploadImageModal({ isOpen, closeModal, currentyear, type }) {

    const pathname = usePathname()
    const lastDigits = pathname.slice(-7);

    return (
        isOpen && (
          <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed flex justify-center items-center top-0 left-0 w-full h-full backdrop-blur-md bg-[--rose-15] z-50" onClick={closeModal}>
            <button className="absolute top-4 right-4" onClick={closeModal}>
                <IoMdClose className=" w-6 h-6 text-[--grey] bg-white rounded-full"/>
            </button>
            <div className="container-inner p-4 lg:p-0 m-auto bg-[--navy] z-50 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className=" m-auto bg-white rounded-2xl h-[50vh]">
                <UploadForm year={currentyear} type={type} datasheet={lastDigits} closemodal={closeModal}/>
                </div>
            </div>
          </motion.div>
        )
      );
};