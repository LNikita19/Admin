import React from "react";
import Button from "@mui/material/Button";
const SaveButton = ({ onSave, onCancel }) => {
  return (
    <>
      <div className="font-['Roboto'] mb-[32px] ml-[2rem]  2xl:mt-[30px] lg:mt-[13px]  space-x-4 ">
        <Button
          variant="outlined"
          onClick={onCancel}
          style={{
            borderColor: "#FD8531",
            color: "#4A301C",
            fontSize: "14px",
            fontWeight: "500px",
            borderRadius: "4px",
            padding: "6px,16px",
          }}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          style={{
            backgroundColor: "#FD8531",
            color: "#FFF9E1",
            padding: "6px,16px",
            fontSize: "14px",
            fontWeight: "500px",
            borderRadius: "4px",
          }}
        >
          SAVE
        </Button>
      </div>
    </>
  );
};

export default SaveButton;
