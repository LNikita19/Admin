import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axios from "axios";
import { API_BASE_URL } from "../../config";
import PublishButton from "../publish/publishButton";
import { SaveChangesPopup } from "./savePopup";
import SaveButton from "../Buttons/saveButton";
import { toast } from "react-toastify";

const Placeholder = () => {
  const [toggleSwitch, setToggleSwitch] = React.useState({});

  const [slidesData, setSlidesData] = useState([
    { id: 1, Description: "", Link: "" },
  ]);
  const getFeePlaceHolder = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getfeeData`);
      const fetchedData = response.data.data;
      const initialSwitchState = {};
      fetchedData.forEach((slide) => {
        initialSwitchState[slide.id] = slide.Published;
      });
      setSlidesData(response.data.data);
      setToggleSwitch(initialSwitchState);
    } catch (e) {
      console.log("err", e);
    }
  };
  useEffect(() => {
    getFeePlaceHolder();
  }, []);

  const handleAddRow = () => {
    setSlidesData((prevSlidesData) => [
      ...prevSlidesData,
      { id: prevSlidesData.length + 1, Description: "", Link: "" },
    ]);
  };
  const handleDescriptionChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Description: value } : slide
      )
    );
  };

  const handleLinkChange = (slideId, value) => {
    setSlidesData((prevSlidesData) =>
      prevSlidesData.map((slide) =>
        slide.id === slideId ? { ...slide, Link: value } : slide
      )
    );
  };

  const saveFeePlaceholder = async (slideId) => {
    const slideData = slidesData.find((slide) => slide.id === slideId);
    try {
      const config = {
        method: "POST",
        mode: "cors",
        url: `${API_BASE_URL}/createFeePlaceholder`,
        headers: {
          "Content-Type": "application/json",
        },
        data: slideData,
      };
      const response = await axios(config);
      if (response?.data?.status) {
        toast.success("Data created successfully");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const handleSwitch = async (slideId) => {
    //e.stopPropagation();
    const slideData = slidesData.find((slide) => slide.id === slideId);
    const isPublished = !toggleSwitch[slideId];
    setToggleSwitch((prev) => ({
      ...prev,
      [slideId]: isPublished,
    }));
    try {
      const config = {
        method: "PUT",
        mode: "cors",
        url: `${API_BASE_URL}/updatefeeData/${slideId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { id: slideId, Published: isPublished },
      };
      const response = await axios(config);
      if (response?.data?.status) {
        toast.success("Data updated successfully");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };
  const [togglePop, setTogglePop] = useState(false);
  const [activeSlideId, setActiveSlideId] = useState(null);

  // Open popup and set active slide
  const openPopUp = (slideId) => {
    console.log("trigger open for slide", slideId);
    setActiveSlideId(slideId); // Set the slide ID that is being edited
    setTogglePop(true);
  };

  // Reset active slide and close popup
  const closePopUp = () => {
    setActiveSlideId(null); // Reset the active slide ID
    setTogglePop(false);
  };

  // Handle the actual switch action when "Save" is clicked
  const onSaveChanges = async () => {
    // Close the popup first
    closePopUp();
    // Proceed with saving changes
    if (activeSlideId !== null) {
      await handleSwitch(activeSlideId);
    }
  };
  const onCancel = () => {};
  return (
    <div className="flex flex-col">
      <div>
        <p className="font-['Roboto'] lg:ml-[40px] 2xl:ml-[90px] mt-[18px] font-semibold text-2 xl font-['Roboto'] text-[#1A2338B2]">
          Fee Placeholder
        </p>
      </div>

      {slidesData.map((slide) => (
        <div
          className="flex lg:ml-[40px] 2xl:w-[934px] 2xl:ml-[90px] lg:w-[700px] my-2 rounded-3xl"
          key={slide.id}
        >
          <SaveChangesPopup
            open={togglePop}
            onSave={onSaveChanges}
            onClose={closePopUp}
          />

          <Accordion>
            <AccordionSummary
              className="text-base  text-opacity-60 font-base text-[#2C2C2C]"
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${slide.id}a-content`}
              id={`panel${slide.id}a-header`}
            >
              <Typography className="text-opacity-60 text-[#1A2338]">{`Slide ${slide.id}`}</Typography>
              <span className="publish-button-wrapper">
                <PublishButton
                  isPublished={toggleSwitch[slide.id]}
                  openPopUp={() => openPopUp(slide.id)}
                  slideId={slide.id}
                  className="flex justify-self-end"
                />
              </span>
            </AccordionSummary>

            <AccordionDetails>
              <div className="flex flex-col">
                <div className="flex space-x-4 font-['Roboto']">
                  <div className="flex flex-col 2xl:w-[460px] 2xl:h-[152px] lg:w-[400px] lg:h-[120px]">
                    <label className=" text-[#1A2338] text-opacity-60 text-sm font-semibold">
                      Description
                    </label>
                    <textarea
                      className="border text-base font-normal px-4 py-2 rounded text-[#999999]"
                      placeholder="Type Description ...."
                      rows="6"
                      value={slide.Description}
                      onChange={(e) =>
                        handleDescriptionChange(slide.id, e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col w-[460px] h-[100px]">
                    <label className=" text-opacity-60 mb-2 text-[#1A2338] text-sm font-semibold">
                      Link
                    </label>
                    <input
                      type="text"
                      className="text-base font-normal border px-4 py-2 w-full rounded text-[#999999]"
                      placeholder="http://example.org/1234567890"
                      value={slide.Link}
                      onChange={(e) =>
                        handleLinkChange(slide.id, e.target.value)
                      }
                    />
                  </div>
                </div>
                <SaveButton
                  onSave={() => saveFeePlaceholder(slide.id)}
                  onCancel={onCancel}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
      <button
        className=" font-['Roboto'] 2xl:ml-[800px]  lg:ml-[600px]  w-[134px] h-[50px]  border-2 border-gray-500 rounded-lg mt-[4px]"
        onClick={handleAddRow}
      >
        ADD ROW +
      </button>
    </div>
  );
};

export default Placeholder;
