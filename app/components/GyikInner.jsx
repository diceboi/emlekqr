"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TbPlus } from "react-icons/tb";
import { TbMinus } from "react-icons/tb";
import H3 from '../components/UI/H3'
import H4 from './UI/H4';
import Paragraph from '../components/UI/Paragraph'
import Link from 'next/link';

export default function GyikInner() {

    const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  const faqs = [
    {
      question: 'Mi az a QR kód?',
      answer: (
        <>
          <Paragraph>A QR kód egy kétdimenziós vonalkód, amely gyorsan tárol és megoszt információkat. Az EmlékQR emlékérme esetében a QR kód egyedi emlékoldal elérésére szolgál, ahol a látogatók megtalálhatják az elhunyt szeretteikről szóló történeteket, képeket és életrajzokat. A QR kódot egyszerűen be lehet olvasni okostelefonokkal, így könnyen hozzáférhetővé válik az emlék a sír, sírkő vagy síremlék közelében.</Paragraph>
        </>
      ),
    },
    {
      question: 'Mi szükséges ahhoz, hogy a QR kódot be tudjam olvasni?',
      answer: (
        <>
          <Paragraph>A QR kód beolvasásához csupán egy okostelefonra van szükséged, amely rendelkezik kamerával és QR-kód olvasó alkalmazással. A legtöbb modern okostelefon már beépített QR-kód olvasó funkcióval rendelkezik a kamerájában. Egyszerűen nyisd meg a kamerát, irányítsd a QR kódra, és a telefon automatikusan felajánlja a lehetőséget az emlékoldal megnyitására. Ezzel az egyszerű folyamattal könnyedén hozzáférhetsz a sír, sírkő vagy síremlék közelében található emlékekhez és információkhoz.</Paragraph>
        </>
      ),
    },
    {
      question: 'Van-e más módja annak, hogy az emlékiratot elérhessem, megtekinthessem?',
      answer: (
        <>
          <Paragraph>Igen, természetesen, van lehetőség az elhunyt nevének és anyja nevének megadásával is rákeresni az emlékiratra.</Paragraph>
        </>
      ),
    },
    {
      question: 'Mik a QR kód tulajdonságai?',
      answer: (
        <>
          <Paragraph>Időtálló, kb 5 x 5 cm nagyságú, tartós szálcsiszolt aluminium felületű, gravírozott, erős nagy szilárdságú ragasztóval a hátoldalán, melynek felhelyezése nagyon gyors és egyszerű művelet. Fontos, hogy felhelyezés előtt a területet tisztítsuk le alaposan, hagyjuk megszáradni, és a védőréteg eltávolítása után helyezzük a kívánt helyre azt.</Paragraph>
        </>
      ),
    },
    {
      question: 'Mi a különbség a coaching és a terápia között?',
      answer: (
        <>
          <Paragraph>A coaching nem terápia, azaz nem foglalkozik a múlttal és a dolgok miértjeinek elemzésével. Jellemzően jövő- és célorientált, azaz a jelenből előretekintve fogalmaz meg célokat, fejlődési lehetőségeket és segíti ezek megvalósulását.</Paragraph>
        </>
      ),
    },
    {
      question: 'Milyen felületre ragasztható?',
      answer: (
        <>
          <Paragraph>Az emlékérme elhelyezhető beton, márvány sírkő, gránit sírkő, mészkő sírkő felületén, minden esetben fontos a felület alapos megtisztítása.</Paragraph>
        </>
      ),
    },
    {
      question: 'Van-e garancia az érmére?',
      answer: (
        <>
          <Paragraph>Ha valami oknál fogva az érvme megsérül vagy elveszik, díjtalanul kicseréljük.</Paragraph>
        </>
      ),
    },
    {
      question: 'Mennyi képet, videót, linket tölthető fel?',
      answer: (
        <>
          <Paragraph>A létrehozott személyes profilba bármennyi kép, videó és link feltölthető.</Paragraph>
        </>
      ),
    },
    {
      question: 'Az emlékirat tulajdonosának mik a jogai?',
      answer: (
        <>
          <Paragraph>A fióktulajdonos teljes körű adatvédelmi felügyelettel rendelkezik minden megosztott tartalomra vonatkozóan. Az emlékadatlaphoz való hozzászólás, vagy az emlékirat bárki általi módosítása is csak az ő jóváhagyásával valósítható meg.</Paragraph>
        </>
      ),
    },
    {
      question: 'Van-e költsége, karbantartási díja az emlékoldalnak?',
      answer: (
        <>
          <Paragraph>Nincsenek technikai vagy karbantartási díjaink. Az egyetlen díj a vásárláskor kiválasztott havi vagy éves előfizetés.</Paragraph>
        </>
      ),
    },
    {
      question: 'Vásárolható-e ajándékba?',
      answer: (
        <>
          <Paragraph>Igen, megvásárolható ajándékként barátoknak vagy családtagoknak, fizetés során adja meg szállítási címként ismerőse vagy családtagja címét.</Paragraph>
        </>
      ),
    },
    {
      question: 'Aktiválnom kell a QR kódot?',
      answer: (
        <>
          <Paragraph>A QR kód megrendelése után email-ben elküldünk egy egyszeri 6 számjegyű azonosító kódot az email címedre. Mikor megérkezik a fizikai QR kód, azt be kell szkennelni, ami elvisz az emlékoldaladra. Itt a felugró ellenőrző ablakba kell beírni a kódot, és már szerkeszthetővé is válik az oldal.</Paragraph>
        </>
      ),
    },
    {
      question: 'Hány profilt csatlakoztathatok egy QR kódhoz?',
      answer: (
        <>
          <Paragraph>Jelenleg egy QR kód egy emlékoldalt tud kezelni, de igény esetén lesz családi QR érme, amely alatt megtalálhatóak és összeköthetőek lesznek majd az egy sírban fekvő szeretteink leiratai külön-külön QR kódonként.</Paragraph>
        </>
      ),
    },
    {
      question: 'Mennyi a szállítási idő?',
      answer: (
        <>
          <Paragraph>Jelenleg a Magyar Postával szállítunk. A kézbesítés ideje becsléseink szerint a vásárlástól számított maximum 3-5 munkanap de legkésőbb 15 munkanapon belül meg kell érkezzen a csomag. Ha nem így történne, kérlek vedd fel velünk a kapcsolatot.</Paragraph>
        </>
      ),
    },
    {
      question: 'Az emlékoldal elkészítése mennyire bonyolult?',
      answer: (
        <>
          <Paragraph>Az emlékoldal elkészítése nagyon egyszerű, pár lépésből áll és a felület a lehető legátláthatóbb, könnyen kezelhető módon lett létrehozva. Ha véletlenül bármiben elakadnál, vedd fel velünk a kapcsolatot és segítünk!
          </Paragraph>
        </>
      ),
    },
    {
      question: 'Kihez fordulhatok kérdés esetén?',
      answer: (
        <>
          <Paragraph>Kérdés esetén a kapcsolat menüpontban, vagy az info@emlek-qr.hu email címen írhatsz nekünk, melyet 24 órán belül megválaszolunk.</Paragraph>
        </>
      ),
    },
    {
      question: 'Védi-e valami a halotti emléket?',
      answer: (
        <>
          <Paragraph>Igen, a Magyar Törvények védik az elhunyt személyek emlékét, amiről bővebben az<Link href={"/elhunyt-jogainkak-vedelme"} className='text-[--blue] underline'>Elhunyt jogainak védelme</Link> oldalon olvashatatsz.</Paragraph>
        </>
      ),
    },
  ];


  return (
    <>
      <section className="lg:py-16 py-8 px-4">
        <div className='container m-auto flex flex-col gap-8 overflow-hidden '>
          {faqs.map((faq, index) => (
            <div key={index} className='relative flex flex-col gap-4 bg-[--cream] rounded-3xl'>
              <div className='flex flex-nowrap justify-between bg-[--cream] rounded-3xl px-4 py-2 z-10 cursor-pointer' onClick={() => toggleFAQ(index)}>
                <H4 classname='pt-3 w-8/12'>{faq.question}</H4>
                {openFAQ === index ? (
                  <TbMinus className='min-w-6 min-h-6 text-[--blue] mt-4'/>
                ):(
                  <TbPlus className='min-w-6 min-h-6 text-[--blue] mt-4'/>
                )}
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openFAQ === index ? 'auto' : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='flex flex-col gap-4 p-4 border-t'>
                  {faq.answer}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
