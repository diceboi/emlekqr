import { getSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import LostPassword from "../components/LostPassword"

export default async function ElfelejtettJelszoPage() {

  const session = await getSession()

  if (session) {
    redirect('/profil')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <LostPassword />
    </div>
  )
}
