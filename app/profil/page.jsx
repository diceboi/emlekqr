import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfilEmlekadatlapok from "../components/Profil/ProfilEmlekadatlapok";
import ProfilErtesitesek from "../components/Profil/ProfilErtesitesek";
import ProfilAdatlap from "../components/Profil/ProfilAdatlap";

const getPersonalEmlekadatlap = async (owner) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/emlekadatlapok?owner=${owner}`, { cache: 'no-store' });
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
    const baseUrl = process.env.NEXT_PUBLIC_URL;
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

export default async function Profil() {
  const session = await getServerSession();

  if (!session) {
    redirect("/bejelentkezes");
  }

  const sessionUser = session?.user?.email;
  const emlekadatlapok = await getPersonalEmlekadatlap(sessionUser);
  const user = await getUserData(sessionUser);
  const currentData = emlekadatlapok?.data?.Emlekadatlap || [];
  const currentUser = user?.data.User || []

  return (
    <section className="relative lg:py-20 py-8 px-2">
      <div className="container m-auto">
        <div className=" flex flex-col lg:flex-row gap-16">
          <ProfilAdatlap session={session} user={currentUser} />
          <div className="flex flex-col gap-16 w-full">
            <ProfilErtesitesek />
            <ProfilEmlekadatlapok currentdata={currentData} user={currentUser} />
          </div>
        </div>
      </div>
    </section>
  );
}
