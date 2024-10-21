import Link from "next/link"

export default function Szamlaktile({ szamla }) {

    console.log(szamla)

  return (
    <>
      <div className="relative flex flex-row gap-8 bg-white hover:bg-[--cream] rounded-xl border border-[--cream] p-4">
        <div className="flex flex-row gap-4 w-full items-center">
          <h4 className="text-sm">{szamla.number}</h4>
          <p className="text-xs">sorszámú számla</p>
          {szamla.status === 'paid' && (
            <p className="text-xs border border-[--success] rounded-full py-1 px-2">Szátusz: Fizetett</p>
          )}
          {szamla.status === 'draft' && (
            <p className="text-xs border border-black rounded-full py-1 px-2">Szátusz: Piszkozat</p>
          )}
          {szamla.status === 'open' && (
            <p className="text-xs border border-[--blue] rounded-full py-1 px-2">Szátusz: Fizetésre vár</p>
          )}
          {szamla.status === 'void' && (
            <p className="text-xs border border-[--success] rounded-full py-1 px-2">Szátusz: Törölt</p>
          )}
          {szamla.status === 'uncollectible' && (
            <p className="text-xs border border-[--error] rounded-full py-1 px-2">Szátusz: Nem fizetett</p>
          )}
        </div>
        
        <div className="flex flex-col justify-end items-end min-w-fit">
          <Link href={szamla.hosted_invoice_url} target="__blank" className="px-2 py-1 bg-[--blue] hover:bg-[--rose] rounded-full transition-all text-white text-xs w-fit">Számla megtekintése</Link>
        </div>
      </div>
    </>
  );
}
