import { getServerSession } from "next-auth";
import Emlekadatlaptile from "../components/UI/EmlekadatlapTile";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

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

const getPersonalEmlekadatlap = async (owner) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL; // Adjust this as per your environment
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

export default async function emlekadatlapok() {
  const session = await getServerSession();

  if (!session) {
    redirect('/bejelentkezes'); // Redirect to login if no session
  }

  const currentUser = session?.user?.email;

  const emlekadatlapok = await getPersonalEmlekadatlap(currentUser);
  const currentData = emlekadatlapok?.data?.Emlekadatlap || [];

  return (
    <section className='w-full lg:py-20 py-8'>
      <div className="container mx-auto flex flex-col gap-8">
        {currentData.length > 0 ? (
          currentData.map((currentdata, index) => (
            <Emlekadatlaptile data={currentdata} key={index}/>
          ))
        ) : (
          <h4>Jelenleg még nincs adatlapod, készítsd el saját érmédet</h4>
        )}
      </div>
    </section>
  );
}
