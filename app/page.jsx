import Hero from "./components/Hero";
import MiAzEmlekerme from "./components/MiAzEmlekerme"
import MilyenAlkalomra from "./components/MilyenAlkalomra"
import Elonyei from "./components/Elonyei"
import PeldaOldal from "./components/PeldaOldal" 
import HomeCTA from "./components/HomeCTA"
import Hasznalata from "./components/Hasznalata"
import BeforeLeavePopup from "./components/UI/BeforeLeavePopup"
import Fotomontazs from "./components/Fotomontazs"
import Velemenyek from "./components/Velemenyek";
import Osszehasonlitas from "./components/Osszehasonlitas";

import { getServerSession } from "next-auth";

export const metadata = {
  title: 'EmlékQR - QR-kódos emlékérmék, modern megemlékezés szeretteinkről.',
  description: 'Az emlékérmével örökre megőrizhetjük szeretteink emlékét. Időtálló megemlékezés, amely a síremlékre vagy sírkőre rögzíthető, tökéletes választás mindenszentek ünnepén.',
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

export default async function Home() {

  const session = await getServerSession()
  const userData = await getUserData(session?.user?.email)

  return (
    <>
    {/*<BeforeLeavePopup />*/}
    <Hero />
    <Fotomontazs />
    <Elonyei />
    <Osszehasonlitas />
    {/*<MiAzEmlekerme session={session} userdata={userData} />*/}
    <PeldaOldal />
    <HomeCTA />
    {/*<MilyenAlkalomra />*/}
    <Hasznalata />
    <Velemenyek />
    </>
  );
}
