import H1 from "../components/UI/H1";
import H4 from "../components/UI/H4";
import Paragraph from "../components/UI/Paragraph";
import Label from "../components/UI/Label";
import Link from "next/link";

export default function VasarlasiFeltetelekPage() {
  return (
    <section className="w-full lg:py-16 py-8 px-4">
      <div className="container m-auto">
        <div className="flex flex-col gap-4">
          <H1 classname={"text-[--rose] pb-16"}>Vásárlási feltételek</H1>
          <Paragraph>
            Üdvözöljük honlapunkon! Köszönjük, hogy vásárlása során bennünket
            tisztel meg bizalmával! A www.emlek-qr.hu honlapot a Bokros
            Gabriella Zsuzsanna egyéni vállalkozó üzemelteti (továbbiakban
            Eladó/szolgáltató).
          </Paragraph>
          <Paragraph>
            Tájékoztatjuk, hogy amennyiben Ön a honlapon keresztül megrendeli
            tőlünk az &quot;emlékoldalt&quot;, úgy a közöttünk létrejövő szerződés
            tartalmát - a vonatkozó kötelező érvényű jogszabályok rendelkezései
            mellett - a jelen{" "}
            <Link
              href="/altalanos-szerzodesi-feltetelek"
              className="text-[--blue] underline"
            >
              Általános Szerződési Feltételek
            </Link>{" "}
            (a továbbiakban: ÁSZF) határozzák meg.
          </Paragraph>
          <Paragraph>
            Ennek megfelelően tartalmazza a jelen ÁSZF az Önt és az Üzemeltetőt
            illető jogokat és kötelezettségeket, a szerződés létrejöttének
            feltételeit, a teljesítési határidőket, a szállítási és fizetési
            feltételeket, a felelősségi szabályokat, valamint az elállási jog
            gyakorlásának feltételeit. Kérjük, hogy megrendelése véglegesítése
            előtt figyelmesen olvassa el a jelen dokumentumot, mert megrendelése
            véglegesítésével Ön elfogadja a jelen ÁSZF tartalmát!
          </Paragraph>
          <Paragraph>
            Ha a jelen Általános Szerződési Feltételekkel, a honlap
            használatával, az emlékoldal vásárlás menetével kapcsolatban kérdése
            merült fel, vagy amennyiben egyedi igényét szeretné velünk
            megbeszélni, úgy kérjük, vegye fel velünk a kapcsolatot a{" "}
            <Link href="/kapcsolat" className="text-[--blue] underline">
              megadott elérhetőségeken
            </Link>
            !
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            Megvásárolható termékek, szolgáltatások köre
          </H4>
          <Paragraph>Emlékoldal személyenként külön-külön</Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Rendelési információk</H4>
          <Paragraph>
            A megjelenített termékek kizárólag a Webáruházon keresztül, online
            rendelhetőek meg, az emlékoldal online oldal, a qr-kód posta által
            történő kézbesítés/házhoz szállítással vagy személyesen a
            megrendelő, vagy meghatalmazottja általi átvétellel vehető át. A
            termékekre vonatkozóan megjelenített árak ÁFA mentesek, nem
            tartalmazzák a törvényben előírt 27%-os ÁFA-t.
          </Paragraph>
          <Paragraph>
            Amennyiben az üzemeltető hibás árat tüntet fel a termék mellett, a
            tőle elvárható gondosság ellenére, és a termék ára annak általánosan
            elfogadott árától eltér, úgy az üzemeltető nem köteles a terméket a
            hibás áron szolgáltatni, de köteles a megrendelés visszaigazolásában
            felajánlani a vásárló részére a valós áron történő vásárlás
            lehetőségét. Amennyiben a vásárló ezzel a lehetőséggel nem kíván
            élni, úgy megilleti a szerződéstől való egyoldalú elállás joga.
            Külön csomagolási/postázási költség nem kerül felszámításra.
          </Paragraph>
          <Paragraph>
            Webáruházunkban a regisztráció/ bejelentkéezés után a QR érme az
            emlékoldal megvásárlása során generált kód beírása után rendelődik
            hozzá a kívánt személy emlékoldalához. majd 10 napon belül az
            postázásra kerül. AZ oldalunkon megtekintheti a szolgáltatás. rövid
            leírását, árát, egyéb információkat . Amennyiben ennél részletesebb
            tájékoztatásra van szüksége, úgy az üzemeltetői adatok között
            rögzített e-mail címen szíveskedjen felvenni a kapcsolatot az
            üzemeltetővel.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Regisztráció</H4>
          <Paragraph>
            Amennyiben vásárolni szeretne, úgy az első vásárlás alkalmával meg
            kell adnia a vásárláshoz szükséges adatokat is, így a nevét,
            számlázási és szállítási adatait, e-mail címét, valamint a későbbi
            belépéshez szükséges jelszavát. A regisztráció véglegesítése előtt
            szükséges a regisztrációs feltételek elfogadása is. A regisztrációt
            e-mailben visszaigazolja a rendszer. A vevő köteles az általa
            megadott jelszót bizalmasan kezelni. Amennyiben az azonosítás során
            a vevő egyedi azonosítója és jelszava helyes megadását követően a
            vevő adatai arra jogosulatlan harmadik személy birtokába kerültek,
            az ebből eredő károkért, illetve hátrányokért az Adatkezelő
            felelősséget nem vállal. A felhasználók e-mail címük megadásával
            hozzájárulnak ahhoz, hogy az üzemeltető/ szolgáltató technikai
            jellegű üzenetet küldjön számukra. A regisztrált adatokat az
            üzemeltető kérelemre törli a rendszerből. A törlési kérelem
            biztonsági okokból csak akkor lesz érvényes, ha a törlési kérelmet a
            felhasználó e-mailben megerősíti, így elkerülhető, hogy valaki
            szándékosan vagy tévedésből mást töröljön a regisztrációs
            adatbázisból. A regisztrációt az e-mail cím azonosítja, tehát egy e-
            mail címet csak egyszer lehet regisztrálni. A regisztráció
            kötelezettségekkel nem jár.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>A termék kiválasztása</H4>
          <Paragraph>
            A vásárlónak lehetősége van választani, illetve rendelni az áruház
            termékei közül. A vásárló a kiválasztott termékre kattintva
            megtekintheti annak bővebb ismertetőjét. Vásárlási szándéka esetén a
            megvásárolni kívánt terméket a &quot;Kosárba&quot; gomb megnyomásával egy
            virtuális kosárba helyezi. A Kosár &quot;Megtekintés&quot; gombjára kattintva
            megtalálja a vásárlás során kosárba helyezett termékeket, valamint a
            számla végösszegét és a szállítási költséget. Itt leellenőrizhetik
            rendelésük helyességét, különös tekintettel az árakra és a
            mennyiségekre, melyeket igény szerint módosíthatnak, javíthatnak is.
            A kosár automatikusan kiszámítja a rendelés végösszegét.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>A rendelés elküldése</H4>
          <Paragraph>
            Ha megfelelőnek tartja a kosárban elhelyezett terméket,
            leellenőrizte a végösszeget, és úgy döntött, hogy meg szeretné
            vásárolni őket, akkor egyszerűen kattintson a &quot;Pénztár&quot; gombra.
            Áruházunkban lehetősége van regisztráció nélkül is a vásárlásra,
            ezért három lehetőség közöl választhat:
          </Paragraph>
          <Paragraph>
            <ul className="list-disc pl-8 marker:text-[--rose]">
              <li>már regisztrált vásárlóként szeretne-e belépni</li>
              <li>új vásárlóként akar regisztrálni</li>
              <li>esetleg regisztráció nélkül akar vásárolni</li>
            </ul>
          </Paragraph>
          <Paragraph>
            Ha korábban már vásárolt áruházunkban, úgy adja meg a korábbi
            regisztráció során megadott e-mail címét és jelszavát. Ha új
            vásárlóként szeretne regisztrálni, akkor adja meg a vásárláshoz
            szükséges adatait, amelyeket a rendszer eltárol, és a legközelebbi
            vásárlás alkalmával már csak be kell jelentkeznie. Regisztráció
            nélküli vásárlás esetén adja meg számlázási és szállítási címét.
          </Paragraph>
          <Paragraph>
            A következő lépésben válassza ki az Önnek megfelelő szállítási
            módot:
          </Paragraph>
          <Paragraph>
            <ul className="list-disc pl-8 marker:text-[--rose]">
              <li>Házhozszállítás postán keresztül</li>
            </ul>
          </Paragraph>
          <Paragraph>
            Ezt követően egy Önnek megfelelő fizetési módot kell választania:
          </Paragraph>
          <Paragraph>
            bankkártyás fizetés- (Stripe rendszerén keresztül. A Stripe
            elektronikus fizetéseket lebonyolító szolgáltatás, amivel
            kényelmesen és biztonságosan tudsz bankkártyával, fizetni online
            áruházakban, mobil alkalmazásokban.)
          </Paragraph>
          <Paragraph>
            Ha egyetért a megrendelés tartalmával, akkor a megrendelés
            elküldéséhez kattintson a &quot;Megrendelés&quot; gombra.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Árak</H4>
          <Paragraph>
            Áraink a rendelés időpontjában érvényes listaárak, amelyeket a
            webáruházban a termékek mellett találnak. Az árak bruttó árak, az
            ÁFÁ-t tartalmazzák, azonban ezek az árak nem tartalmazzák a
            szállítási költséget. A szállítási költség a pénztár folyamat során
            a megrendelés véglegesítése előtt, valamint a Vásárlási feltételek
            között is megtalálható. Amennyiben a webáruházban hiba vagy
            hiányosság lép fel a termékeknél vagy az áraknál, fenntartjuk a
            jogot a korrekcióra. Ilyen esetben a hiba felismerése, illetve
            módosítása után azonnal tájékoztatjuk a vevőt az új adatokról. A
            vevő ezt követően még egyszer megerősítheti a megrendelést, vagy
            lehetőség van arra, hogy bármely fél elálljon a szerződéstől.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>A rendelés feldolgozása</H4>
          <Paragraph>
            A rendelések feldolgozása 1 munkanapon belül megtörténik.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            Adatbeviteli hibák javításának lehetősége
          </H4>
          <Paragraph>
            Az adatbeviteli hibák javítására a &quot;Megrendelés&quot; gomb megnyomása
            előtt van lehetősége.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Visszaigazolás</H4>
          <Paragraph>
            Minden rendelésről e-mailes visszajelzést küldünk. Ez azt jelenti,
            hogy a rendelés feladását követően egy automatikus e-mailt kap a
            rendelés beérkezéséről és (később) egyet a várható szállítási
            időpontról. Telefonos egyeztetés esetén hívja az ügyfélszolgálatot
            vagy az e-mailben található telefonszámok bármelyikét.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Fizetési feltételek</H4>
          <Paragraph>
            Áruházunkban lehetőség van banki átutalásra, bankkártyás fizetésre,
            személyes és utánvéttel történő fizetésre. Utóbbi esetén a teljes
            vételárat szállítási költséggel együtt a küldemény átvételekor kell
            kifizetni készpénzben a küldemény kézbesítőjének.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Szállítás</H4>
          <Paragraph>
            A küldemények kézbesítése, szállítása psotán keresztül történik. A
            termék szállítási idejét a webáruház ismerteti a pénztár folyamat
            során, valamint a visszaigazoló e-mail is tartalmazza. A szállítás
            időpontjáról lehetősége van egyeztetni a visszaigazoló e-mailben
            található telefonszámon.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Szállítási díjak</H4>
          <Paragraph>
            Szállítási díjat nem számolunk fel. Magyarországon kívüli szállítást
            jelenleg nem vállalunk.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>A szállítástól elállás</H4>
          <Paragraph>
            Ha a webáruház a szerződésben vállalt kötelezettségét azért nem
            teljesíti, mert a szerződésben meghatározott áru nem áll
            rendelkezésére, illetve a megrendelt szolgáltatást nem áll módjában
            nyújtani, köteles erről a megrendelőt tájékoztatni. A webáruház nem
            köt szerződést kiskorúakkal. A megrendelő a kereskedelmi feltételek
            elfogadásával nyilatkozik arról, hogy nagykorú.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>A termék visszaküldése</H4>
          <Paragraph>
            A terméket csak eredeti állapotában és csomagolásában, hiánytalan
            mennyiségi, minőségi állapotában vesszük vissza.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            Szerződéskötés feltételeire vonatkozó tájékoztatás
          </H4>
          <Paragraph>
            A szerződéskötés nyelve magyar, a megkötött szerződés írásban
            megkötöttnek minősül/ nem minősül annak. A megkötött szerződést
            iktatják/nem iktatják, utólag hozzáférhető lesz/nem lesz
            hozzáférhető.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            Elállási jog/ Visszaszolgáltatási garancia
          </H4>
          <Paragraph>
            A megrendelő a szerződéstől 14 munkanapon belül indokolás nélkül
            elállhat. A megrendelő az elállás jogát attól a naptól kezdve
            gyakorolhatja, amikor az árut átvette. Az értékesítő köteles a
            megrendelő által kifizetett összeget haladéktalanul, de legkésőbb az
            elállást követő harminc napon belül visszatéríteni. A megrendelő
            viseli az elállási jog gyakorlása miatt az áru
            visszaszolgáltatásával kapcsolatban felmerülő költségeket. A
            megrendelőt ezenfelül egyéb költség nem terheli. Az értékesítő
            azonban követelheti az áru nem rendeltetésszerű használatából eredő
            kárának megtérítését. Ha az elállási jog alapján visszaszállított
            áru nincs kifogástalan, újra eladható állapotban, akkor a megrendelő
            kártérítésre kötelezett, amennyiben az áru állapotának romlását,
            tönkremenését, vagy visszaadásának másmilyen ellehetetlenülését
            szándékosan vagy hanyagságból idézte elő. Amennyiben a termékről
            felbontás során a kézbesítést végző személy (postai kézbesítő,
            futár) jelenlétében derül ki, hogy bizonyítottan sérült, és a
            sérülés az áru átvételét megelőzően keletkezett, a termék
            visszavételét, az értékesítés törlését azonnal biztosítjuk.
            Bármilyen nemű sérülést, tartalomhiányt a küldemény kézbesítése
            során az átadó-átvevő közötti tényállási jegyzőkönyvnek kell
            tartalmaznia! Utólagos tartalomhiányért, esetleg sérülésért
            felelősséget vállalni nem tudunk! Az elállási jog gyakorlására
            vonatkozó 17/1999. Kormányrendelet szövegét letöltheti a Nemzeti
            Fogyasztóvédelmi Hatóság honlapjáról.
          </Paragraph>
          <Paragraph>
            Eladó fenntartja magának a jogot, hogy az ajánlat elfogadását követő
            60 napon belül egyoldalúan elálljon a szerződéstől - az előleg
            egyidejű visszafizetése mellett - a Ptk. 6:213.§ (1) bek. alapján.
          </Paragraph>
          <Paragraph>Nem illeti meg a fogyasztót az elállási jog:</Paragraph>
          <Paragraph>
            <ul className="list-disc pl-8 marker:text-[--rose]">
              <li>
                olyan nem előre gyártott termék esetében, amelyet kifejezetten a
                fogyasztó kérésére, az ő által szabott igények alapján egyedi
                kérésének megfelelően került előállításra,
              </li>
              <li>
                olyan termék esetében, amelynél a fogyasztó kifejezett kérésének
                tesz eleget az üzemeltető sürgős javítási, vagy karbantartási
                munkáknál
              </li>
            </ul>
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            Megrendelés módosítása, törlése
          </H4>
          <Paragraph>
            A 2001. évi CVIII. törvény értelmében a megrendelés leadásakor a
            vásárló felé azonnal értesítést küld az eladó webáruház szoftvere a
            rendelés felvételének tényéről. Ez az értesítés nem minősül az eladó
            és a vásárló között létrejött szerződésnek! Csupán jelzi a
            vásárlónak, hogy rendelési igényét rendszerünk regisztrálta és
            továbbította az eladó illetékes munkatársa felé. Amennyiben a
            vásárlóhoz ez 48 órán belül nem érkezik meg, akkor a vásárló
            ajánlattételi kötöttségei megszűnnek. Az eladó a rendelés
            teljesítésének megkezdéséig megadja a lehetőséget a vásárlónak
            rendelése visszavonására elektronikus úton. A rendelés
            teljesítésének megkezdésekor a vásárló e-mailben és/vagy telefonon
            értesítést kap a teljesítés várható időtartamáról, és a teljesítés
            megkezdésének tényéről, ezután már csak személyesen vagy a
            &quot;Vevőszolgálat&quot; vagy &quot;Elérhetőségek&quot; menüpontok alatt található
            elérhetőségek valamelyikén keresztül van lehetőség rendelésének
            visszavonására A megrendelés utólagos módosítására csak írásos
            formában, e-mailben kerülhet sor.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Jótállás</H4>
          <Paragraph>
            Az üzemeltető által forgalmazott egyes termékekre az egyes tartós
            fogyasztási cikkekre vonatkozó kötelező jótállás szabályait
            tartalmazó 151/2003. Korm. rendelet szerint 1 éves jótállási idő áll
            a fogyasztó rendelkezésére a termék átadásának napjától. A vásárlót
            a jótállás joga akkor nem illeti meg, ha a hiba a termék fogyasztó
            részére való átadását követően keletkezett. A megjelölt rendelet alá
            nem tartozó termékek tekintetében a gyártó által biztosított
            jótállási idő a termék mellett feltüntetésre kerül. Ezzel
            kapcsolatos problémák felmerülése esetén az üzemeltető pontos
            információt tud adni. Jótállás esetében a fogyasztó a jótállási időn
            belül a meghibásodott termék díjmentes javítása, vagy cseréje illeti
            meg. A garanciális javítások a gyártási hibából eredő
            meghibásodásokra terjednek ki. A garancia feltételek a használati
            útmutatóban levő feltételek betartásával együtt érvényesek. Termék
            meghibásodása esetén a készülékhez mellékelt garancia levélen
            megjelölt címen és telefonszámon kaphat bővebb felvilágosítást a
            teendőkről, továbbá elérhetőségeink valamelyikén. A termékek
            garanciális szervizpontjára történő eljuttatásának költsége a
            vásárlót terheli. A meghibásodott készüléket közvetlenül
            webáruházunk szervizpontjára is visszaküldheti címre. Portósan
            küldött csomagokat nem vesz át átvevőpontunk, azt minden esetben
            visszaküldi a feladónak! A kijavítás során a termékbe csak új
            alkatrész kerülhet beépítésre. Az üzemeltetőnek törekednie kell
            arra, hogy a kijavítást, vagy cserét XXX napon belül elvégezze. A
            jótállás körében végzett tevékenység költségei az üzemeltetőt
            terhelik. Egyebekben a jótállásra a Ptk.6.171-173.§-ban foglaltak az
            irányadóak.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Szavatosság</H4>
          <Paragraph>
            A szolgáltatott termék hibája esetén az üzemeltetővel szemben
            kellékszavatossági igény érvényesítésének van helye a Ptk. 6:159-167
            :§ i szerint.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Panaszok intézése</H4>
          <Paragraph>
            Az üzemeltető a panaszról jegyzőkönyvet köteles felvenni,az
            üzemeltető adati között megjelölt helyen, és a panaszt a felvétel
            napjától számított öt évig, az arra adott válasszal együtt
            megőrizni. Az üzemeltető a hozzá érkezett panaszt a beérkezésétől
            számított 30 napon belül megvizsgálja és arra érdemi választ kell
            hogy adjon. Amennyiben panaszra az üzemeltető elutasító választ ad,
            azt írásban meg kell indokolnia. Az üzemeltetővel kötött
            szerződéséből eredő jogviták elsősorban békés úton, megállapodással
            a felek között, vagy a fogyasztó lakóhelye szerint illetékes
            fogyasztóvédelmi hatóság előtt intézhetők. Amennyiben ezek nem
            vezetnek eredményre, marad a felek számára a bírósági út.
          </Paragraph>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>Egyéb rendelkezések</H4>
          <Paragraph>
            A jelen általános szerződési feltételekben nem szabályozott
            kérdésekben a Ptk (2013.évi V. törvény), fogyasztói szerződéseknél a
            távollevők között kötött szerződésekről szóló 45/2014.
            kormányrendelet rendelkezései az irányadók.
          </Paragraph>
        </div>
      </div>
    </section>
  );
}