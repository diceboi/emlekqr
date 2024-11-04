import { AuthOptions } from "../utils/AuthOptions"
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import LostPassword from "../components/LostPassword"

export default async function ElfelejtettJelszoPage() {

  const session = await getServerSession(AuthOptions)

  if (session) {
    redirect('/profil')
  }

  return (
    <div className="flex flex-col items-center justify-center lg:min-h-[93vh] py-8 px-10">
    <LostPassword />
    </div>
  )
}
