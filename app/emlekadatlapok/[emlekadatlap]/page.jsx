import { getServerSession } from "next-auth";
import CoverPicture from "../../components/Emlekadatlap/CoverPicture";
import ProfilePicture from "../../components/Emlekadatlap/ProfilePicture";
import ProfileData from "../../components/Emlekadatlap/ProfileData";
import ProfileInfo from "../../components/Emlekadatlap/ProfileInfo";
import ProfileEditButton from "../../components/Emlekadatlap/ProfileEditButton";
import SecretChecker from "../../components/UI/SecretChecker"
import ErmeChecker from "../../components/UI/ErmeChecker"

export const dynamic = 'force-dynamic'


const getEmlekadatlap = async (uri) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL; // Adjust this as per your environment
    const res = await fetch(`${baseUrl}/api/emlekadatlap?uri=${uri}`, { cache: 'no-store' });
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

const getAllIttjartam = async (uri) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/getIttjartam?adatlap=${uri}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error("Az adatok letöltése nem sikerült");
    }
    const data = await res.json();
    return data?.data?.ittjartam || []; // ✅ helyes kulcsnév
  } catch (error) {
    console.log("Az Ittjartam adatok betöltése sikertelen", error);
    return [];
  }
};

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

const getTributes = async (id) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL; // Adjust this as per your environment
    const res = await fetch(`${baseUrl}/api/tributes?uri=${id}`, { cache: 'no-store' });
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
  
  const emlekadatlap = await getEmlekadatlap(params.emlekadatlap);
  const currentData = emlekadatlap?.data?.Emlekadatlap || null;
 
  return {
    title: `${currentData?.name} emlékoldala - EmlékQR`,
    openGraph: {
      images: [currentData?.profileimage],
    },
  }
}

export default async function Emlekadatlap({ params, searchParams  }) {

  const session = await getServerSession();

  let currentUser = null;
  let existingAdatlapok = [];

  if (session) {
    const userData = await getUserData(session.user.email);
    currentUser = userData?.data?.User || null;

    existingAdatlapok = await findFreeEmlekadatlaps(session.user.email);
  }
  
  const emlekadatlap = await getEmlekadatlap(params.emlekadatlap);
  const currentData = emlekadatlap?.data?.Emlekadatlap || null;

  const tribute = await getTributes(params.emlekadatlap);
  const currentTributes = tribute?.data?.Tribute || null;

  const allittjartam = await getAllIttjartam(params.emlekadatlap);

  return (
    <>
    {/*<BackgroundSwitcher>*/}
    <section className="relative w-full px-2 lg:px-0 pt-10 pb-32 lg:pt-20">
      
      {!currentData && (
        <SecretChecker currentdata={currentData} session={session} currentuser={currentUser}/>   
      )}

      {currentData?.secret && session && session?.user?.email === currentData?.owner && (
        <ErmeChecker currentdata={currentData} session={session} currentuser={currentUser} existingadatlapok={existingAdatlapok}/>
      )}  

      <div className="container-inner flex flex-col m-auto gap-8">
        <CoverPicture session={session} data={currentData} currentuser={currentUser}/>
        <div
          id="profile-data"
          className="flex flex-col xl:flex-row gap-8 xl:gap-20 xl:items-start items-center w-full"
        >
          <ProfilePicture session={session} data={currentData} free={currentData?.paymentStatus === 'free' ? true : false} currentuser={currentUser} allittjartam={allittjartam}/>
          <ProfileData session={session} data={currentData} />
        </div>
        <ProfileInfo session={session} data={currentData} tributes={currentTributes} free={currentData?.paymentStatus === 'free' ? true : false} />
      </div>
      <ProfileEditButton session={session} user={currentUser} data={currentData} existingadatlapok={existingAdatlapok}/>
    </section>
    {/*</BackgroundSwitcher>*/}
    </>
  );
}