import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfilEmlekadatlapok from "../components/Profil/ProfilEmlekadatlapok";
import ProfilErtesitesek from "../components/Profil/ProfilErtesitesek";
import ProfilAdatlap from "../components/Profil/ProfilAdatlap";
import ProfilSzamlak from "../components/Profil/ProfilSzamlak";

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

const getStripeCustomer = async (email) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/stripe/searchCustomer?email=${email}`, { cache: 'no-store' });
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

const getInvoices = async (customerId) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const res = await fetch(`${baseUrl}/api/stripe/getInvoices?customerId=${customerId}`, { cache: 'no-store' });
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
  const customer = await getStripeCustomer(sessionUser);
  const customerId = customer?.id;
  const invoices = await getInvoices(customerId);
  const currentData = emlekadatlapok?.data?.Emlekadatlap || [];
  const currentUser = user?.data.User || [];

  return (
    <section className="relative lg:py-20 py-8 px-2">
      <div className="container m-auto">
        <div className=" flex flex-col lg:flex-row lg:gap-16 gap-8">
          <ProfilAdatlap session={session} user={currentUser} />
          <div className="flex flex-col lg:gap-16 gap-8 w-full">
            <ProfilErtesitesek currentuser={currentUser} currentdata={currentData} />
            <ProfilEmlekadatlapok currentdata={currentData} />
            <ProfilSzamlak currentdata={currentData} invoices={invoices}/>
          </div>
        </div>
      </div>
    </section>
  );
}
