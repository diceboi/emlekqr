import Paragraph from "../components/UI/Paragraph";
import {
  TbInfoCircleFilled,
  TbHammer,
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";
import { CgDanger } from "react-icons/cg";
import H1 from "./UI/H1";
import H2 from "./UI/H2";
import H3 from "./UI/H3";
import Link from "next/link";
import OsszehasonlitasInner from "./OsszehasonlitasInner";
import Image from "next/image";
import InfoBlock from "../components/UI/InfoBlock";

export default function HasznalataInner() {
  return (
    <>
      <InfoBlock
        bgcolor={"bg-[--blue-15]"}
        bordercolor={"border-[--blue]"}
        infocolor={"text-[--blue]"}
      >
        <Paragraph>
          Az EmlékQR emlékoldal egy modern, személyre szabható megoldás, amely
          lehetővé teszi, hogy szeretteink emlékét örökre megőrizzük és bárki
          számára elérhetővé tegyük. Az emlékoldalhoz QR kódos emlékérme is
          rendelhető, amely könnyen elhelyezhető a sírkő, sír, vagy bármilyen
          más helyen ahol szeretnénk.{" "}
          <b>
            <b>
              Sőt Emlékérme vásárlásával feloldod az{" "}
              <Link href="/erme" className="underline text-[--blue]">
                EmlékQR+
              </Link>{" "}
              szolgáltatást, ami minden korlátozást felold az emlékoldaladon.
            </b>
          </b>{" "}
          Az emlékoldal használata rendkívül egyszerű, és pár lépésben teljesen
          személyre szabható a tartalma.
        </Paragraph>
      </InfoBlock>

      <div className="relative flex flex-col gap-4 w-full bg-[--cream] p-8 rounded-3xl my-16">
        <H3 classname={"text-[--rose]"}>Miért válaszd az EmlékQR érmét?</H3>
        <Paragraph>
          Az emlékérme segítségével méltó módon emlékezhetsz meg szeretteidről.
          Legyen szó mindenszentek napjáról, egy különleges alkalomról, vagy
          mindennapi emlékezésről, az érme biztosítja, hogy az elhunytak emléke
          tovább éljen.
        </Paragraph>
      </div>

      <div className="flex flex-col gap-8 py-16">
        <H2 classname={"pt-16 text-[--rose] lg:text-left text-center"}>
          Összehasonlítás
        </H2>
        <OsszehasonlitasInner />
      </div>

      <H2 classname={"pt-16 text-[--rose] lg:text-left text-center"}>
        Emlékérme rendelés lépései
      </H2>
      <div className="flex flex-col py-16">
        <div className="flex flex-col border-l-2 border-dashed border-[--rose-15] lg:ml-7 ml-4 lg:pl-9 pl-4 lg:gap-16 gap-8 py-8">
          <div className="relative flex flex-col gap-4 w-full bg-[--cream] p-8 rounded-3xl">
            <TbCircleNumber1Filled className="absolute text-[--blue] w-10 h-10 top-7 lg:-left-14 -left-10 bg-neutral-50 rounded-full" />
            <H3 classname={"text-[--rose]"}>Regisztráció</H3>
            <Paragraph>
              Első lépésként hozz létre egy fiókot az oldalon. A jobb felső
              sarokban található kis fej ikonra kattintás után, a{" "}
              <Link href="/regisztracio" className="underline text-[--blue]">
                &quot;Bejelentkezés/Regisztráció&quot;
              </Link>{" "}
              gombra kattintva tudsz eljutni a regisztrációig.
            </Paragraph>
          </div>

          <div className="relative flex flex-col gap-4 w-full bg-[--cream] p-8 rounded-3xl">
            <TbCircleNumber2Filled className="absolute text-[--blue] w-10 h-10 top-7 lg:-left-14 -left-10 bg-neutral-50 rounded-full" />
            <H3 classname={"text-[--rose]"}>Rendelés</H3>
            <Paragraph>
              Regisztráció után a jobb felső sarokban található{" "}
              <Link href="/erme" className="underline text-[--blue]">
                &quot;Érme rendelés&quot;
              </Link>{" "}
              gombra kattintva tudsz eljutni a rendelési felületre. Válaszd ki
              az érmét, majd a fizetés típusát, és a &quot;Tovább a
              pénztárba&quot; gombra kattintva juthatsz el a fizetési felületig,
              ahol a kért információk megadása után meg is rendelheted a
              kiválasztott érmédet.
            </Paragraph>
          </div>

          <div className="relative flex flex-col gap-4 w-full bg-[--cream] p-8 rounded-3xl">
            <TbCircleNumber3Filled className="absolute text-[--blue] w-10 h-10 top-7 lg:-left-14 -left-10 bg-neutral-50 rounded-full" />
            <H3 classname={"text-[--rose]"}>Érme aktiválás</H3>
            <Paragraph>
              Ha megérkezett az érméd, telefonod kamerájával, vagy egy QR kód
              olvasó appal szkenneld be. A QR kód eljuttat a te emlékoldaladra,
              ahol az oldal kérni fog egy megerősítő kódot. Ezt a kódot a
              rendelés folyamán elküldtünk neked e-mailben. Írd be a kódot
              kattints az ellenőrzés gombra, és a sikeres ellenőrzés után már
              szerkesztheted is az oldalt.<br></br>
              <br></br> Amennyiben volt már ingyenes emlékoldalad, azt össze is
              kötheted rögtön a megvásárolt emlékérméddel. Az ellenőrző kód után
              egy felugró ablak fogad majd, ahol kiválaszthatod melyik ingyenes
              emlékoldaladdal szeretnéd az érmét összekötni.<br></br>
              <br></br> Itt megoszthatod szeretteid életrajzát, történeteit,
              valamint képeket is feltölthetsz, sőt, meg is oszthatod ha
              szeretnéd. Az oldalra látogatók kommentelhetik is a tartalmat, így
              tovább bővíthetik az emlékek láncolatát.
            </Paragraph>
          </div>
          <div className="flex flex-col gap-4 p-8 bg-[--blue-15] rounded-3xl">
            <Paragraph classname={"text-center font-semibold"}>
              Készíts emlékoldalt ingyen, és kösd össze később egy emlékérmével.
              Vagy akár próbáld ki regisztráció nélkül is!
            </Paragraph>
            <Link
              href="/ingyenes-emlekoldal-keszites"
              className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 mt-4 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white font-semibold w-fit self-center"
            >
              Emlékoldal készítés
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:py-16 py-8 lg:text-left text-center">
        <H2 classname={"text-[--rose] lg:text-left text-center"}>
          Az érme és használata
        </H2>
        <div className="flex flex-col py-16">
          <div className="flex flex-col lg:gap-16 gap-8 py-8">
            <div className="relative flex flex-col gap-4 w-full bg-[--cream] p-8 rounded-3xl">
              <H3 classname={"text-[--rose]"}>
                Az érme elhelyezése és tartóssága
              </H3>
              <Paragraph>
                Az érme időjárásálló szálcsiszolt fém hatású felülettel
                rendelkező dekor műgyantából készül lézergravírozás
                segítségével, így hosszú távon is megőrzi minőségét, akár
                szélsőséges időjárási körülmények között is. Felragasztható
                beton sírkőre, márvány sírkőre, gránit sírkőre, vagy mészkő
                sírkőre. Természetesen az érmét egyéb helyre is ragaszthatod,
                melynek a felülete erre megfelelő.
              </Paragraph>

              <Paragraph>
                A QR-kódos érme ezután az érintésmentes technológiának
                köszönhetően bárki számára elérhetővé válik a szeretteidről
                szóló tartalom. Mindössze egy okostelefon szükséges ahhoz, hogy
                a QR-kódot beolvasva megnyíljon az emlékoldal, ahol a látogatók
                elmerülhetnek a megosztott emlékekben.
              </Paragraph>
            </div>

            <div className="relative lex flex-col gap-4 bg-red-200 border border-[--error] p-8 rounded-3xl">
              <CgDanger className="absolute -top-5 left-8 text-[--error] min-w-10 min-h-10 bg-neutral-50 rounded-full" />
              <Paragraph>
                Az érme elhelyezése előtt a felületet tisztítsuk meg a portól
                lehetőleg nedves törlőkendővel, és várjuk meg amíg megszárad. A
                tiszta felületen képes a kétoldalú ragasztó a legerősebb lenni.
              </Paragraph>
            </div>

            <Link
              href="/erme"
              className="flex flex-nowrap items-center justify-center gap-4 py-1 px-4 lg:py-2 lg:px-4 mt-4 rounded-full bg-gradient-to-br hover:bg-gradient-to-r from-[--rose] to-[--blue] hover:bg-opacity-75 font-semibold transition-all text-white h-fit self-center"
            >
              <Image
                src="/emlekqr-plus-white.svg"
                alt="EmlékQR Plusz"
                title="Válts EmlékQR Plusz-ra"
                width={50}
                height={50}
                className="w-6 h-auto"
              />
              Érme rendelés
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
