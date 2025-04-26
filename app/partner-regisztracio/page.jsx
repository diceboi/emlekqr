import PartnerRegisterForm from "../components/PartnerRegisterForm";

export const metadata = {
  title: "Partner Regisztráció - EmlékQR",
};

export default async function PartnerRegisztracioPage() {

  return (
    <>
      <section className="flex flex-col items-center justify-center py-20 ">
        <PartnerRegisterForm title={'Partner regisztráció'} bgcolor={'bg-[--cream]'} shadow={'shadow-lg'}/>
      </section>
    </>
  );
}
