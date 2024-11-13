import H1 from "../components/UI/H1";
import H4 from "../components/UI/H4";
import Paragraph from "../components/UI/Paragraph";
import Label from "../components/UI/Label";
import Link from "next/link";

export const metadata = {
  title: 'Az elhunytak jogainek védelme - EmlékQR',
}


export default function ElhunytJogainakVedelmePage() {
  return (
    <section className="w-full lg:py-16 py-8 px-4">
      <div className="container m-auto">
        <div className="flex flex-col gap-4">
          <H1 classname={"text-[--rose] pb-16"}>Elhunyt jogainak védelme</H1>
          <H4 classname={"text-[--rose] pb-4 pt-8"}>
            2:50. § [Kegyeleti jog] 
          </H4>
          <Paragraph>
            (1) Meghalt ember emlékének megsértése miatt bírósághoz fordulhat a hozzátartozó vagy az, akit az elhunyt
            végrendeleti juttatásban részesített.
            (2) A kegyeleti jogsértéssel elért vagyoni előny átengedését bármelyik örökös kérheti. Több örökös esetén az
            elvont vagyoni előny az örökösöket a hagyatékból való részesedésük arányában illeti meg.
          </Paragraph>
          <Paragraph>
          4.7.1. Az új kódex önálló paragrafusba emelte a régi Ptk. szabályát [1959-es Ptk. 85. § (3) bekezdése] és így
          örökíti azt tovább. Változás csak egy új szankciót érintően jelentkezik.
          </Paragraph>
          <Paragraph>
          4.7.2. A halál nem szünteti meg az ember emlékét, a személy méltóságát, becsületét, jó hírnévhez kapcsolódó
jogát a törvény a halál után is védi. A törvény szó szerint az elhunyt emlékét védi, és ennek tartalmát a
bíróságok már korábban is kiterjesztően értelmezték. Nemcsak az elhunyt jóhírnevéről van szó, hanem számos
korábbi jogeset alapján az elhunyt sírjáról, sírhelyéről, sírfeliratról és a sírhasználat kérdéseiről is. A kegyeleti
jogok érintik az elhunyt holttestével, szerveivel kapcsolatos kérdéseket, az eltemetését.   
          </Paragraph>
          <Paragraph>
          4.7.3. A szabályozás dogmatikai magyarázata nem könnyű, hiszen a sérelmet érintő személy már nem létezik,
jogképességgel a halál bekövetkezte után már nem rendelkezik. Az elhunyt személy emlékének a védelmét
olyan sajátos jogként magyarázzák, hogy a védelem az őt túlélő személyek révén kap jogosultat. A törvény a
korábbi szabályozással hasonlóan az elhunyt emlékét sértő magatartással szemben az elhunyt személy
hozzátartozói, továbbá mindazok felléphetnek, akiket az elhunyt végrendeleti juttatásban részesített.
          </Paragraph>
          <Paragraph>
          4.7.4. A törvény az igényt valamennyi lehetséges jogosultnak megadja, tehát bármelyik jogosult önállóan is
felléphet, nem beszélhetünk jogosulti együttességről. Több per megindulása esetén célszerű ezen pereket
egyesíteni.
          </Paragraph>
          <Paragraph>
          4.7.5. A személyiségi jogsértésre adott új szankció, a jogsértéssel elért vagyoni előny átengedésére vonatkozó
jog, a kegyeleti jogok megsértésénél is alkalmazandó. Ezt a vagyoni jogot már csak az örökösök érvényesíthetik,
szemben a többi szankcióval, tehát azok, akik az elhunyt hagyatékából öröklés jogcímén részesedtek. Mivel
vagyoni igényről van szó, amely vagyon az elhunyt emlékét sértő magatartásnak az eredménye, ez az
örököseket illeti meg. Több örökös esetében az egyes örökösöket a hagyatékban való részesedésük arányában
illeti meg az elért vagyoni előny. Mivel vagyoni igényről van szó, ezért az engedményezhető.
          </Paragraph> 
          <Paragraph>
          4.7.6. A norma egyúttal sajátos perbizományt nevesít, hiszen bármely örököst feljogosítja a vagyoni igény saját
jogon történő érvényesíthetőségére, hiszen a törvény úgy fogalmaz: bármely örökös kérheti. Viszont ez csak a
perbeli legitimációt nevesítő norma, és emellett a kegyeleti jogsértést érvényesítő örökössel szemben a többi
örökös felléphet, velük szemben el kell számolnia, azaz a részükre a megfelelő hányadot ki kell adnia.
Véleményünk szerint az örökösök egymást közti igénye kötelmi igény, így elévülési jellegű.
          </Paragraph>
          <Paragraph>
            4.7.7. A kegyeletet a büntető törvénykönyv is védi, 2012. évi C. tv. 228. §.
          </Paragraph>  
          <Paragraph>
          Kegyeletsértés 228. § Aki halottat vagy emlékét a 226. vagy a 227. §-ban meghatározott módon
          meggyalázza, vétség miatt az ott meghatározott büntetéssel büntetendő.
          </Paragraph>
          </div>
        </div>
    </section>
  )
}
