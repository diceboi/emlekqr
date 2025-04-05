import H2 from "./UI/H2";
import OsszehasonlitasInner from "./OsszehasonlitasInner";


export default function Osszehasonlitas() {
  return (
    <section className="relative w-full py-20 bg-white">
      <div className="flex flex-col lg:gap-20 gap-20 container m-auto px-4">
        <H2 classname={"text-[--rose] text-center"}>Összehasonlítás</H2>
        <OsszehasonlitasInner />
      </div>
    </section>
  );
}
