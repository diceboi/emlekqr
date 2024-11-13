import { getServerSession } from "next-auth";

import Emlekerme from "../components/Emlekerme"
import { describe } from "node:test";

export const metadata = {
  title: 'Az emlékérme - EmlékQR',
  description: 'Válaszd ki emlékérméd, rendeld meg és töltsd fel emlékekkel! Digitalizáld fényképes fiókodat, ne hagyd elveszni az emlékeket.'
}

const getUserData = async (email) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/getUserData?email=${email}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default async function Erme() {

    const session = await getServerSession()
    const userData = await getUserData(session?.user?.email)

  return (
   <Emlekerme session={session} userdata={userData}/>
  )
}
