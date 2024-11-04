"use client";

import { useEffect, useState } from "react";
import { TbBellRinging } from "react-icons/tb";
import ProfilErtesitesekTile from "../Profil/ProfilErtesitesekTile";
import H4 from "../UI/H4";

export default function ProfilErtesitesek({ currentuser, currentdata }) {
  const ownerEmail = currentuser.email;

  // Extract all unique `uri` values
  const uris = [...new Set(currentdata.map((data) => data.uri))];

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(5); // Initial display limit

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      setError(null);

      try {
        const allNotifications = await Promise.all(
          uris.map(async (uri) => {
            const response = await fetch(`/api/getNotification?adatlap=${uri}`);
            if (response.ok) {
              const result = await response.json();
              return result.data.notifications;
            } else {
              return null; // Return null if no notifications for this `uri`
            }
          })
        );

        // Filter out null results and flatten the array
        const validNotifications = allNotifications.filter(Boolean).flat();

        if (validNotifications.length > 0) {
          setNotifications(validNotifications);
        } else {
          setError("No notifications found");
        }
      } catch (err) {
        setError("An error occurred while fetching notifications");
      } finally {
        setLoading(false);
      }
    }

    if (uris.length > 0) {
      fetchNotifications();
    }
  }, [JSON.stringify(uris)]);

  const handleLoadMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 5); // Load 5 more notifications
  };

  return (
    <div className="flex flex-col gap-16 bg-white shadow-special rounded-2xl p-8">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <TbBellRinging className="w-8 h-8 text-[--rose] bg-[--cream] rounded-full p-1" />
          <H4 classname={"text-[--rose]"}>Legutóbbi értesítések</H4>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <p>Értesítések betöltése...</p>
          ) : error ? (
            <p className="">Jelenleg nincsenek értesítéseid. Itt fognak megjelenni a kommentek, az adatlap módosítások stb.</p>
          ) : (
            notifications
              .slice()
              .reverse()
              .slice(0, displayLimit) // Show notifications up to the display limit
              .map((notification, index) => (
                <ProfilErtesitesekTile
                  key={index}
                  notificationdata={notification}
                />
              ))
          )}
        </div>

        {/* Show "Load More" button if there are more notifications to load */}
        {notifications.length > displayLimit && !loading && (
          <button
            onClick={handleLoadMore}
            className="mt-4 self-center px-4 py-2 bg-[--blue] text-white rounded-full hover:bg-[--blue-hover] transition"
          >
            További értesítések betöltése
          </button>
        )}
      </div>
    </div>
  );
}
