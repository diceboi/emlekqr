import MainHero from "../components/UI/MainHero"
import GyikInner from "../components/GyikInner"

export default function GyikPage() {
  return (
    <>
    <MainHero title={"Gyakran ismételt kérdések"} image={"/gyik.webp"}/>
    <GyikInner />
    </>
  )
}
