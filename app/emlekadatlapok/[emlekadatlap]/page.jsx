import { getServerSession } from "next-auth";
import CoverPicture from "../../components/Emlekadatlap/CoverPicture";
import ProfilePicture from "../../components/Emlekadatlap/ProfilePicture";
import ProfileData from "../../components/Emlekadatlap/ProfileData";
import ProfileInfo from "../../components/Emlekadatlap/ProfileInfo";
import ProfileEditButton from "../../components/Emlekadatlap/ProfileEditButton";
import SecretCheckerModal from "../../components/UI/SecretCheckerModal";
import LoginForm from "../../components/LoginForm";
import SecretCheckerForm from "../../components/UI/SecretCheckerForm"
import BackgroundSwitcher from "../../components/Emlekadatlap/BackgroundSwitcher"

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

export default async function Emlekadatlap({ params }) {
  const session = await getServerSession();

  let currentUser = null;

  if (session) {
    const userData = await getUserData(session.user.email);
    currentUser = userData?.data?.User || null;
  }
  
  const emlekadatlap = await getEmlekadatlap(params.emlekadatlap);
  const currentData = emlekadatlap?.data?.Emlekadatlap || null;

  const tribute = await getTributes(params.emlekadatlap);
  const currentTributes = tribute?.data?.Tribute || null;



  return (
    <>
    {/*<BackgroundSwitcher>*/}
    <section className="relative w-full px-2 lg:px-0 pt-10 pb-32 lg:pt-20">
      {currentData === null && (
        <SecretCheckerModal session={session}>
        {session && currentData === null  && (
          <SecretCheckerForm user={currentUser}/>
        )}
        {!session && (
          <>
          <h2 className="text-center">Jelentkezz be, az űrlap szerkesztéséhez</h2>
          <LoginForm />
          </>
        )}
        </SecretCheckerModal>
      )}
      <div className="container-inner flex flex-col m-auto gap-8">
        <CoverPicture session={session} data={currentData} />
        <div
          id="profile-data"
          className="flex flex-col xl:flex-row gap-8 xl:gap-20 xlitems-end items-center w-full"
        >
          <ProfilePicture session={session} data={currentData} />
          <ProfileData session={session} data={currentData} />
        </div>
        <ProfileInfo session={session} data={currentData} tributes={currentTributes}/>
      </div>
      <ProfileEditButton session={session} user={currentUser} data={currentData}/>
    </section>
    {/*</BackgroundSwitcher>*/}
    </>
  );
}