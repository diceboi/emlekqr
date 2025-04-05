"use client";

import { TbEdit, TbUserCheck, TbTrash, TbArrowBadgeRightFilled, TbArrowBadgeDownFilled, TbQrcode, TbQuestionMark } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Context } from "../../Context";
import Modal from "../UI/Modal";
import { useRouter } from "next/navigation";
import { UpdateEmlekadatlapContext } from "../../UpdateEmlekadatlapContext";
import EXIF from "exif-js";
import { motion } from "framer-motion";
import Loading from "../UI/Loading";
import { toast } from "sonner";
import H1 from "../UI/H1";
import H2 from "../UI/H2";
import H3 from "../UI/H3";
import H4 from "../UI/H4";
import Paragraph from "../UI/Paragraph";
import Label from "../UI/Label";
import Image from "next/image";
import Link from "next/link";
import AuthNoRedirect from "../AuthNoRedirect"

export default function ProfileEditButton({ session, user, data, free, existingadatlapok }) {
  const router = useRouter();

  const { isEditable, setEditable, openPopup, togglePopup } = useContext(Context);
  const { formData, updateFormData, selectedImages } = useContext(
    UpdateEmlekadatlapContext
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadCount, setUploadCount] = useState(0); // Track uploaded images
  const [originalData, setOriginalData] = useState({});
  const [randomSuffix, setRandomSuffix] = useState();
  const [authenticated, setAuthenticated] = useState(!!session);

  useEffect(() => {
    if (session) {
      setAuthenticated(true);
    }
  }, [session]);

  useEffect(() => {
    const randomSuffix = Math.floor(1000000 + Math.random() * 9000000);
    setRandomSuffix(randomSuffix);
  }, []);  

  useEffect(() => {
    if (data) {
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

      setOriginalData(data);
    }
  }, [data]);

  // Function to detect changes in the formData and prepare a notification
  const detectChangesAndNotify = async () => {
    const changes = [];
    let updatedImages = [];
    let updatedVideos = [];

    // Check for changes in specific fields (example: name, bio, etc.)
    if (formData.name !== originalData.name) {
      changes.push({ field: "Név", newValue: formData.name });
    }
    if (formData.bio !== originalData.bio) {
      changes.push({ field: "Adatok", newValue: formData.bio });
    }
    if (formData.story !== originalData.story) {
      changes.push({ field: "Story", newValue: formData.story });
    }
    if (formData.media !== originalData.media) {
      changes.push({ field: "Média", newValue: formData.media });
    }
    if (formData.tributes !== originalData.tributes) {
      changes.push({
        field: "Tiszteletnyilvánítás",
        newValue: formData.tributes,
      });
    }
    if (formData.profileimage !== originalData.profileimage) {
      changes.push({ field: "Profilkép", newValue: formData.profileimage });
    }
    if (formData.coverimage !== originalData.coverimage) {
      changes.push({ field: "Borítókép", newValue: formData.coverimage });
    }
    if (formData.quote !== originalData.quote) {
      changes.push({ field: "Idézet", newValue: formData.quote });
    }

    // Compare media images
    if (
      JSON.stringify(formData.media.images) !==
      JSON.stringify(originalData.media.images)
    ) {
      updatedImages = formData.media.images.filter(
        (img) => !originalData.media.images.includes(img)
      );
      changes.push({ field: "Média > Képek", newValue: updatedImages });
    }

    // Compare media videos
    if (
      JSON.stringify(formData.media.videos) !==
      JSON.stringify(originalData.media.videos)
    ) {
      updatedVideos = formData.media.videos.filter(
        (video) => !originalData.media.videos.includes(video)
      );
      changes.push({ field: "Média > Videók", newValue: updatedVideos });
    }

    // Compare story images
    formData.story.forEach((story, index) => {
      if (
        JSON.stringify(story.images) !==
        JSON.stringify(originalData.story[index]?.images || [])
      ) {
        const updatedStoryImages = story.images.filter(
          (img) => !originalData.story[index]?.images?.includes(img)
        );
        updatedImages = [...updatedImages, ...updatedStoryImages]; // Add to updated images array
        changes.push({
          field: `Story képek ${story.year}`,
          newValue: updatedStoryImages,
        });
      }
    });

    // If there are changes, send a notification
    if (changes.length > 0) {
      const notificationPayload = {
        personal: false,
        viewed: false,
        notificationtype: "adatlap",
        adatlap: data.uri,
        from: session.user.name, // The user making the change
        message: `${changes.map((change) => change.field).join(", ")}`, // Summary of changes
        images: updatedImages, // If any images were changed, you could add their references here
        videos: updatedVideos, // Same for videos if applicable
      };

      await fetch("/api/addNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationPayload),
      }).then((res) => {
        if (res.ok) {
          console.log("Notification sent successfully");
        } else {
          console.error("Failed to send notification");
        }
      });
    }
  };

  // free módban kicseréli a feltöltendő fájlok mappaneveit a user emailcímére
  const replaceFreeWithSessionEmail = (obj, sessionEmail, randomSuffix) => {

    if (typeof obj === "string") {
      if (
        obj.includes("https://elmekqr-storage.s3.amazonaws.com/free/") ||
        "free/"
      ) {
        return obj.replace("free/", `${sessionEmail}-${randomSuffix}/`);
      }
    } else if (Array.isArray(obj)) {
      return obj.map((item) =>
        replaceFreeWithSessionEmail(item, sessionEmail, randomSuffix)
      );
    } else if (typeof obj === "object" && obj !== null) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key,
          replaceFreeWithSessionEmail(value, sessionEmail, randomSuffix),
        ])
      );
    }
    return obj;
  };

  //Képfeltöltés funckió
  const uploadImages = async (images) => {
    if (images.length === 0) return;

    setUploading(true);
    setUploadCount(0);

    for (const image of images) {
      const fileData = image.file;

      console.log("Uploading image:", fileData.name, "Path:", image.path); // Itt ellenőrizzük

      const formData = new FormData();
      formData.append("file", fileData);
      formData.append("filePath", image.path);
      formData.append("fileName", fileData.name);

      try {
        const s3Upload = await fetch("/api/s3-upload", {
          method: "POST",
          body: formData,
        });

        if (s3Upload.ok) {
          console.log("Image uploaded successfully:", fileData.name);
          setUploadCount((prevCount) => prevCount + 1);
          toast.success("Kép(ek) sikeresen feltöltve.");
        } else {
          console.log("Error uploading image:", fileData.name);
          toast.error("Hiba történt a kép feltöltése közben.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Hiba történt a kép feltöltése közben.");
      }
    }
    setUploading(false);
  };

  const handleSubmit = async () => {
    setSaving(true);

    const freshSession = await getSession();

    const apiUrl = free ? "/api/emlekadatlap" : "/api/updateadatlap";
    let updatedData = formData;
    let updatedSelectedImages = [...selectedImages]; // Kezdeti állapot másolása

    if (free && freshSession) {
      const sessionEmail = freshSession.user.email;

      // Frissítjük a selectedImages tömböt is, hogy az új elérési útvonalakat használja
      updatedSelectedImages = selectedImages.map((image) => ({
        ...image,
        path: replaceFreeWithSessionEmail(image.path, sessionEmail, randomSuffix), // Kicseréljük az útvonalat
      }));

      updatedData = {
        ...replaceFreeWithSessionEmail(formData, sessionEmail, randomSuffix),
        owner: sessionEmail,
        uri: `${sessionEmail}-${randomSuffix}`,
        paymentMethod: "free",
        paymentStatus: "free",
      };
    }

    try {
      const response = await fetch(apiUrl, {
        method: free ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: free
          ? JSON.stringify({ updatedData }) // POST kéréshez csomagolunk
          : JSON.stringify({ formData: updatedData }), // PUT kéréshez csomagolunk
      });

      if (!response.ok) {
        throw new Error("Error submitting data");
      }

      setEditable(false);

      if (!free) {
        await detectChangesAndNotify();
      }

      // Most már biztosan a frissített selectedImages-t használja!
      await uploadImages(updatedSelectedImages);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Hiba történt az adatok mentése közben.");
    } finally {
      setSaving(false);
      router.push(free ? `/emlekadatlapok/${freshSession.user.email}-${randomSuffix}` : `/emlekadatlapok/${data.uri}`);
    }
  };

  useEffect(() => {
    // If all images are uploaded, reload the page
    if (uploading && uploadCount === selectedImages.length) {
      setUploading(false);
      window.location.reload(); // Reload after all uploads are done
    }
  }, [uploadCount, selectedImages.length, uploading]);

  return (
    <>
    <Modal openstate={openPopup === "AuthNoRedirect"} onClose={() => {togglePopup(null)}}>
      <AuthNoRedirect setAuthenticated={setAuthenticated} />
    </Modal>
    <Modal openstate={openPopup === "Connect"} onClose={() => {togglePopup(null)}}>
          <div className="flex flex-col gap-8">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              <div className="relative flex flex-col gap-2 items-center justify-between bg-[--cream] rounded-xl p-2">
                <Image src="/ermek/negyzet-erme.webp" width={100} height={100} alt="Érme" className="lg:w-[100px] w-[75px] h-auto"/>
                <h3 className="text-xl text-center font-semibold tracking-tight text-[--rose]">Vásárolj egy érmét</h3>
                <TbArrowBadgeRightFilled className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 min-w-12 h-auto text-[--blue] z-10"/>
                <TbArrowBadgeDownFilled className="block lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 min-w-12 h-auto text-[--blue] z-10"/>
              </div>
              <div className="relative flex flex-col gap-2 items-center justify-between bg-[--cream] rounded-xl p-2">
                <Image src="/image-kepek/scan.webp" width={100} height={100} alt="Érme" className="lg:w-[100px] w-[75px] h-auto"/>
                <h3 className="text-xl text-center font-semibold tracking-tight text-[--rose]">Olvasd be</h3>
                <TbArrowBadgeRightFilled className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 min-w-12 h-auto text-[--blue] z-10"/>
                <TbArrowBadgeDownFilled className="block lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 min-w-12 h-auto text-[--blue] z-10"/>
              </div>
              <div className="flex flex-col gap-2 items-center justify-between bg-[--cream] rounded-xl p-2">
                <Image src="/ermek/negyzet-erme.webp" width={100} height={100} alt="Érme" className="lg:w-[100px] w-[75px] h-auto"/>
                <h3 className="text-xl text-center font-semibold tracking-tight text-[--rose]">Kapcsold össze</h3>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Label><b>1. lépés:</b> Vásárolj egy érmét!</Label>
              <Label><b>2. lépés:</b> A telefonod kamerájával olvasd be a QR kódot. (Ha régebbi telefonod van, akkor tölts le egy QR kód olvasó alkalmazást.)</Label>
              <Label><b>3. lépés:</b> Miután megnyitottad a QR kódon található oldalt, írd be a 6 számjegyű kódot amit email-ben kaptál vásárlás után. Ha az ellenőrzés sikeres, kattints at "összekapcsolás érmével" gombra, majd válaszd ki melyik ingyenes adatlapodat szeretnéd összekötni az érmével, vagy kezdj el szerkeszteni egy teljesen új adatlapot.</Label>
              <div className="flex lg:flex-row flex-col gap-4 self-center">
              <Link 
                  href="/erme" 
                  className="flex flex-nowrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-[--rose] to-[--blue] hover:bg-gradient-to-r hover:from-[--rose] hover:to-[--blue] transition-all text-white">
                      <TbQrcode 
                          className="w-6 h-6"
                      />
                      <span >
                        Érme rendelés
                      </span>
              </Link>
              </div>
              
            </div>
          </div>
      </Modal>

      {(session && user && !isEditable && data && user.email === data.owner) ||
      free && !isEditable ? (
        <div className="fixed left-0 bottom-0 flex flex-col justify-center w-full py-4 bg-white shadow-[0px_15px_50px_rgba(0,0,0,0.25)] z-50">
          <div className="flex lg:flex-row flex-col gap-4 w-fit self-center">
            <button
              className={`m-auto flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-[--rose] hover:bg-[--blue] rounded-full transition-all ${
                uploading || saving ? "pointer-events-none" : ""
              }`}
              onClick={() => setEditable(true)}
            >
              <TbEdit className="w-6 h-auto" />
              <p>{saving ? "Mentés..." : "Adatlap szerkesztése"}</p>
            </button>
            {Array.isArray(existingadatlapok) && existingadatlapok.length > 0 && data.paymentStatus !== "free" && user.secret && (
              <button
                className={`m-auto flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-[--rose] hover:bg-[--blue] rounded-full transition-all ${
                  uploading || saving ? "pointer-events-none" : ""
                }`}
                onClick={() => {togglePopup("freeChecker")}}
              >
                <TbEdit className="w-6 h-auto" />
                <p>Összekapcsolás érmével</p>
              </button>
            )}

            {data?.paymentStatus === "free" && (
              <button
                className={`m-auto flex flex-row items-center justify-center gap-4 text-[--blue] underline hover:text-[--blue-hover] ${
                  uploading || saving ? "pointer-events-none" : ""
                }`}
                onClick={() => {togglePopup("Connect")}}
              >
                {/*<TbQuestionMark className="w-6 h-auto" />*/}
                <p>Hogy kapcsolom össze az érmével?</p>
              </button>
            )}
          </div>
        </div>
      ):null}

      {isEditable && (
        <>
          <div className="fixed left-0 bottom-0 flex flex-row gap-4 justify-center w-full py-4 bg-white shadow-[0px_15px_50px_rgba(0,0,0,0.25)] z-50 border-t shadow-special">
            <button
              className="flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-green-500 hover:bg-[--blue] shadow-2xl rounded-full transition-all"
              onClick={authenticated ? handleSubmit : () => togglePopup("AuthNoRedirect")}
            >
              <TbUserCheck className="w-4 h-auto" />
              <p className="label">{uploading ? "Feltöltés..." : "Mentés"}</p>
            </button>
            <button
              className="flex flex-row items-center justify-center gap-4 text-white py-4 px-8 bg-red-500 hover:bg-[--blue] shadow-2xl rounded-full transition-all"
              onClick={() => {
                setEditable(false);
                window.location.reload();
              }}
            >
              <TbTrash className="w-4 h-auto" />
              <p className="label">Mégse</p>
            </button>
          </div>
        </>
      )}

      <motion.section
        className={`${
          uploading ? "fixed" : "hidden"
        } top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center backdrop-brightness-[100%] z-50`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, type: "ease-in-out" }}
      >
        <div className="fixed top-0 left-0 w-full h-full bg-[--cream-25]"></div>
        <Loading text={"Feltöltés..."} />
      </motion.section>
    </>
  );
}
