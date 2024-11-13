import MainHero from "../components/UI/MainHero"
import GyikInner from "../components/GyikInner"

export const metadata = {
  title: 'GYIK - Emlékoldal készítés és emlékérme rögzítése síremlékre',
  description: 'Találd meg a választ a qr-kódos emlékérme használatával kapcsolatos leggyakoribb kérdésekre! Tudj meg többet arról, hogyan helyezheted el az érmet a síremléken, és hogyan kezelheted az emlékoldalt.'
}

export default function GyikPage() {
  return (
    <>
    <MainHero title={"Gyakran ismételt kérdések"} image={"/gyik.webp"}/>
    <GyikInner />
    </>
  )
}
