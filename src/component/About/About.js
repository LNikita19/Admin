import React, { useEffect, useState } from "react";
import ImageUpload from "./imageUpload";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import SaveButton from "../Buttons/saveButton";

const About = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // Array for multiple images
  const [aboutId, setAboutId] = useState(null);

  // Fetch about data
  const getAboutData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getaboutData`);
      const aboutData = response.data.data[0];

      if (aboutData) {
        setAboutId(aboutData.id);
        setHeading(aboutData.Heading);
        setDescription(aboutData.Description);
        setImages(aboutData.Photos || []); // Ensure it's an array
      }
    } catch (e) {
      console.error("Error fetching about data:", e);
    }
  };

  useEffect(() => {
    getAboutData();
  }, []);

  // Handle Save
  const onSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("Heading", heading);
      formData.append("Description", description);

      images.forEach((image) => {
        if (image instanceof File) formData.append("Photos", image); // Field name should match multer
      });

      let response;
      if (aboutId) {
        response = await axios.put(`${API_BASE_URL}/updateaboutData/${aboutId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post(`${API_BASE_URL}/createaboutData`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response?.data?.status) {
        setAboutId(response.data.data._id);
        toast.success(aboutId ? "Updated Successfully" : "Created Successfully");
        getAboutData(); // Refresh data after save
      } else {
        toast.error("Failed to save data");
      }
    } catch (e) {
      console.error("Error saving about data:", e);
      toast.error("Error saving data");
    }
  };

  return (
    <div className="2xl:ml-[90px] mt-[5rem] 2xl:w-[900px] h-auto lg:w-[700px] rounded-3xl bg-white shadow-lg border-2px border-[#361A0633] p-8">
      <h2 className="text-[#361A06] text-2xl font-bold mb-6 ml-[2rem]">About Studio</h2>

      <div className="flex flex-row gap-4">
        <ImageUpload selectedImages={images} setImages={setImages} inputId="about-image-1" index={0} />
        <ImageUpload selectedImages={images} setImages={setImages} inputId="about-image-2" index={1} />
      </div>

      <div className="flex flex-col font-['Roboto']">
        <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">
          Main Heading
        </label>
        <input
          type="text"
          className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
          value={heading}
          placeholder="Type Heading here...."
          onChange={(e) => setHeading(e.target.value)}
        />

        <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">
          Description
        </label>
        <textarea
          className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[540px] lg:w-[360px] h-auto"
          value={description}
          placeholder="Type Description ...."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <SaveButton onSave={onSaveChanges} />
      </div>
    </div>
  );
};

export default About;
