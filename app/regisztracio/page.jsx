import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { getSession } from "next-auth/react"
import { redirect } from 'next/navigation'

export default async function Regisztracio() {

  const session = await getSession()

  if (session) {
    redirect('/profil')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
    <RegisterForm/>
    </div>
  )
}
