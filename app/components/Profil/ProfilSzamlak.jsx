import { TbAd2 } from "react-icons/tb"
import Szamlaktile from "../UI/SzamlakTile"
import H4 from "../UI/H4";

export default function ProfilSzamlak({ invoices }) {

    const szamlak = invoices?.invoices?.data || []

  return (
    <div className="flex flex-col gap-16 bg-white shadow-special rounded-2xl p-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-nowrap gap-4 items-center">
          <TbAd2 className="w-8 h-8 text-[--rose] bg-[--cream] rounded-full p-1" />
          <H4 classname={"text-[--rose]"}>Számlák</H4>
        </div>

        <div className="flex flex-col gap-4">
            {szamlak.length !== null ? (
            szamlak.map((szamla, index) => (
                <Szamlaktile szamla={szamla} key={index}/>
            ))
            ) : (
            <h4>Jelenleg még nincs számlád, itt fognak megjelenni a kiállított számláid.</h4>
            )}
        </div>
      </div>
    </div>
  );
}
