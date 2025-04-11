import {
  TbInfoCircleFilled,
} from "react-icons/tb";

export default function InfoBlock({bgcolor, bordercolor, infocolor, children}) {
  return (
    <div className={`relative lex flex-col gap-4 ${bgcolor} border ${bordercolor} p-8 rounded-3xl`}>
      <TbInfoCircleFilled className={`absolute -top-5 left-8 ${infocolor} min-w-10 min-h-10 bg-neutral-50 rounded-full`}/>
      {children}
    </div>
  );
}
