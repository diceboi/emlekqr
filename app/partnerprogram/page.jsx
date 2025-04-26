import PartnerRegisterEmailForm from "../components/PartnerRegisterEmailForm";
import H1 from "../components/UI/H1";
import H2 from "../components/UI/H2";
import H3 from "../components/UI/H3";
import H4 from "../components/UI/H4";
import { TbUserHeart, TbGiftCard, TbDatabaseDollar, TbLogin2 } from "react-icons/tb";
import Paragraph from "../components/UI/Paragraph";
import Image from "next/image";

export const metadata = {
  title: "Partner Program - EmlékQR",
};

export default async function PartnerProgramPage() {

  return (
    <>
      <section className="lg:pb-20 pb-8 pt-4 px-4">
        <div className="flex flex-col items-center justify-center lg:gap-16 gap-8 bg-[--cream] m-auto rounded-3xl min-h-[50vh] py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <TbUserHeart className="lg:w-24 w-16 h-auto text-[--blue] p-4 bg-white rounded-3xl shadow-xl" />
          </div>
          <H1 classname={"text-[--rose] text-center"}>Partner program</H1>
        </div>
      </section> 
      <section className="flex flex-col gap-16 lg:py-8 px-4">
        <div className="container m-auto flex lg:flex-row flex-col items-center justify-center lg:gap-16 gap-8 w-full">
          <div className="flex flex-col justify-center gap-8 lg:w-1/2 w-full">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/M581tTtJd_Y?si=x55K2abFKE7roJF-"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              className="hidden lg:block rounded-3xl"
            ></iframe>
            <iframe
              width="100%"
              height="300px"
              src="https://www.youtube.com/embed/M581tTtJd_Y?si=x55K2abFKE7roJF-"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              className="lg:hidden block rounded-3xl"
            ></iframe>
          </div>
          <div className="flex flex-col justify-center gap-8 lg:w-1/2 w-full">
            <H2 classname={"text-[--rose]"}>Legyél a partnerünk</H2>
            <Paragraph classname={''}>
            Olyan partnereket keresünk, akik termékünket be tudják illeszteni
            üzleti profiljukba és segítenek eljuttatni ezt az innovatív
            megoldást azokhoz, akik számára fontos, hogy szeretteik története
            tovább éljen.
          </Paragraph>
          <H4 classname={"bg-[--blue-15] border rounded-3xl p-4"}>
            Minden partnerünk által eladott érme után azonnali jutalék íródik jóvá számára.
          </H4>
          </div>
        </div>
        
        <div className="container m-auto flex lg:flex-row flex-col items-center justify-center lg:gap-16 gap-8 w-full lg:py-16 py-8 border-y border-[--blue-50]">
          <div className="flex flex-col justify-center gap-8 lg:w-1/2 w-full">
            <H2 classname={"text-[--rose]"}>Milyen alkalomra javasolható?</H2>
          </div>
          <div className="relative lg:w-1/2 w-full">
            <ul className="list-disc marker:text-[--rose]">
              <li className="ml-6"><Paragraph>Anyák napja, születésnap, emléknap - bármilyen alkalom, amikor egy szerettünkről szeretnénk megemlékezni, tisztelegni, emléket állítani</Paragraph></li>
              <li className="ml-6"><Paragraph>Mindenszentek ünnepe</Paragraph></li>
              <li className="ml-6"><Paragraph>Kegyeleti megemlékezés</Paragraph></li>
              <li className="ml-6"><Paragraph>Ajándéktárgy</Paragraph></li>
            </ul>
          </div>
        </div>

        <div className="container m-auto flex flex-col items-center justify-center lg:gap-16 gap-8 w-full lg:py-16 py-0">
          <div className="flex flex-col justify-center gap-8 w-full">
            <H2 classname={"text-[--rose] lg:text-center"}>Miért lehet ez érdekes számodra?</H2>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 w-full">
            <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-3xl p-4">
              <TbGiftCard className="w-10 h-10 text-[--blue]" />
              <H4>Értékteremtő ajánlat</H4>
              <Paragraph classname={"text-center"}>Segíthetsz másoknak megőrizni szeretteik emlékét időtálló, különleges módon.</Paragraph>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-3xl p-4">
              <TbDatabaseDollar className="w-10 h-10 text-[--blue]" />
              <H4>Passzív bevételi lehetőség</H4>
              <Paragraph classname={"text-center"}>Minden általad ajánlott vásárlás után részesülsz az eladásból.</Paragraph>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-3xl p-4">
              <TbLogin2 className="w-10 h-10 text-[--blue]" />
              <H4>Egyszerű csatlakozás</H4>
              <Paragraph classname={"text-center"}>Nincs bonyolult adminisztráció, csak egy lehetőség, ami mindenkinek előnyös.</Paragraph>
            </div>
          </div>
        </div>

        <div className="container m-auto flex flex-col items-center justify-center lg:gap-16 gap-8 w-full lg:py-16 py-8 px-4 bg-[--blue] rounded-3xl mb-20">
          <div className="flex flex-col justify-center gap-8 w-full">
            <H2 classname={"text-white text-center"}>Jelentkezz partnernek!</H2>
          </div>
          <div className="flex flex-col gap-8 lg:w-1/2 w-full">
            <PartnerRegisterEmailForm />
          </div>
        </div>
        
      </section>
    </>
  );
}
