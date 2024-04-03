import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Profil() {
  const session = await getServerSession();

  if(!session) {
    redirect("/bejelentkezes")
  }

  return (
    <div>Profil</div>
  )
}
