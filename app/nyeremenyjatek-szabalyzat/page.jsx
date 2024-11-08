import H1 from "../components/UI/H1";
import H4 from "../components/UI/H4";
import Paragraph from "../components/UI/Paragraph";
import Label from "../components/UI/Label";
import Link from "next/link";

export default function NyeremenyjatekSzabalyzatPage() {
  return (
    <section className="w-full lg:py-16 py-8 px-4">
      <div className="container m-auto">
        <div className="flex flex-col gap-4">
          <H1 classname={"text-[--rose] pb-16"}>Nyereményjáték szabályzat</H1>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            A játék szervezője
          </H4>
          <Paragraph>
           Az EmlékQR (továbbiakban „Szervező”) “Nyerj digitális képkeretet!” címmel nyereményjátékot (továbbiakban „Játék”, vagy „Nyereményjáték”) szervez.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
           A játék leírása
          </H4>
          <Paragraph>
            A Játék során a Szervező nyereményjátékot hirdet meg Facebook oldalán, melyben arra kéri a játszani szándékozókat, hogy a játékot meghirdető, a Szervező saját Facebook oldalát (https://www.facebook.com/emlekqr) kedveljék, a bejegyzést (Nyereményjátékot) osszák meg Facebookon, illetve a poszt alá (Facebookon) kommentben válaszoljanak arra, hogy kivel raknának ki közös képeket otthon a digitális képkereten. A Szervező a nyertest a válaszadók között, véletlenszerűen, sorsolás útján választja ki. A játék kizárólag az EmlékQR Facebook oldalán érvényes.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            A játékban történő részvétel feltételei
          </H4> 
          <Paragraph>
            A Játékban kizárólag 18. életévét betöltött, magyarországi lakó- vagy tartózkodási hellyel rendelkező személy vehet részt, aki a 2-es pontban megfogalmazott követelményeket teljesíti. Nem minősül érvényes kommentnek egy másik felhasználó kommentjére adott válasz üzenetben feltöltött komment.
            A Játékosok által feltöltött kommenteket a Játékszabályzat feltételeinek teljesítése és az általános jó ízlésnek való megfelelés szempontjából a Szervező megvizsgálhatja, és amennyiben azok, illetve az azt leadó Játékos bármely okból nem felel meg a Játékszabályzat feltételeinek, úgy az érintett Játékost a Játékból kizárhatja, a jelentkezését törölheti. A Szervező kizárja a Játékból azt a kommentet, a) amely obszcén, erotikus, közszemérmet vagy más vallását, származását, nem identitását sértő képi vagy szöveges elemet, netán tiltott önkényuralmi jelképet tartalmaz vagy más büntető törvénykönyvbe ütköző tartalmat hordoz, vagy bárki számára sértő, megalázó, vagy zaklató tartalmú; b) a Szervezőre, annak Szolgáltatásaira vagy a Szervező oldalát követő személyekre nézve sértő jellegű; c) konkurenciát jelenít meg bármely formában.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            A játék időtartama
          </H4> 
          <Paragraph>
            A Játék időtartama: 2024. 11. 09.-tól 2024. 11.30.-ig tart.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            Játék menete
          </H4>
          <Paragraph>
            Egy Játékos a Játék időtartama alatt leadott egy érvényes és tartalmilag helyes kommenttel vehet részt a sorsoláson. A nyertes komment kiválasztása véletlenszerű sorsolás útján történik. A sorsoláson minden Játékos egy hozzászólással vesz részt. A kiválasztás jellegét a Játékos elfogadja. A döntés ellen panasszal nem élhet.
            A sorsolás időpontja: 2024. 12. 01. 13:00 óra. A Szervező egy elsődleges nyertest sorsol ki. Az elsődleges nyertest a Szervező a sorsolást követő 48 órán belül, privát facebook üzenetben értesíti és egyezteti a nyeremény átvételének részleteit. Amennyiben a nyertes az üzenetre 5 naptári napon belül nem reagál, úgy a Szervező tartalék nyertest sorsol ki. A Szervező a nyertes, illetve tartaléknyertes teljes nevét jogosult az általa üzemeltetett Facebook oldalon is nyilvánosságra hozni.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            Nyeremény
          </H4>
          <Paragraph>
            A Nyeremény készpénzre nem váltható át, tovább nem értékesíthető. A nyertes Játékos minden esetben köteles a Szervezővel együttműködni annak érdekében, hogy az adott nyeremény átadására megfelelően sor kerüljön. Ha ezen együttműködési kötelezettségének a nyertes nem tesz eleget, és így a Nyeremény átadása meghiúsul, úgy ezen körülmény a Szervező terhére nem értékelhető. Nem jogosult a nyeremény átvételére az a Játékos, aki a jelen Játékszabályzat szerinti adatvédelmi hozzájárulását a 7. pont alkalmazásával a nyereményre való jogosultság megállapítását megelőzően visszavonja, illetve kéri személyes adatainak törlését.
          </Paragraph> 
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            Adózás
          </H4>
          <Paragraph>
            A Nyereményhez tartozó esetleges adófizetési kötelezettséget a Szervező viseli. Szervezőt a Nyeremény fentiek szerinti átadásán és adóvonzatuk kiegyenlítésén kívül további kötelezettség nem terheli.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            Adatvédelem
          </H4>
          <Paragraph>
            A Szervező által a jelen szabályzattal meghirdetett nyereményjátékban való részvétel és személyes adatok szolgáltatása önkéntes. Az adatkezelés jogalapja a Játékos hozzájárulása. Az adatkezelés célja kizárólag a nyereményjátékban való részvétel, a Játékosokkal való kapcsolattartás. A Szervező szavatolja, hogy az adatkezelés mindenben a hatályos jogszabályi rendelkezések megtartásával történik. A Szervező bármikor lehetőséget biztosít a Játékosnak arra, hogy tájékoztatást kérjen személyes adatai kezeléséről, kérje azok törlését vagy helyesbítését. Ezen kívül a Játékost megilleti a személyes adatai kezelése elleni tiltakozás vagy korlátozás joga is. Amennyiben a tiltakozása alapján Szervező által meghozott döntéssel nem ért egyet, úgy a Játékos bírósághoz fordulhat. Az adatok kezelését és feldolgozását a Szervező végzi. A Szervező az adatokat harmadik személyek részére nem továbbítja.
          </Paragraph>  
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            Játékból kizárás esetei, felelősség
          </H4>
          <Paragraph>
            A Játékból ki vannak zárva a Szervező közeli hozzátartozói. A jelentkezések hiányosságáért/hibájáért, a Nyeremény nyertességének értesítéséről a nyertes Játékosnál felmerült okból történő elmaradásáért vagy késedelméért a Szervező semmilyen felelősséget nem vállal. A jelen Játékszabályzatra a magyar jog az irányadó. A Szervező jogosult jelen Játékszabályzat alkalmazására, értelmezésére, módosítására, illetve a jelen Játékszabályzat végrehajtásával kapcsolatos vagy a Játékszabályzatban nem szabályozott valamennyi kérdés elbírálásra. Felhívom a Résztvevők figyelmét, hogy a Játék alapvetően nem áll kapcsolatban a Facebookkal, azt a Facebook semmilyen módon nem szponzorálja, támogatja vagy szervezi, nem kezeli, így a Facebookot a Nyereményjátékból eredően, vagy azzal kapcsolatban felelősség semmilyen tekintetben nem terheli (ide nem értve a közzétett és kezelt adatok adatkezelésére vonatkozó szabályoka, pl.: tárolás időtartama), panaszkezelésre nem köteles és nem is jogosult. A Nyereményjáték tartalmáért kizárólag a Szervező felelős. A Játékban való részvétel kizárólag a jelen szabályzatban foglalt feltételekkel lehetséges. A Nyereményjátékban való részvétellel a Résztvevő kifejezetten elfogadja a jelen részvételi feltételeket. Szervező fenntartja a jogot, hogy a Játékszabályzatot indokolt esetben bármikor megváltoztathassa.
          </Paragraph> 
          <Paragraph>
            Kaposvár, 2024. 11.09.
          </Paragraph> 
          <Paragraph>
            EmlékQR
          </Paragraph>
          <Paragraph>
            Szervező
          </Paragraph>
          </div>
        </div>
    </section>
  )
}
