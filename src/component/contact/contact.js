import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SaveButton from "../../component/Buttons/saveButton";
import PublishButton from "../publish/publishButton";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { SaveChangesPopup } from "../Home/savePopup";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [reEnterEmail, setReEnterEmail] = useState("");
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [togglePop, setTogglePop] = useState(false);
  const [activeSlideId, setActiveSlideId] = useState(1);
  const openPopUp = (slideId) => {
    setActiveSlideId(slideId);
    setTogglePop(true);
    setToggleSwitch(!toggleSwitch);
  };
  const closePopUp = () => {
    setActiveSlideId(1);
    setTogglePop(false);
  };
  async function handleSwitch() {
    // e.stopPropagation();
    try {
      const config = {
        method: "PUT",
        mode: "cors",
        url: `${API_BASE_URL}/updateContactData/${1}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { Published: toggleSwitch },
      };
      await axios(config);
    } catch (e) {
      console.log("Error:", e);
    }
  }
  const onSaveChanges = async () => {
    closePopUp();
    if (activeSlideId !== null) {
      await handleSwitch();
    }
  };
  async function saveEmail() {
    if (reEnterEmail.length === 0 || email.length === 0) {
      toast.error("Please Enter the Email");
    }
    if (reEnterEmail !== email) {
      toast.error("Please check the Email");
    }
    if (reEnterEmail !== email) return;
    try {
      const payload = {
        id: 1,
        Email: email,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/contactData`,
        payload,
        config
      );

      if (response?.data?.status) {
        toast.success("Email saved successfully");
      }
      setEmail(response?.data?.data?.Email);
    } catch (e) {
      console.log("Error:", e);
    }
  }
  const getContactData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getcontactData`);
      setEmail(response.data.data?.Email);
      setReEnterEmail(response.data.data?.Email);
      setToggleSwitch(response.data.data?.Published);
    } catch (e) {
      console.log("err", e);
    }
  };
  useEffect(() => {
    getContactData();
  }, []);

  const handleCancel = () => {
    setEmail("");
    setReEnterEmail("");
  };

  return (
    <div className="bg-[#F1F5F9] bg-cover w-[88vw] h-[100vh]">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <h1
            className="lg:ml-[40px] lg:mt-[24px] 2xl:ml-[90px] 2xl:mt-[48px] font-['Roboto'] text-[40px] font-semibold text-[#1A2338]"
            // style={{ lineHeight: "78px" }}
          >
            Contact Us Page
          </h1>
        </div>
        <p className="text-opacity-70 text-2xl font-semibold 2xl:ml-[90px] lg:ml-[40px] text-[#1A2338B2] ">
          Change Phone Number & Email
        </p>
      </div>
      <div className="2xl:w-[769px]  2xl:h-[304px] lg:w-[680px]  lg:h-[304px] rounded 2xl:mt-[44px] lg:mt-[25px] bg-[#FFFFFF] 2xl:ml-[84px] lg:ml-[25px] ">
        <SaveChangesPopup
          open={togglePop}
          onSave={onSaveChanges}
          onClose={closePopUp}
        />
        <Box
          className="pt-[31px] pl-[20px] flex flex-row justify-between"
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          autoComplete="off"
        >
          <Box sx={{ flexGrow: 1, maxWidth: "642px" }}>
            {" "}
            {/* Ensures that the box takes up available space but doesn't grow beyond 642px */}
            <TextField
              id="outlined-email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Example@gmail.com"
              fullWidth // This makes the TextField take up the full width of its parent Box
              margin="normal"
            />
            <TextField
              id="outlined-reenter-email"
              label="Re-enter email address"
              value={reEnterEmail}
              onChange={(e) => setReEnterEmail(e.target.value)}
              placeholder="Example@gmail.com"
              fullWidth // Same as above
              margin="normal"
            />
          </Box>
          <PublishButton
            isPublished={toggleSwitch}
            openPopUp={() => openPopUp(1)}
            slideId={1}
            className="self-end" // Aligns the PublishButton to the end of the container along the cross axis
          />
        </Box>
        <div className=" 2xl:ml-[531px] lg:ml-[480px] ">
          <SaveButton onCancel={handleCancel} onSave={saveEmail} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
