import React from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config";
import axios from "axios";

const MAX_FILE_SIZE_MB = 2;

const ImageUpload = ({
  selectedImage,
  setImage,
  slideId,
  setActiveSlideId,
}) => {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Validate type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed (JPG, PNG, etc)");
      return;
    }

    // ✅ Validate size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setImage(base64Image);

      // ✅ Save image immediately
      await saveImage(base64Image);
    };

    reader.readAsDataURL(file);
  };

  const saveImage = async (imageData) => {
    try {
      const payload = {
        id: slideId,
        Photo: imageData,
      };

      const response = await axios.post(`${API_BASE_URL}/authorData`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response?.data?.status) {
        // toast.success("Image uploaded successfully");
        setImage(response.data.data?.Photo);
        setActiveSlideId(response.data.data?.id);
      } else {
        toast.error("Image upload failed");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      // toast.error("Something went wrong while uploading");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setImage(null);
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <div
        className="ml-[30px] flex flex-col items-center justify-center w-[250px] 2xl:h-[152px] lg:h-[150px] rounded bg-[#C2C2C28F] cursor-pointer"
        onClick={handleClick} // ✅ SINGLE CLICK to upload
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*" // ✅ Only image types
        />

        {selectedImage ? (
          <div className="relative w-full h-full">
            <img
              src={selectedImage}
              alt="uploaded"
              className="w-full h-full object-cover rounded"
            />
            <button
              className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
              onClick={handleCancel}
              title="Remove Image"
            >
              ✖
            </button>
          </div>
        ) : (
          <>
            <img src="/Vector.png" alt="upload-icon" className="w-10 h-10" />
            <p className="text-sm text-center text-gray-500 mt-2">
              Click or drag an image here to upload
            </p>
          </>
        )}
      </div>

      <p className="ml-[3rem] lg:mt-[6px] text-xs text-gray-400">
        Only JPG, PNG, SVG or GIF — Max 2MB
      </p>
    </>
  );
};

export default ImageUpload;
