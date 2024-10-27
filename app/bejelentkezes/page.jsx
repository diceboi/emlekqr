import LoginForm from "../components/LoginForm"
import { getSession } from "next-auth/react"
import { redirect } from 'next/navigation'

export default function Bejelentkezes() {

  const session = getSession()

  if (session) {
    redirect('/profil')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <LoginForm />
    </div>
  )
}
