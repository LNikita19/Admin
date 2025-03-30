import React, { useState } from "react";

import Placeholder from "./placeholder";
import Heading from "./Heading";
import { SaveChangesPopup } from "./savePopup";

const Home = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  async function handleCancel() { }
  async function handlePublish() {
    setShowPopUp(true);
    handleSave();
  }
  async function handleSave() { }
  function handleClose() {
    setShowPopUp(false);
  }

  return (
    <div className="">

      <Heading />

      {/* {showPopUp && ( */}
      <SaveChangesPopup
        onSave={handleSave}
        open={showPopUp}
        onClose={handleClose}
      />
      {/* )} */}
    </div>
  );
};

export default Home;
