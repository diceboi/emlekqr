import H2 from "./UI/H2";
import VideosVelemenyekInner from "./VideosVelemenyekInner";

export default function VideosVelemenyek() {
  return (
    <section className="flex flex-col lg:gap-16 gap-8 justify-center container m-auto w-full lg:pt-20 pt-8">
      <H2 classname={"text-center self-center text-[--rose] lg:w-1/2 w-full"}>
        Ők már elégedett emlékoldal tulajdonosok
      </H2>
      <VideosVelemenyekInner />
    </section>
  );
}
