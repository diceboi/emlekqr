import MainHero from "../components/UI/MainHero"
import HasznalataInner from "../components/HasznalataInner"

export default function HasznalataPage() {
  return (
    <>
    <MainHero title={"Az érme használata"}/>
    <section className="w-full py-16 px-4">
      <div className="container m-auto">
        <HasznalataInner />
      </div>
    </section>
    </>
  )
}
