import LoginForm from "../components/LoginForm";
import { redirect } from "next/navigation";
import AuthOptions from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";

export const metadata = {
  title: 'Bejelentkezés - EmlékQR',
}


export default async function Bejelentkezes() {
  const session = await getServerSession(AuthOptions);

  if (session) {
    redirect("/profil");
  }

  return (
    <div className="flex flex-col items-center justify-center lg:min-h-[93vh] py-8 px-10">
      <LoginForm />
    </div>
  );
}
