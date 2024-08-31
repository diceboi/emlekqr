import Image from "next/image"

export default function MobileLogo() {
  return (
    <>
    <Image 
        src="/emleqr-logo-mobile.svg" 
        width={40} 
        height={40}
        className="block md:hidden"
        alt="mobilelogo"
    />
    </>
  )
}
