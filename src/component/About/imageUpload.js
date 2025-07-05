import React from "react";
import { toast } from "react-toastify";

const MAX_FILE_SIZE_MB = 2;

const ImageUpload = ({ image, index, onImageChange, onRemove }) => {
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error("Max file size is 2MB");
      return;
    }

    onImageChange(file, index);
  };

  return (
    <div
      className="relative w-[200px] h-[150px] bg-[#C2C2C28F] rounded flex items-center justify-center cursor-pointer"
      onClick={() => document.getElementById(`upload-input-${index}`).click()}
    >
      <input
        type="file"
        id={`upload-input-${index}`}
        style={{ display: "none" }}
        onChange={handleChange}
        accept="image/*"
      />
      {image ? (
        <>
          <img
            src={image instanceof File ? URL.createObjectURL(image) : image}
            alt={`uploaded-${index}`}
            className="w-full h-full object-cover rounded"
          />
          <button
            className="absolute top-1 right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
          >
            ✖
          </button>
        </>
      ) : (

        <div className="text-gray-600 text-sm text-center px-2">
          <img src="/Vector.png" alt="upload" className="mx-auto mb-1" />
          Click to upload
        </div>
      )}
    </div>

  );
};

export default ImageUpload;
