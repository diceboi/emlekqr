import Emlekadatlaptile from "../UI/EmlekadatlapTile";

export default function ProfilEmlekadatlapok({ session }) {
  return (
    <div className="flex flex-col gap-16 bg-white shadow-special rounded-2xl p-8">
        <div className="flex flex-col gap-8">
        <div className="flex flex-nowrap gap-4 items-center">
            <TbBellRingingFilled className="w-8 h-8 text-[--rose] bg-[--cream] rounded-full p-1" />
            <h4>Emlékadatlapok</h4>
        </div>
        
        <div className="flex flex-col gap-4">
            {currentData.length > 0 ? (
            currentData.map((currentdata, index) => (
                <Emlekadatlaptile data={currentdata} key={index}/>
            ))
            ) : (
            <h4>Jelenleg még nincs adatlapod, készítsd el saját érmédet</h4>
            )}
        </div>
        </div>
    </div>
  )
}
