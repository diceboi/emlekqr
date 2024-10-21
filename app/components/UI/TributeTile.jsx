"use client"

import { useContext } from "react";
import { Context } from "../../Context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TributeTile({ tribute, owner, session }) {

    const { isEditable } = useContext(Context);

    const router = useRouter()

    const handleApprove = async () => {
      const formData = {
        _id: tribute._id,
        verified: true,
        deleted: false,
      };

      try {
        const response = await fetch('/api/updateComment', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log('Tribute approved successfully:', result);
          toast.success('Komment sikeresen megerősítve.');
          router.refresh();
        } else {
          console.error('Failed to approve tribute:', result.message);
        }
      } catch (error) {
        console.error('Error approving tribute:', error);
      }
    };

    const handleDeny = async () => {
      const formData = {
        _id: tribute._id,
        verified: false,
        deleted: true,
      };

      try {
        const response = await fetch('/api/updateComment', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ formData }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log('Tribute deleted successfully:', result);
          toast.success('Komment sikeresen törölve.');
          router.refresh();
        } else {
          console.error('Failed to delete tribute:', result.message);
        }
      } catch (error) {
        console.error('Error deleting tribute:', error);
      }
    };

    // Check if session exists and set a default if not
    const isOwner = session?.user?.email === owner;

    return (
      <div className={`relative ${
          !isOwner || tribute.verified === false || tribute.deleted === true
          ? "hidden"
          : "flex"
        } flex-col lg:p-8 p-4 lg:gap-8 gap-4 bg-white rounded-2xl shadow-special my-4`}
      >
        <div className={`flex flex-col lg:gap-8 gap-4 ${tribute.verified === false ? "opacity-50" : "opacity-100"}`}>
          <h4>{tribute.from}</h4>
          <p>{tribute.message}</p>
          {tribute.verified === false && (
            <p className="absolute top-2 right-3 text-sm text-[--blue]">Jóváhagyásra vár</p>
          )}
        </div>
        {tribute.verified === false && isEditable && (
          <div className="flex flex-nowrap gap-2 z-10">
            <button 
              className="bg-[--success] px-2 py-1 rounded-full text-white"
              onClick={handleApprove}
            >
              Jóváhagy
            </button>
            <button 
              className="bg-[--error] px-2 py-1 rounded-full text-white"
              onClick={handleDeny}
            >
              Elvetés
            </button>
          </div>
        )}
      </div>
    );
}
