import React, { useEffect } from "react";
import Switch from "@mui/material/Switch";

const PublishButton = ({ slideId, isPublished, openPopUp }) => {
  const [localIsPublished, setLocalIsPublished] = React.useState(isPublished);
  useEffect(() => {
    setLocalIsPublished(isPublished);
  }, [isPublished]);
  const handleToggle = (event) => {
    event.stopPropagation();
    setLocalIsPublished(!localIsPublished);
    openPopUp();
  };

  return (
    <Switch
      id={slideId}
      checked={localIsPublished}
      onChange={handleToggle}
      color="success"
      inputProps={{ "aria-label": "Publish switch" }}
    />
  );
};

export default PublishButton;
