import { getSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import ResetPassword from "../../components/ResetPassword"

export default async function JelszoVisszaallitasPage() {

  const session = await getSession()

  if (session) {
    redirect('/profil')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <ResetPassword />
    </div>
  )
}
