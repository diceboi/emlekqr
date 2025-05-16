import { getServerSession } from "next-auth";
import H1 from "../components/UI/H1";
import H2 from "../components/UI/H2";
import H3 from "../components/UI/H3";
import H4 from "../components/UI/H4";
import Paragraph from "../components/UI/Paragraph";
import Label from "../components/UI/Label";
import Image from "next/image";
import { LiaDoveSolid } from "react-icons/lia";
import CoverPicture from "../components/Emlekadatlap/CoverPicture";
import ProfilePicture from "../components/Emlekadatlap/ProfilePicture";
import ProfileData from "../components/Emlekadatlap/ProfileData";
import ProfileInfo from "../components/Emlekadatlap/ProfileInfo";
import { TbHandClick } from "react-icons/tb";
import Arrow from "../components/Animations/Arrow";
import Camel from "../components/Animations/Camel";
import Hearth from "../components/Animations/Hearth";
import Link from "next/link";
import MiAzEmlekerme from "../components/MiAzEmlekerme";
import VideosVelemenyek from "../components/VideosVelemenyek"

import {
  TbBrowserPlus,
  TbUserScan,
  TbImageInPicture,
  TbClipboardList,
  TbGrave,
  TbQuote,
  TbWallpaper,
  TbPhoto,
  TbVideo,
  TbMessage,
  TbCheck,
  TbX,
  TbQrcode,
  TbDevicesUp,
} from "react-icons/tb";

const getEmlekadatlap = async (uri) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL; // Adjust this as per your environment
    const res = await fetch(`${baseUrl}/api/emlekadatlap?uri=${uri}`, {
      next: { revalidate: 60 },
    });
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
    const res = await fetch(`${baseUrl}/api/getIttjartam?adatlap=${uri}`, {
      next: { revalidate: 60 },
    });
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

const getTributes = async (uri) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL; // Adjust this as per your environment
    const res = await fetch(`${baseUrl}/api/tributes?uri=${uri}`, {
      next: { revalidate: 60 },
    });
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
      const res = await fetch(`${baseUrl}/api/getUserData?email=${email}`, { next: { revalidate: 60 } });
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

