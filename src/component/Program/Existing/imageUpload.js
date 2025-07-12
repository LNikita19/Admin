// import React from "react";

// const ImageUpload = ({ selectedImage, setImage }) => {
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImage(file); // Store file for upload
//     };

//     reader.readAsDataURL(file);
//   };

//   const handleClick = () => {
//     document.getElementById("fileInput").click();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     handleImageChange({ target: { files: [file] } });
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div
//       className="2xl:ml-[2px] lg:ml-[33px] flex flex-col items-center justify-center w-full 2xl:h-1/3 lg:h-1/3 p-6 rounded bg-[#C2C2C28F]"
//       onClick={handleClick}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <input
//         type="file"
//         id="fileInput"
//         style={{ display: "none" }}
//         onChange={handleImageChange}
//         accept="image/*"
//       />
//       {selectedImage ? (
//         <img
//           src={selectedImage instanceof File ? URL.createObjectURL(selectedImage) : selectedImage}
//           alt="uploaded"
//           className="w-full h-full object-cover rounded"
//         />
//       ) : (
//         <img src="/Vector.png" alt="upload-icon" />
//       )}
//       {!selectedImage && (
//         <>

//           <p className="ml-[3rem] mt-[6px] text-xs text-gray-400">
//             Only JPG, PNG, SVG  — Max 2MB
//           </p>
//         </>

//       )}
//     </div>
//   );
// };

// export default ImageUpload;
import React from "react";
import { X } from "lucide-react"; // or use your own SVG/icon

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

  const removeImage = (e) => {
    e.stopPropagation(); // Prevent triggering file input click
    setImage(null);
  };

  return (
    <div
      className="relative 2xl:ml-[2px] lg:ml-[33px] flex flex-col items-center justify-center w-full 2xl:h-1/3 lg:h-1/3 p-6 rounded bg-[#C2C2C28F]"
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
        <div className="relative w-full h-full">
          <img
            src={
              selectedImage instanceof File
                ? URL.createObjectURL(selectedImage)
                : selectedImage
            }
            alt="uploaded"
            className="w-full h-full object-cover rounded"
          />
          <button
            className="absolute top-2 right-2 bg-red-600  text-white rounded-full p-1 hover:bg-opacity-80"
            onClick={removeImage}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <img src="/Vector.png" alt="upload-icon" />
          <p className="ml-[3rem] mt-[6px] text-xs text-gray-400">
            Only JPG, PNG, SVG — Max 2MB
          </p>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
