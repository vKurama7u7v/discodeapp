import React, { useState } from "react";

import Popup from "../NewCodeSandbox/PopupModal/Popup.jsx";

export default function NewCodeSandbox(props) {
  const { getLanguages, refetch } = props;

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button className="newSandbox" onClick={() => setShowPopup(true)}>
        <div>
          <p>
            <i className="fa-solid fa-circle-plus"></i>
          </p>
          <p>Crear Nueva Sandbox</p>
        </div>
      </button>

      <Popup
        show={showPopup}
        setShow={setShowPopup}
        getLanguages={getLanguages}
        refetch={refetch}
      />
    </>
  );
}
