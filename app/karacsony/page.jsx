import KaracsonyInner from '../components/KaracsonyInner'

import { getServerSession } from "next-auth";

export const metadata = {
  title: 'Különleges és egyedi karácsonyi ajándék - EmlékQR emlékérme',
  description: 'Ajándékozz emlékeket idén karácsonykor! Az EmlékQR érem egyedi és személyre szabott ajándék, amely megőrzi a legszebb pillanatokat. Tökéletes ajándék nagyszülőknek,  családtagoknak és barátoknak – rendeld meg most!'
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

export default async function KaracsonyPage() {

  const session = await getServerSession()
  const userData = await getUserData(session?.user?.email)

  return (
    <KaracsonyInner session={session} userdata={userData}/>
  )
}
