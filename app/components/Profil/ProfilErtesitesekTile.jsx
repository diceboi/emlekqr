import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For handling navigation programmatically

export default function ProfilErtesitesekTile({ notificationdata }) {
  const router = useRouter();

  const handleViewNotification = async (e) => {
    e.preventDefault(); // Prevent default navigation behavior initially

    try {
      await fetch("/api/updateNotification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adatlap: notificationdata._id,
          viewed: true,
        }),
      });

      // Optionally, update the UI state here or refetch notifications if needed
    } catch (error) {
      console.error("Failed to update notification:", error);
    }

    // Navigate to the link after updating the viewed status
    router.push(`/emlekadatlapok/${notificationdata.adatlap}`);
  };

  return (
    <>
    {notificationdata.notificationtype === "adatlap" && (
        <Link
        href={`/emlekadatlapok/${notificationdata.adatlap}`}
        onClick={handleViewNotification}
        className={`flex flex-auto border rounded-lg p-2 gap-2 transition-all ${
          notificationdata.viewed === false
            ? "bg-[--blue-15] border-[--blue-15] hover:border-[--blue-15] hover:bg-[--blue-50]"
            : "border-[--cream] hover:bg-[--cream]"
        }`}
      >
        <Image
          src="/blank-profile.webp"
          width={50}
          height={50}
          className="w-6 h-6 rounded-full"
          alt="Profile Picture"
        />
        <p className="min-w-fit">
          <span className="font-semibold text-[--rose]">{notificationdata.from}</span> módosításokat végzett az{" "}
          <Link
            href={`/emlekadatlapok/${notificationdata.adatlap}`}
            className={`${
              notificationdata.viewed === false ? "text-black" : "text-[--blue]"
            } underline min-w-fit`}
          >
            {notificationdata.adatlap}
          </Link>{" "}
          azonosítójú adatlapon.
        </p>
      </Link>
    )}

    {notificationdata.notificationtype === "comment" && (
        <Link
        href={`/emlekadatlapok/${notificationdata.adatlap}`}
        onClick={handleViewNotification}
        className={`flex flex-auto border rounded-lg p-2 gap-2 transition-all ${
          notificationdata.viewed === false
            ? "bg-[--blue] border-[--blue] hover:border-[--blue-hover] text-white hover:bg-[--blue-hover]"
            : "border-[--cream] hover:bg-[--cream]"
        }`}
      >
        <Image
          src="/blank-profile.webp"
          width={50}
          height={50}
          className="w-6 h-6 rounded-full"
          alt="Profile Picture"
        />
        <p className="min-w-fit">
          <span className="font-semibold text-[--rose]">{notificationdata.from}</span> hozzászólt az{" "}
          <Link
            href={`/emlekadatlapok/${notificationdata.adatlap}`}
            className={`${
              notificationdata.viewed === false ? "text-black" : "text-[--blue]"
            } underline min-w-fit`}
          >
            {notificationdata.adatlap}
          </Link>{" "}
          azonosítójú adatlapodhoz.
        </p>
      </Link>
    )}
    </>
  );
}
