import Image from "next/image"

export default function Loading() {
  return (
    <section className="flex flex-col gap-4 items-center justify-center w-full h-[90vh] m-auto">
            <Image src="/emlekqr-loading.gif" width={100} height={100}/>
            <p className="text-[--rose] font-bold">Betöltés</p>
    </section>
  )
}
