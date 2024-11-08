import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { AuthOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'

export default async function Regisztracio() {

  const session = await getServerSession(AuthOptions)

  if (session) {
    redirect('/profil')
  }

  return (
    <div className="flex flex-col items-center justify-center lg:min-h-[93vh] py-8 px-10">
    <RegisterForm/>
    </div>
  )
}
