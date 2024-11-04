import { AuthOptions } from "../../utils/AuthOptions"
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import ResetPassword from "../../components/ResetPassword"

export default async function JelszoVisszaallitasPage({ params }) {

  const session = await getServerSession(AuthOptions)

  if (session) {
    redirect('/profil')
  }

  return (
    <div className="flex flex-col items-center justify-center lg:min-h-[93vh] py-8 px-10">
    <ResetPassword token={params.token}/>
    </div>
  )
}