export default async function EmlekoldalAkcioPage() {
  const fixedSession = {
    Session: {
      user: {
        name: "Szász Szabolcs",
        email: "szasz.szabolcs1995@gmail.com",
        image: undefined,
      },
    },
  };

  let fixedCurrentUser = {
    _id: "660db3b33c2b3630564fa59e",
    name: "Szász Szabolcs",
    vezeteknev: "Szász",
    keresztnev: "Szabolcs",
    email: "szasz.szabolcs1995@gmail.com",
    password: "$2b$05$GQPrNaOV6NtT4k23Evhpd.u/kZVrbOviMqsracQlbr/NkVSxkxUZC",
    createdAt: "2024-04-03T19:53:23.558+00:00",
    updatedAt: "2025-04-25T19:25:56.293+00:00",
    __v: 0,
    city: "Kaposvár",
    phone: "+36303068676",
    secret: "279473",
    zip: "7400",
    stripeSubscription: "",
    address1: "cs_test_b1iAKhf1QoDBOpzEsnB11JfNlRfVEps73CZvlR7TKcbiIXOwVkeUyYDsxk",
    checkoutSession:
      "cs_test_b1iAKhf1QoDBOpzEsnB11JfNlRfVEps73CZvlR7TKcbiIXOwVkeUyYDsxk",
    address2: "",
    address1: "Egyenesi út. 101.",
  };

  const emlekadatlap = await getEmlekadatlap("0001001");
  const fixedCurrentData = emlekadatlap?.data?.Emlekadatlap || null;

  const tribute = await getTributes("0001001");
  const fixedCurrentTributes = tribute?.data?.Tribute || null;

  const allittjartam = await getAllIttjartam("0001001");

  const session = await getServerSession()
  const userData = await getUserData(session?.user?.email)

  return (
    <section className="relative w-full px-4 bg-neutral-50">
      <div className="relative overflow-hidden">
        <div className="absolute lg:top-0 top-60 lg:left-[20vw] left-0 w-52 h-52 opacity-25 ">
          <Arrow />
        </div>
        <div className="lg:flex hidden absolute top-72 lg:left-[40vw] left-[30vw] w-52 h-52 opacity-25">
          <Camel />
        </div>
        <div className="absolute lg:top-12 -top-16 lg:right-[20vw] -right-6 w-52 h-52 opacity-25">
          <Hearth />
        </div>
        <div className="relative flex flex-col gap-4 lg:py-40 py-20">
          <H1 classname={"text-center self-center text-[--rose]"}>
            Készíts egyedi emlékoldalt
          </H1>
          <Paragraph
            classname={
              "text-center self-center p-4 bg-[--blue-15] lg:w-1/2 w-full rounded-lg "
            }
          >
            Keltsd életre szeretteid emlékét egy{" "}
            <b>
              <b>gyönyörű, színes, nosztalgiadús</b>
            </b>{" "}
            emlékoldallal és őrizd meg az utókornak!
          </Paragraph>
        </div>
      </div>

      <div className="flex flex-nowrap">
        <div className="container flex flex-col m-auto gap-8">
          <H3 classname={"text-center text-[--rose]"}>
            Nézd meg milyen egy kész emlékoldal:
          </H3>
          <div className="relative group group-hover:p-4">
            <CoverPicture
              data={fixedCurrentData}
              currentuser={fixedCurrentUser}
              cursor={true}
              free={false}
            />
          </div>

          <div
            id="profile-data"
            className="relative group flex flex-col xl:flex-row gap-8 xl:gap-20 items-center w-full"
          >
            <ProfilePicture
              session={fixedSession}
              data={fixedCurrentData}
              cursor={true}
              free={false}
              allittjartam={allittjartam}
              peldaoldal={true}
            />
            <ProfileData
              session={fixedSession}
              data={fixedCurrentData}
              cursor={true}
            />
          </div>
          <div className="group">
            <ProfileInfo
              session={fixedSession}
              data={fixedCurrentData}
              tributes={fixedCurrentTributes}
              cursor={true}
              free={false}
              peldaoldal={true}
            />
          </div>
        </div>
      </div>

      <section className="w-full py-20">
        <div className="relative flex flex-col gap-8 lg:py-20 py-8">
          <H2 classname={"text-center self-center text-[--rose] lg:w-1/2 w-full"}>
            Ne hagyd hogy feledésbe merüljenek szeretteid legszebb pillanatai!
          </H2>
          <Paragraph
            classname={
              "text-center self-center lg:w-1/2 w-full"
            }
          >
            Van olyan szeretted akinek szívesen elmesélnéd a történetét? Hozd létre saját, egyedi emlék-univerzumát! Élettörténetek, képek, közös pillanatok mind egy helyen. Oszd meg másokkal és éljétek át együtt újra a legszebb pillanatokat, megőrizve a következő generáció számára is.
          </Paragraph>
        </div>
      </section>

      <section className="w-full lg:py-20 py-8 bg-white">
        <div className="flex lg:flex-row flex-col gap-8 container m-auto ">
          <div className="flex flex-col bg-[--cream] gap-8 items-center rounded-3xl  lg:w-1/2 w-full">
            <div className="relative lg:w-1/2 w-full h-[40vh]">
              <Image
                src="/miazemlekerme.webp"
                fill
                alt="Tökélete ajándék"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <div className="flex flex-col justify-center items-center lg:gap-8 gap-4 w-full p-8 ">
              <H2 classname={"text-[--rose] text-center"}>
                Próbáld ki ingyen!
              </H2>
              <Paragraph classname={"text-center"}>
                Próbáld ki ingyen az emlékoldalt számos funkcióval és ha megtetszett és szeretnéd bővíteni, bármikor átválthatsz EmlékQR+ csomagra! 
              </Paragraph>
            </div>

            <div className="flex flex-col w-full pb-8">
              <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
                <TbCheck className="w-6 h-6 text-[--success]" />{" "}
                <Label>Nyilvános emlékoldal</Label>
              </div>

              <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
                <TbCheck className="w-6 h-6 text-[--success]" />{" "}
                <Label>Profilkép</Label>
              </div>

              <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
                <TbCheck className="w-6 h-6 text-[--success]" />{" "}
                <Label>Borítókép</Label>
              </div>

              <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
                <TbCheck className="w-6 h-6 text-[--success]" />{" "}
                <Label>Személyes adatok</Label>
              </div>

              <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
                <TbX className="w-6 h-6 text-[--error]" />{" "}
                <Label classname={"text-[--error]"}>
                  Minőségi QR kódos emlékérme
                </Label>
              </div>

              <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white py-2 mx-4">
                <TbX className="w-6 h-6 text-[--error]" />{" "}
                <Label classname={"text-[--error]"}>
                  Nyughely megjelölése térképen
                </Label>
              </div>

              <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px] mx-4">
                <Label classname={"text-[--error]"}>Max. 1 db történet</Label>
              </div>

              <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px] mx-4">
                <Label classname={"text-[--error]"}>
                  Max. 2 db kép/történet
                </Label>
              </div>

              <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px] mx-4">
                <Label classname={"text-[--error]"}>
                  Max. 2 db kép a médiába
                </Label>
              </div>

              <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white min-h-[41px] mx-4">
                <TbX className="w-6 h-6 text-[--error]" />{" "}
                <Label classname={"text-[--error]"}>Hozzászólások</Label>
              </div>

              <div className="flex flex-nowrap justify-center gap-2 items-center py-2 mx-4">
                <Label classname={"text-[--error]"}>
                  Új funkciók korlátozottan
                </Label>
              </div>

              <Link
                href="/ingyenes-emlekoldal-keszites"
                className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 mt-4 rounded-full bg-white hover:bg-opacity-75 transition-all text-[--rose] font-semibold w-fit self-center"
              >
                Emlékoldal készítés
              </Link>
            </div>
          </div>

          <div className="flex flex-col bg-gradient-to-br from-[--rose] to-[--blue] gap-8 items-center rounded-3xl lg:w-1/2 w-full">
            <div className="relative w-full h-[40vh] overflow-hidden rounded-3xl">
              <Image
                src="/image-kepek/erme-kezben.webp"
                fill
                alt="Érme kézben"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div className="flex flex-col justify-center items-center lg:gap-8 gap-4 w-full p-8">
              <H2 classname={"text-white text-center"}>Tedd teljessé!</H2>
              <Paragraph classname={"text-white text-center"}>
                Ha szeretnél az emlékoldalon korlátlan tartalmat és minden funkciót használni, továbbá szeretnéd összekötni az emlékhellyel is, válaszd az EmlékQR+ csomagot és rendelj egy érmét
              </Paragraph>
            </div>
            <div className="flex flex-col w-full pb-8">
                <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />
                  <Label classname={"text-white"}>Nyilvános emlékoldal</Label>
                </div>

                <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />
                  <Label classname={"text-white"}>Profilkép</Label>
                </div>

                <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />
                  <Label classname={"text-white"}>Borítókép</Label>
                </div>

                <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />
                  <Label classname={"text-white"}>Személyes adatok</Label>
                </div>

                <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />{" "}
                  <Label classname={"text-white"}>
                    Minőségi QR kódos emlékérme
                  </Label>
                </div>

                <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 py-2 mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />
                  <Label classname={"text-white"}>
                    Nyughely megjelölése térképen
                  </Label>
                </div>

                <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px] mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />
                  <Label classname={"text-white"}>Korlátlan történet</Label>
                </div>

                <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px] mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />
                  <Label classname={"text-white"}>Korlátlan kép/történet</Label>
                </div>

                <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px] mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />
                  <Label classname={"text-white"}>
                    Képek videók korlátlanul a médiában
                  </Label>
                </div>

                <div className="flex flex-nowrap justify-center gap-2 items-center border-b border-white border-opacity-25 min-h-[41px] mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />
                  <Label classname={"text-white"}>Hozzászólások</Label>
                </div>

                <div className="flex flex-nowrap justify-center gap-2 items-center py-2 mx-4">
                  <TbCheck className="w-6 h-6 text-[--success]" />
                  <Label classname={"text-white"}>Minden funkció</Label>
                </div>

                <Link
                  href="#emlekerme"
                  className="flex flex-nowrap items-center justify-center gap-4 py-1 px-4 lg:py-2 lg:px-4 mt-4 rounded-full bg-white hover:bg-opacity-75 font-semibold transition-all text-[--rose] h-fit self-center"
                >
                  <Image
                    src="/emlekqr-plus-color.svg"
                    alt="EmlékQR Plusz"
                    title="Válts EmlékQR Plusz-ra"
                    width={50}
                    height={50}
                    className="w-6 h-auto"
                  />
                  Érme rendelés
                </Link>

                
              </div>
          </div>
        </div>
      </section>
      <VideosVelemenyek />
      <MiAzEmlekerme session={session} userdata={userData} />
    </section>
  );
}