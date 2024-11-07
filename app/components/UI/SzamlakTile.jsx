import Link from "next/link"

export default function Szamlaktile({ szamla }) {

  return (
    <>
      <div className="relative flex lg:flex-row flex-col gap-8 bg-white hover:bg-[--cream] rounded-xl border border-[--cream] p-4">
        <div className="flex lg:flex-row flex-col gap-4 w-full items-center">
          <div className="flex flex-row gap-4 w-full justify-between lg:justify-start">
            <h4 className="text-sm">{szamla.number}</h4>
            <p className="text-xs">sorszámú számla</p>
          </div>
          <div className="flex flex-row gap-4 w-full justify-between">
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
            <Link href={szamla.hosted_invoice_url} target="__blank" className="px-2 py-1 bg-[--blue] hover:bg-[--rose] rounded-full transition-all text-white text-xs w-fit lg:self-end  self-center">Megtekintés</Link>
          </div>
        </div>
      </div>
    </>
  );
}
