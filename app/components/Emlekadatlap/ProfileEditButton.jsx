"use client";

import {
  TbEdit,
  TbUserCheck,
  TbTrash,
  TbArrowBadgeRightFilled,
  TbArrowBadgeDownFilled,
  TbQrcode,
  TbEye,
  TbEyeClosed,
  TbInfoCircle,
  TbQuestionMark,
} from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Context } from "../../Context";
import Modal from "../UI/Modal";
import { useRouter } from "next/navigation";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import { motion } from "framer-motion";
import Loading from "../UI/Loading";
import { toast } from "sonner";
import Label from "../UI/Label";
import Image from "next/image";
import Link from "next/link";
import AuthNoRedirect from "../AuthNoRedirect";
import Paragraph from "../UI/Paragraph";

export default function ProfileEditButton({
  session,
  user,
  data,
  free,
  existingadatlapok,
}) {
  const router = useRouter();

  const { isEditable, setEditable, openPopup, togglePopup } =
    useContext(Context);
  const { formData, updateFormData, selectedImages } = useContext(
    UpdateEmlekadatlapContext
  );

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [randomSuffix, setRandomSuffix] = useState();
  const [authenticated, setAuthenticated] = useState(!!session);

  // csak vizuális overlayhez
  const [overlayText, setOverlayText] = useState("Feltöltés...");

  useEffect(() => {
    if (session) setAuthenticated(true);
  }, [session]);

  useEffect(() => {
    const r = Math.floor(1000000 + Math.random() * 9000000);
    setRandomSuffix(r);
  }, []);

  // DB -> formData betöltés, public boolean-ként (ha nincs: true)
  useEffect(() => {
    if (!data) return;

    updateFormData("uri", data.uri || "");
    updateFormData("name", data.name || "");
    updateFormData("age", data.age || "");
    updateFormData("graveyard", data.graveyard || "");
    updateFormData("bio", data.bio || "");
    updateFormData("story", data.story || []);
    updateFormData("media", data.media || {});
    updateFormData("tributes", data.tributes || "");
    updateFormData("profileimage", data.profileimage || "");
    updateFormData("coverimage", data.coverimage || "");
    updateFormData("owner", data.owner || "");
    updateFormData("coowner", data.coowner || "");
    updateFormData("born", data.born || "");
    updateFormData("died", data.died || "");
    updateFormData("quote", data.quote || "");
    updateFormData(
      "public",
      typeof data.public === "boolean" ? data.public : true
    );
  }, [data]);

  // free módban cseréli a "free/" prefixet user-email-randomra
  const replaceFreeWithSessionEmail = (obj, sessionEmail, rnd) => {
    if (typeof obj === "string") {
      if (
        obj.includes("https://elmekqr-storage.s3.amazonaws.com/free/") ||
        obj.includes("free/")
      ) {
        return obj.replace("free/", `${sessionEmail}-${rnd}/`);
      }
    } else if (Array.isArray(obj)) {
      return obj.map((item) =>
        replaceFreeWithSessionEmail(item, sessionEmail, rnd)
      );
    } else if (typeof obj === "object" && obj !== null) {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [
          k,
          replaceFreeWithSessionEmail(v, sessionEmail, rnd),
        ])
      );
    }
    // fontos: boolean, number, null visszaadása érintetlenül
    return obj;
  };

  // Feltöltés: Promise.all — nincs reload, nincs számláló versenyhelyzet
  const uploadImages = async (images) => {
    if (!images?.length) return;
    setUploading(true);
    setOverlayText("Feltöltés...");

    try {
      await Promise.all(
        images.map(async (image) => {
          const fileData = image.file;
          const body = new FormData();
          body.append("file", fileData);
          body.append("filePath", image.path);
          body.append("fileName", fileData.name);

          const res = await fetch("/api/s3-upload", { method: "POST", body });
          if (!res.ok) throw new Error(`S3 upload failed: ${fileData.name}`);
        })
      );
      toast.success("Kép(ek) sikeresen feltöltve.");
    } finally {
      setUploading(false);
    }
  };

  // Láthatóság dropdown
  const handleVisibilityChange = (e) => {
    const selectedValue = e.target.value; // "public" vagy "private"
    const isPublic = selectedValue === "public"; // konvertáljuk booleanra
    updateFormData("public", isPublic);
  };


  const handleSubmit = async () => {
    setSaving(true);
    setOverlayText("Mentés...");

    const freshSession = await getSession();

    const apiUrl = free ? "/api/emlekadatlap" : "/api/updateadatlap";
    // induljunk a formData-ból (ami tartalmazza a friss public-ot is)
    let updatedData = formData;

    // a feltöltési lista egy pillanatfelvétele — ne a context hosszát figyeljük később
    let imagesToUpload = [...(selectedImages || [])];

    if (free && freshSession) {
      const sessionEmail = freshSession.user.email;

      // képfájlok pathjának cseréje a feltöltéshez
      imagesToUpload = imagesToUpload.map((image) => ({
        ...image,
        path: replaceFreeWithSessionEmail(
          image.path,
          sessionEmail,
          randomSuffix
        ),
      }));

      // teljes form adat cseréje a free-ből
      updatedData = {
        ...replaceFreeWithSessionEmail(formData, sessionEmail, randomSuffix),
        owner: sessionEmail,
        uri: `${sessionEmail}-${randomSuffix}`,
        paymentMethod: "free",
        paymentStatus: "free",
      };
    }

    try {
      // 1) DB update
      const res = await fetch(apiUrl, {
        method: free ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: free
          ? JSON.stringify({ updatedData })
          : JSON.stringify({ formData: updatedData }),
      });
      if (!res.ok) throw new Error("Error submitting data");

      // 2) képfeltöltés (ha van)
      if (imagesToUpload.length > 0) {
        await uploadImages(imagesToUpload);
      }

      setEditable(false);

      // 3) végén navigáció / refresh
      if (free && session?.user?.email) {
        // tájékoztató email (elhagyható ha nincs rá szükség)
        await fetch("/api/email/ingyenesAdatlap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: updatedData.name,
            email: session.user.email,
            uri: updatedData.uri,
            date: new Date().toLocaleString("hu-HU"),
            isFree: true,
          }),
        }).catch(() => {});
      }

      // egyszerű és megbízható: friss oldal betöltés
      router.push(
        free
          ? `/emlekadatlapok/${freshSession.user.email}-${randomSuffix}`
          : `/emlekadatlapok/${data.uri}`
      );
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Hiba történt az adatok mentése közben.");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <>
      <Modal
        openstate={openPopup === "PublicInfo"}
        onClose={() => {
          togglePopup(null);
        }}
      >
        <div className="flex flex-col gap-8">
          <Paragraph>A "Publikus" azt jelenti, hogy a weboldalon keresztül vagy az érme beszkennelésével is bárki rátalálhat az emlékoldalra. </Paragraph>
          <Paragraph>A "Privát" azt jelenti, hogy csak az emlékérmét beszkennelve található meg az emlékoldal. Így te döntheted el, hogy csak magadnak szeretnél egy kis időkapszulát, vagy kiteszed az érmét az emlékhelyre és másoknak is elérhetővé teszed. </Paragraph>
        </div>
      </Modal>

      <Modal
        openstate={openPopup === "AuthNoRedirect"}
        onClose={() => {
          togglePopup(null);
        }}
      >
        <AuthNoRedirect setAuthenticated={setAuthenticated} />
      </Modal>

      <Modal
        openstate={openPopup === "Connect"}
        onClose={() => {
          togglePopup(null);
        }}
      >
        <div className="flex flex-col gap-8">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div className="relative flex flex-col gap-2 items-center justify-between bg-[--cream] rounded-xl p-2">
              <Image
                src="/ermek/negyzet-erme.webp"
                width={100}
                height={100}
                alt="Érme"
                className="lg:w-[100px] w-[75px] h-auto"
              />
              <h3 className="text-xl text-center font-semibold tracking-tight text-[--rose]">
                Vásárolj egy érmét
              </h3>
              <TbArrowBadgeRightFilled className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 min-w-12 h-auto text-[--blue] z-10" />
              <TbArrowBadgeDownFilled className="block lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 min-w-12 h-auto text-[--blue] z-10" />
            </div>
            <div className="relative flex flex-col gap-2 items-center justify-between bg-[--cream] rounded-xl p-2">
              <Image
                src="/scan.webp"
                width={100}
                height={100}
                alt="Érme"
                className="lg:w-[100px] w-[75px] h-auto"
              />
              <h3 className="text-xl text-center font-semibold tracking-tight text-[--rose]">
                Olvasd be
              </h3>
              <TbArrowBadgeRightFilled className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 min-w-12 h-auto text-[--blue] z-10" />
              <TbArrowBadgeDownFilled className="block lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 min-w-12 h-auto text-[--blue] z-10" />
            </div>
            <div className="flex flex-col gap-2 items-center justify-between bg-[--cream] rounded-xl p-2">
              <Image
                src="/ermek/negyzet-erme.webp"
                width={100}
                height={100}
                alt="Érme"
                className="lg:w-[100px] w-[75px] h-auto"
              />
              <h3 className="text-xl text-center font-semibold tracking-tight text-[--rose]">
                Kapcsold össze
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Label>
              <b>1. lépés:</b> Vásárolj egy érmét!
            </Label>
            <Label>
              <b>2. lépés:</b> A telefonod kamerájával olvasd be a QR kódot…
            </Label>
            <Label>
              <b>3. lépés:</b> …
            </Label>
            <div className="flex lg:flex-row flex-col gap-4 self-center">
              <Link
                href="/erme"
                className="flex flex-nowrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-[--rose] to-[--blue] hover:bg-gradient-to-r hover:from-[--rose] hover:to-[--blue] transition-all text-white"
              >
                <TbQrcode className="w-6 h-6" />
                <span>Érme rendelés</span>
              </Link>
            </div>
          </div>
        </div>
      </Modal>

      {(session && user && !isEditable && data && user.email === data.owner) ||
      (free && !isEditable) ? (
        <div className="fixed left-0 bottom-0 flex flex-col justify-center w-full py-4 bg-white shadow-[0px_15px_50px_rgba(0,0,0,0.25)] z-50">
          <div className="flex lg:flex-row flex-col gap-4 w-fit self-center">
            <button
              className={`m-auto flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-[--rose] hover:bg-[--blue] rounded-full transition-all`}
              onClick={() => setEditable(true)}
            >
              <TbEdit className="w-6 h-auto" />
              <p>Emlékoldal szerkesztése</p>
            </button>

            {Array.isArray(existingadatlapok) &&
              existingadatlapok.length > 0 &&
              data.paymentStatus !== "free" &&
              user.secret && (
                <button
                  className={`m-auto flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-[--rose] hover:bg-[--blue] rounded-full transition-all`}
                  onClick={() => {
                    togglePopup("freeChecker");
                  }}
                >
                  <TbEdit className="w-6 h-auto" />
                  <p>Összekapcsolás érmével</p>
                </button>
              )}

            {data?.paymentStatus === "free" && (
              <button
                className={`m-auto flex flex-row items-center justify-center gap-4 text-[--blue] underline hover:text-[--blue-hover]`}
                onClick={() => {
                  togglePopup("Connect");
                }}
              >
                <p>Hogy kapcsolom össze az érmével?</p>
              </button>
            )}
          </div>
        </div>
      ) : null}

      {isEditable && (
        <>
          <div className="fixed left-0 bottom-0 flex flex-col lg:flex-row gap-3 lg:gap-4 lg:justify-between justify-center items-center w-full py-4 px-4 bg-white shadow-[0px_15px_50px_rgba(0,0,0,0.25)] z-50 border-t shadow-special">
            {/* Láthatóság dropdown – mindig a DB-ből töltött formData.public tükröződik */}
            <div className="flex items-center gap-2">
              <Paragraph htmlFor="visibility" classname={""}>
                Láthatóság:
              </Paragraph>
              <select
                id="visibility"
                value={formData.public ? "public" : "private"}
                onChange={handleVisibilityChange}
                className="shadow-2xl transition-all"
              >
                <option value="public" className="flex flex-nowrap gap-1">Publikus</option>
                <option value="private" className="flex flex-nowrap gap-1">Privát</option>
              </select>
              <TbQuestionMark className="w-5 h-auto border border-[--blue] rounded-full p-1" onClick={() => {
                    togglePopup("PublicInfo");
                  }} />
            </div>

            <div className="flex flex-row gap-4">
              <button
                className="flex flex-row items-center justify-center gap-4 text-white py-3 px-8 bg-red-500 hover:bg-[--blue] shadow-2xl rounded-full transition-all"
                onClick={() => {
                  setEditable(false);
                  router.refresh();
                }}
                disabled={uploading || saving}
              >
                <TbTrash className="w-4 h-auto" />
                <p className="label">Mégse</p>
              </button>
              <button
                className="flex flex-row items-center justify-center gap-4 text-white py-3 px-8 bg-green-500 hover:bg-[--blue] shadow-2xl rounded-full transition-all"
                onClick={
                  authenticated
                    ? handleSubmit
                    : () => togglePopup("AuthNoRedirect")
                }
                disabled={uploading || saving}
              >
                <TbUserCheck className="w-4 h-auto" />
                <p className="label">
                  {uploading || saving ? "Feldolgozás..." : "Mentés"}
                </p>
              </button>
            </div>
          </div>
        </>
      )}

      <motion.section
        className={`${
          uploading || saving ? "fixed" : "hidden"
        } top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center backdrop-brightness-[100%] z-50`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, type: "ease-in-out" }}
      >
        <div className="fixed top-0 left-0 w-full h-full bg-[--cream-25]"></div>
        <Loading text={overlayText} />
      </motion.section>
    </>
  );
}
