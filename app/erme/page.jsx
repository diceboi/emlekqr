import { getServerSession } from "next-auth";

import Emlekerme from "../components/Emlekerme"

export default async function Erme() {

    const session = await getServerSession()

  return (
   <Emlekerme session={session}/>
  )
}
