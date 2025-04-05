import { getServerSession } from "next-auth";
import CoverPicture from "../components/Emlekadatlap/CoverPicture";
import ProfilePicture from "../components/Emlekadatlap/ProfilePicture";
import ProfileData from "../components/Emlekadatlap/ProfileData";
import ProfileInfo from "../components/Emlekadatlap/ProfileInfo";
import ProfileEditButton from "../components/Emlekadatlap/ProfileEditButton";
import PremiumPopup from "../components/Emlekadatlap/PremiumPopup";
export const dynamic = 'force-dynamic'


const findFreeEmlekadatlaps = async (email) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/findFreeEmlekadatlaps?email=${email}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Az adatok letöltése nem sikerült");
    }
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.log("Az adatok betöltése sikertelen", error);
    return [];
  }
};

const getUserData = async (email) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL; // Adjust this as per your environment
    const res = await fetch(`${baseUrl}/api/getUserData?email=${email}`, { cache: 'no-store' });
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

export async function generateMetadata({params}) {
 
  return {
    title: `Készítsd el Emlékadatlapod - MOST 15 Napig INGYEN - EmlékQR`,
    //openGraph: {
    //  images: [currentData?.profileimage],
    //},
  }
}

export default async function EmlekadatlapKeszites({ params }) {
  const session = await getServerSession();

  let currentUser = null;
  let existingAdatlapok = [];

  if (session) {
    const userData = await getUserData(session.user.email);
    currentUser = userData?.data?.User || null;

    existingAdatlapok = await findFreeEmlekadatlaps(session.user.email);
  }

  const hasReachedLimit = existingAdatlapok.length >= 3;

  return (
    <>
      <section className="relative w-full px-2 lg:px-0 pt-10 pb-32 lg:pt-20">
        <PremiumPopup hasReachedLimit={hasReachedLimit} popup={'reached-limit'} innertext={'3-nál több ingyenes adatlap csak érme vásárlása után hozható létre.'} />
        <div className="container-inner flex flex-col m-auto gap-8">
            <CoverPicture session={session} currentuser={currentUser} free={true} />
            <div
              id="profile-data"
              className="flex flex-col xl:flex-row gap-8 xl:gap-20 xlitems-end items-center w-full"
            >
              <ProfilePicture session={session} free={true} />
              <ProfileData session={session} free={true} />
            </div>
            <ProfileInfo session={session} free={true} />  
        </div>
        {!hasReachedLimit && (
          <ProfileEditButton session={session} user={currentUser} free={true} />
        )}
      </section>
    </>
  );
}