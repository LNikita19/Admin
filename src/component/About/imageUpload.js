import React from "react";

const ImageUpload = ({ selectedImages, setImages }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prevImages) => [...prevImages, ...files]); // Append new images
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <div
      className="pt-6 ml-[30px] flex flex-col items-center justify-center w-[250px] 2xl:h-[152px] lg:h-[150px] rounded bg-[#C2C2C28F] cursor-pointer"
      onDoubleClick={() => document.getElementById("upload-input").click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="upload-input"
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
        multiple // Allow multiple files
      />
      {selectedImages.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt={`uploaded-${index}`}
              className="w-16 h-16 object-cover rounded"
            />
          ))}
        </div>
      ) : (
        <>
          <img src="/Vector.png" alt="upload-icon" />
          <p className="text-sm text-center text-gray-500 mt-[11px]">
            "Drag & Drop" or "Click to upload"
          </p>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
