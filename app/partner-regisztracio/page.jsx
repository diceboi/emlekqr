import { Suspense } from "react";
import PartnerRegisterForm from "../components/PartnerRegisterForm";

export const metadata = {
  title: "Partner Regisztráció - EmlékQR",
};

export default function PartnerRegisztracioPage() {
  return (
    <section className="flex flex-col items-center justify-center py-20">
      <Suspense fallback={<div>Űrlap betöltése...</div>}>
        <PartnerRegisterForm title={'Partner regisztráció'} bgcolor={'bg-[--cream]'} shadow={'shadow-lg'} />
      </Suspense>
    </section>
  );
}
