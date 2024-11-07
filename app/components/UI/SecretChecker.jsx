"use client";

import Modal from "../UI/Modal";
import SecretCheckerForm from "../UI/SecretCheckerForm";
import LoginForm from "../LoginForm";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";

export default function SecretChecker({ currentdata, session, currentuser }) {

  const { openPopup, setOpenPopup } = useContext(Context);
  const [modalShown, setModalShown] = useState(false); // Track if modal has been shown

  // Open the modal if `currentdata` is null and it hasn't been shown yet
  useEffect(() => {
    if (currentdata === null && openPopup !== "secretChecker" && !modalShown) {
      setOpenPopup("secretChecker");
      setModalShown(true); // Mark modal as shown
    }
  }, [currentdata, openPopup, setOpenPopup, modalShown]);

  return (
    <>
      {currentdata === null && (
        <Modal openstate={openPopup === "secretChecker"} onClose={() => setOpenPopup(null)}>
          {session ? (
            <SecretCheckerForm user={currentuser} />
          ) : (
            <>
              <h2 className="text-center">Jelentkezz be, az űrlap szerkesztéséhez</h2>
              <LoginForm />
            </>
          )}
        </Modal>
      )}
    </>
  );
}
