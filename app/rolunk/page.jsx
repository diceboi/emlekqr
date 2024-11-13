import MainHero from "../components/UI/MainHero"
import RolunkInner from "../components/RolunkInner"

export const metadata = {
  title: 'Rólunk - QR-kódos technológia az emlékek megőrzésére - EmlékQR',
  description: 'Ismerd meg az EmlékQR modern megoldását, amely QR-kóddal teszi elérhetővé szeretteid emlékeit. Egyedi emlékoldal fotókkal, történetekkel, időtálló QR-kódos megoldással.'
}

export default function RolunkPage() {
  return (
    <>
    <MainHero title={"Rólunk"} image={"/painting.webp"}/>
    <section className="w-full">
      <div className="w-full m-auto">
        <RolunkInner />
      </div>
    </section>
    </>
  )
}
