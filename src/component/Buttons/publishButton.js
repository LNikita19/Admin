import React from "react";
import Button from "@mui/material/Button";
const Publish = ({ onCancel, onPublish }) => {
  return (
    <>
      <div className="font-['Roboto'] 2xl:mt-[74px] lg:mt-[30px] ml-[178px] space-x-2">
        <Button
          onClick={onCancel}
          variant="outlined"
          style={{
            borderColor: "#2196F3",
            color: "#2196F3",
            fontSize: "14px",
            fontWeight: "500px",
            borderRadius: "4px",
            padding: "15px 45px",
            hover: "border-purple-400",
          }}
        >
          CANCEL
        </Button>

        <Button
          onClick={onPublish}
          variant="contained"
          style={{
            backgroundColor: "#00C52C",
            color: "#fff",
            padding: "15px 45px",
            fontSize: "14px",
            fontWeight: "500px",
            borderRadius: "4px",

            hover: "bg-blue",
          }}
        >
          PUBLISH
        </Button>
      </div>
    </>
  );
};

export default Publish;
