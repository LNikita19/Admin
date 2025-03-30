import React, { useEffect, useState } from "react";
import ImageUpload from "./imageUpload";
import SaveButton from "../Buttons/saveButton";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

const Author = () => {
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [activeSlideId, setActiveSlideId] = useState(null);
  const [image, setImage] = useState(null);
  const [remainingWords, setRemainingWords] = useState(100); // Word counter

  useEffect(() => {
    getAboutData();
  }, []);

  // Fetch About Data
  const getAboutData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getauthorData`);
      if (response?.data?.data) {
        const { Photo, id, mainHeading, Description } = response.data.data;
        setImage(Photo);
        setActiveSlideId(id);
        setHeading(mainHeading);
        setDescription(Description);

        // Update remaining words
        const wordCount = Description.trim().split(/\s+/).filter(Boolean).length;
        setRemainingWords(100 - wordCount);
      }
    } catch (error) {
      console.error("Error fetching About data:", error);
    }
  };

  // Save or Update About Data (without reloading)
  const saveAboutData = async () => {
    try {
      const payload = { id: activeSlideId, Photo: image, mainHeading: heading, Description: description };

      const apiUrl = activeSlideId
        ? `${API_BASE_URL}/updateauthorData/${activeSlideId}` // Update existing data
        : `${API_BASE_URL}/authorData`; // Create new data

      const response = await axios.post(apiUrl, payload);
      if (response?.data?.status) {
        toast.success("Data Saved Successfully");

        // Update state directly instead of refreshing
        setActiveSlideId(response.data.data.id);
        setImage(response.data.data.Photo);
        setHeading(response.data.data.mainHeading);
        setDescription(response.data.data.Description);

        // Update remaining words
        const wordCount = response.data.data.Description.trim().split(/\s+/).filter(Boolean).length;
        setRemainingWords(100 - wordCount);
      }
    } catch (error) {
      console.error("Error saving About data:", error);
    }
  };

  // Handle Description Change and Word Count
  const handleDescriptionChange = (e) => {
    const words = e.target.value.trim().split(/\s+/).filter(Boolean).length;

    if (words <= 100) {
      setDescription(e.target.value);
      setRemainingWords(100 - words);
    }
  };

  return (
    <div className="2xl:ml-[90px] mt-[5rem] 2xl:w-[900px] lg:w-[700px] rounded-3xl bg-white shadow-lg border-2px border-[#361A0633] p-8">
      <h2 className="text-[#361A06] text-2xl font-bold mb-6 ml-[2rem]">Author</h2>

      <ImageUpload selectedImage={image} setImage={setImage} />

      <div className="flex flex-col font-['Roboto']">
        <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Main Heading</label>
        <input
          type="text"
          className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
          value={heading}
          placeholder="Type Heading here...."
          onChange={(e) => setHeading(e.target.value)}
        />

        <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Description</label>
        <textarea
          className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[540px] lg:w-[360px] h-auto"
          value={description}
          placeholder="Type Description ...."
          onChange={handleDescriptionChange}
        ></textarea>

        {/* Word Count Display */}
        <p className="ml-[30px] text-[12px] text-[#1A233899]">
          {remainingWords} / 100 Words Remaining
        </p>

        <SaveButton onSave={saveAboutData} />
      </div>
    </div>
  );
};

export default Author;
