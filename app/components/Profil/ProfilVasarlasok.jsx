"use client";

import { useEffect, useState } from "react";
import { TbGiftCard } from "react-icons/tb";
import H4 from "../UI/H4";
import Paragraph from "../UI/Paragraph";
import ProfilVasarlasKuponTile from "./ProfilVasarlasKuponTile";

export default function ProfilVasarlasok({ currentuser }) {
  const couponCode = currentuser?.couponcode;
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(5);

  useEffect(() => {
    async function fetchPurchases() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/stripe/getPurchasesByCoupon?couponcode=${couponCode}`);
        const data = await res.json();
        console.log(data);

        if (!res.ok) throw new Error(data.error || "Nem sikerült lekérni az adatokat.");

        setPurchases(data.purchases || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (couponCode) {
      fetchPurchases();
    }
  }, [couponCode]);

  console.log("Purchases: ", purchases)

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 5);
  };

  const totalCommission = purchases.reduce((sum, p) => {
    const gross = p.amount_total / 100;
    const commission = gross > 10000 ? 5000 : 1000;
    return sum + commission;
  }, 0);
  

  return (
    <div className="flex flex-col gap-16 bg-white shadow-special rounded-2xl p-8">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <TbGiftCard className="w-8 h-8 text-[--rose] bg-[--cream] rounded-full p-1" />
          <H4 classname={"text-[--rose]"}>Vásárlások a kuponkódoddal</H4>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <p>Vásárlások betöltése...</p>
          ) : error ? (
            <p>{error}</p>
          ) : purchases.length === 0 ? (
            <p>Jelenleg nincsenek vásárlások ezzel a kuponkóddal. Itt fogod látni ha valaki a te kuponkódoddal vásárolt.</p>
          ) : (
            purchases
              .slice()
              .reverse()
              .slice(0, displayLimit)
              .map((purchase, i) => (
                <ProfilVasarlasKuponTile key={purchase.id || i} purchase={purchase} />
              ))
          )}

            {purchases.length > 0 && (
            <div className="flex flex-row gap-2 items-center justify-end">
                <Paragraph classname={""}>
                    Összes jutalékod:
                </Paragraph>
                <Paragraph classname={"text-white bg-[--blue] p-2 rounded-lg text-center"}>
                    {totalCommission} Ft
                </Paragraph>
            </div>
            )}
        </div>

        {purchases.length > displayLimit && !loading && (
          <button
            onClick={handleLoadMore}
            className="mt-4 self-center px-4 py-2 bg-[--blue] text-white rounded-full hover:bg-[--blue-hover] transition"
          >
            További vásárlások betöltése
          </button>
        )}
      </div>
    </div>
  );
}
