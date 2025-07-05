import React from "react";

const ImageUpload = ({ selectedImage, setImage }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file); // Store file for upload
    };

    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="2xl:ml-[2px] lg:ml-[33px] flex flex-col items-center justify-center w-full 2xl:h-[152px] lg:h-[150px] rounded bg-[#C2C2C28F]"
      onClick={handleClick}
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
          src={selectedImage instanceof File ? URL.createObjectURL(selectedImage) : selectedImage}
          alt="uploaded"
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <img src="/Vector.png" alt="upload-icon" />
      )}
      {!selectedImage && (
        <>

          <p className="ml-[3rem] mt-[6px] text-xs text-gray-400">
            Only JPG, PNG, SVG  — Max 2MB
          </p>
        </>

      )}
    </div>
  );
};

export default ImageUpload;
