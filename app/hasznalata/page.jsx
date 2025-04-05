import MainHero from "../components/UI/MainHero"
import HasznalataInner from "../components/HasznalataInner"

export const metadata = {
  title: 'Az emlékérme használata – Sírkőre rögzíthető QR-kódos megemlékezés - EmlékQR',
  description: 'Sírkőre rögzíthető QR-kódos érme, amelyen keresztül megoszthatod szeretteid emlékét. Egyszerű használat, időtálló, egyedi megemlékezés.'
}

export default function HasznalataPage() {
  return (
    <>
    <MainHero title={"Hogyan működik?"} image={"/marvany-erme.webp"}/>
    <section className="w-full py-16 px-4">
      <div className="container m-auto">
        <HasznalataInner />
      </div>
    </section>
    </>
  )
}
