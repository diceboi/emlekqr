import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Emlekadatlapok() {
  const session = await getServerSession();

  if(!session) {
    redirect("/bejelentkezes")
  }

  return (
    <div>Emlékadatlapok</div>
  )
}
