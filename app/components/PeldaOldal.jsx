import { getServerSession } from "next-auth";
import H1 from "./UI/H1"
import H2 from "./UI/H2"
import H3 from "./UI/H3"
import H4 from "./UI/H4"
import Paragraph from "./UI/Paragraph"
import Image from "next/image"
import { LiaDoveSolid } from "react-icons/lia"
import { TbGrave, TbQuote } from "react-icons/tb"
import CoverPicture from "./Emlekadatlap/CoverPicture"
import ProfilePicture from "./Emlekadatlap/ProfilePicture"
import ProfileData from "./Emlekadatlap/ProfileData"
import ProfileInfo from "./Emlekadatlap/ProfileInfo"
import { TbHandClick } from "react-icons/tb";

const getEmlekadatlap = async () => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL; // Adjust this as per your environment
        const res = await fetch(`${baseUrl}/api/emlekadatlap?uri=0000017`, { cache: 'no-store' });
        if (!res.ok) {
        throw new Error("Az adatok letöltése nem sikerült");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Az adatok betöltése sikertlen", error);
        return null;
    }
};

const getTributes = async (uri) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL; // Adjust this as per your environment
      const res = await fetch(`${baseUrl}/api/tributes?uri=${uri}`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error("Az adatok letöltése nem sikerült");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Az adatok betöltése sikertlen", error);
      return null;
    }
};

export default async function PeldaOldal() {

    const session = {
        Session: {
            user: {
                name: 'Bokros Gabriella',
                email: 'gabibokros70@gmail.com',
                image: undefined
            }
        }
    }
    
    let currentUser = {
        _id: '663e4ac41d3c4c611480c791',
        name: 'Bokros Gabriella',
        vezeteknev: 'Bokros',
        keresztnev: 'Gabriella',
        email: 'gabibokros70@gmail.com',
        password: '$2b$05$78ln3FiIjOyjzT5gXaccI.uY09ozpZ5myNyrvMdOE3bbANK2Xt6N6',
        createdAt: '2024-05-10T16:26:44.764Z',
        updatedAt: '2024-11-11T20:29:55.459Z',
        __v: 0,
        city: 'Kaposvár',
        phone: '+36302732236',
        secret: '',
        zip: '7400',
        stripeSubscription: '',
        address1: 'Zárda utca 23. fsz. 2.',
        checkoutSession: 'cs_test_b1egfKlO7SnIAak1aMvbP4HnVET71By63OLKQUNOpZRBXIEWj3LPEchos6',
        address2: 'teszt'
      }
    
    const emlekadatlap = await getEmlekadatlap("0000017");
    const currentData = emlekadatlap?.data?.Emlekadatlap || null;

    const tribute = await getTributes("663e4ac41d3c4c611480c791");
    const currentTributes = tribute?.data?.Tribute || null;

  return (
    <section className="relative w-full bg-white px-4 pb-20">
        <div className="relative flex flex-col gap-4 py-20">
          <H2 classname={'text-center self-center text-[--rose]'}>Hogy fog kinézni az Emlékoldal?</H2>
        </div>

        <div className="flex flex-nowrap">
          <div className="container flex flex-col m-auto gap-8">
            <div className="relative group group-hover:p-4">
              <CoverPicture session={session} data={currentData} currentuser={currentUser} cursor={false}/>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                <H3 classname={'px-4 py-2 bg-[--blue] text-white text-center group-hover:block hidden rounded-3xl'}>Borítókép</H3>
                <TbHandClick className="group-hover:hidden block min-w-16 h-auto text-white animate-bounce z-40"/>
              </div>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none group-hover:border-2 border-[--blue] border-dashed bg-transparent group-hover:bg-[--blue-15] z-30 rounded-3xl"></div>
            </div>
            
            <div
                id="profile-data"
                className="relative group flex flex-col xl:flex-row gap-8 xl:gap-20 items-center w-full"
            >
                <ProfilePicture session={session} data={currentData} cursor={false}/>
                <ProfileData session={session} data={currentData} cursor={false}/>
                <div className="absolute bottom-8 left-8 z-40">
                  <H3 classname={'px-4 py-2 bg-[--blue] text-white text-center group-hover:block hidden rounded-3xl'}>Profilkép,<br></br>Információk</H3>
                  <TbHandClick className="group-hover:hidden block min-w-16 h-auto text-[--blue] animate-bounce z-40"/>
                </div>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none group-hover:border-2 border-[--blue] border-dashed bg-transparent group-hover:bg-[--blue-15] z-30 rounded-3xl"></div>
            </div>
            <div className="relative group">
              <ProfileInfo session={session} data={currentData} tributes={currentTributes} cursor={false}/>
              <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40">
                <H3 classname={'px-4 py-2 bg-[--blue] text-white text-center group-hover:block hidden rounded-3xl'}>Történetek,<br></br>Médiatartalmak,<br></br>Hozzászólások</H3>
                <TbHandClick className="group-hover:hidden block min-w-16 h-auto text-[--blue] animate-bounce z-40"/>
              </div>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none group-hover:border-2 border-[--blue] border-dashed bg-transparent group-hover:bg-[--blue-15] z-30 rounded-3xl"></div>
            </div>
            
          </div>
        </div>
        
    </section>
  )
}
