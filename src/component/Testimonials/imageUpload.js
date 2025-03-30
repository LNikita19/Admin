import React from "react";
import SaveButton from "../Buttons/saveButton";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";

const ImageUpload = ({
  selectedImage,
  setImage,
  slideId,
  setActiveSlideId,
}) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };

  const handleCancel = () => {
    setImage(null);
  };

  async function saveFooterData() {
    try {
      const payload = {
        id: slideId,
        Photo: selectedImage,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/createtestimonial`,
        payload,
        config
      );
      console.log(response?.data?.status);
      if (response?.data?.status) {
        toast.success("Updated Successfully");
      }
      setImage(response.data.data?.Photo);
      setActiveSlideId(response?.data?.data?.id);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  const handleSave = () => {
    saveFooterData();
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className="pt-6 ml-[30px] flex flex-col items-center justify-center w-[250px] 2xl:h-[152px] lg:h-[150px] rounded bg-[#C2C2C28F]"
        onDoubleClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*"
        />
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="uploaded"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <img src="/Vector.png" alt="upload-icon" className="" />
        )}
        {!selectedImage && (
          <>
            <p className="text-sm text-center text-gray-500 mt-[11px]">
              "Drag & Drop" or <br /> "Double click to upload image"
            </p>
          </>
        )}
      </div>
      <p className="ml-[3rem] lg:mt-[6px] text-xs text-gray-400">
        SVG, PNG, JPG or GIF (max. 5MB)
      </p>
    </>
  );
};

export default ImageUpload;
