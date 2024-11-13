import KapcsolatInner from "../components/KapcsolatInner"
import MainHero from "../components/UI/MainHero"

export const metadata = {
  title: 'Kapcsolat - EmlékQR',
}

export default function KapcsolatPage() {
  return (
    <> 
        <MainHero title={"Kapcsolat"} image={"/kapcsolat.webp"}/>
        <KapcsolatInner />
    </>
  )
}
