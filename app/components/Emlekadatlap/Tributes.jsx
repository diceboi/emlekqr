"use client"

import TributeTile from "../UI/TributeTile";
import MainCommentForm from "../UI/MainCommentForm";
import { useContext, useState } from "react";
import { Context } from "../../Context";
import Modal from "../UI/Modal";
import { TbMessage, TbTrash } from "react-icons/tb";
import H4 from "../UI/H4"
import Paragraph from "../UI/Paragraph"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Tributes({ data, currenttributes, issession, free, peldaoldal }) {  

  const { openPopup, togglePopup } = useContext(Context);
  const router = useRouter();

  const [deleteId, setDeleteId] = useState(null);

  const availableTributes = currenttributes?.filter(
    (tribute) => tribute.verified === true && tribute.deleted !== true
  );

  const openDeleteModal = (commentId) => {
    setDeleteId(commentId);
    togglePopup("DeleteComment");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const formData = {
      _id: deleteId,
      verified: false,
      deleted: true,
    };

    try {
      const response = await fetch('/api/updateComment', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Komment sikeresen törölve.');
        togglePopup(null);
        setDeleteId(null);
        router.refresh();
      } else {
        console.error('Failed to delete tribute:', result.message);
      }
    } catch (error) {
      console.error('Error deleting tribute:', error);
    }
  };

  return (
    <>
      <Modal openstate={openPopup === "DeleteComment"} onClose={() => togglePopup(null)}>
        <div className="flex flex-col items-center gap-4">
          <Paragraph classname={"text-center"}>Biztosan törlöd a kommentet? Ez a lépés visszafordíthatatlan.</Paragraph>
          <button 
            className="flex flex-nowrap gap-2 items-center bg-[--error] hover:bg-[--error-hover] rounded-full transition-all text-white w-fit py-2 px-4"
            onClick={handleDelete}
          >
            <TbTrash className="w-4 h-4 rounded-md text-white cursor-pointer" />
            Véglegesen törlöm
          </button>
        </div>
      </Modal>

      <div className={`flex gap-4 items-center pt-8 pb-4`}>
        <TbMessage className="w-10 h-10 text-[--rose] bg-[--cream] rounded-full p-2" />
        <H4 classname={"text-[--rose]"}>Hozzászólások</H4>
      </div>

      {!issession && !free && availableTributes.map((tribute) => (
        <TributeTile
          key={tribute._id}
          tribute={tribute}
          owner={data}
          session={issession}
          alltributes={currenttributes}
          peldaoldal={peldaoldal}
          onRequestDelete={openDeleteModal}
        />
      ))}

      {issession && currenttributes.map((tribute) => (
        <TributeTile
          key={tribute._id}
          tribute={tribute}
          owner={data}
          session={issession}
          alltributes={currenttributes}
          peldaoldal={peldaoldal}
          onRequestDelete={openDeleteModal}
        />
      ))}

      <MainCommentForm session={issession} main={true} peldaoldal={peldaoldal} />
    </>
  );
}
