import Image from "next/image"
import Link from "next/link"

export default function Emlekadatlaptile({ data }) {
  return (
    <div className="flex flex-row gap-8 bg-white rounded-xl shadow-special p-4">
        <div className="flex flex-row gap-8 w-10/12">
            <div className="relative w-[150px] h-[150px]">
                <Image 
                src={data.profileimage}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-full"/>
            </div>
            <div className="flex flex-col justify-center gap-4">
                <h4>{data.name}</h4>
                <p>{data.age}</p>
                <p>{data.born} - {data.died}</p>
            </div>
        </div>
        
        <div className="flex flex-col justify-between items-end w-2/12">
            <p>Azonosító: {data.uri}</p>
            <Link href={`/emlekadatlapok/${data.uri}`} className="px-2 py-1 bg-[--blue] hover:bg-[--rose] rounded-full transition-all text-white w-fit">Adatlap megtekintése</Link>
        </div>
        
    </div>
  )
}
