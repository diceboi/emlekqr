import Label from "../UI/Label";

export default function ProfilVasarlasKuponTile({ purchase }) {
    return (
      <div className="flex flex-col gap-1 border border-gray-200 rounded-xl p-4 shadow-sm">
        <Label classname={""}>Vásárló: <strong className="text-[--rose]">{purchase.customer_email || "Ismeretlen"}</strong></Label>
        <Label classname={""}>Összeg: <strong className="text-[--rose]">{purchase.amount_total / 100} {purchase.currency.toUpperCase()}</strong></Label>
        <Label classname={""}>Időpont: <strong className="text-[--rose]">{new Date(purchase.created * 1000).toLocaleString("hu-HU")}</strong></Label>
        <Label classname={""}>Jutalékod: <strong className="text-[--blue]">{purchase.amount_total / 100 > 10000 ? "5000 Ft" : "1000 Ft"}</strong></Label>
      </div>
    );
  }
  
