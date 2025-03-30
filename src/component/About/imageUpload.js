import React from "react";

const ImageUpload = ({ selectedImages, setImages, inputId, index }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = file; // Replace the image at the given index
        return newImages;
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };

  return (
    <div
      className="pt-6 ml-[30px] flex flex-col items-center justify-center w-[250px] 2xl:h-[152px] lg:h-[150px] rounded bg-[#C2C2C28F] cursor-pointer"
      onDoubleClick={() => document.getElementById(inputId).click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id={inputId}
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />
      {selectedImages[index] ? (
        <img
          src={selectedImages[index] instanceof File ? URL.createObjectURL(selectedImages[index]) : selectedImages[index]}
          alt="uploaded"
          className="w-32 h-32 object-cover rounded"
        />
      ) : (
        <>
          <img src="/Vector.png" alt="upload-icon" />
          <p className="text-sm text-center text-gray-500 mt-[11px]">
            "Drag & Drop" or "Double-click to upload"
          </p>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
