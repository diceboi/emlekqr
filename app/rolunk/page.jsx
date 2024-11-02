import MainHero from "../components/UI/MainHero"
import RolunkInner from "../components/RolunkInner"

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
