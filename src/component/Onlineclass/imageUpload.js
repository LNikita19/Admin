// import React from "react";
// import SaveButton from "../Buttons/saveButton";
// import axios from "axios";
// import { API_BASE_URL } from "../../config";
// import { toast } from "react-toastify";

// const ImageUpload = ({
//   selectedImage,
//   setImage,
//   setToggleSwitch,
//   toggleSwitch,
//   slideId,
//   setActiveSlideId,
// }) => {
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImage(reader.result);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     handleImageChange({ target: { files: [file] } });
//   };
//   const handleCancel = () => {
//     setImage(null);
//   };
//   async function saveAboutData() {
//     try {
//       const payload = {
//         id: slideId,
//         Photo: selectedImage,
//         Published: toggleSwitch,
//       };
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/onlineclassData`,
//         payload,
//         config
//       );
//       console.log(response?.data?.status);
//       if (response?.data?.status) {
//         toast.success("Updated Successfully");
//       }
//       setImage(response.data.data?.Photo);
//       setToggleSwitch(response?.data?.data?.Published);
//       setActiveSlideId(response?.data?.data?.id);
//     } catch (e) {
//       console.log("Error:", e);
//     }
//   }
//   const handleSave = () => {
//     saveAboutData();
//   };

//   const handleClick = () => {
//     document.getElementById("fileInput").click();
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <>
//       <div
//         className="ml-[30px]  flex flex-col items-center justify-center w-[250px] 2xl:h-[152px] lg:h-[150px] rounded bg-[#C2C2C28F]"
//         onClick={handleClick}
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//       >
//         <input
//           type="file"
//           id="fileInput"
//           style={{ display: "none" }}
//           onChange={handleImageChange}
//           accept="image/*"
//         />
//         {selectedImage ? (
//           <img
//             src={selectedImage}
//             alt="uploaded"
//             className="w-full h-full object-cover rounded"
//           />
//         ) : (
//           <img src="/Vector.png" alt="upload-icon" className="" />
//         )}
//         {!selectedImage && (
//           <>
//             <p className="text-sm text-center text-gray-500 mt-[11px]">
//               "Drag & Drop" or <br /> "Double click to upload image"
//             </p>

//           </>

//         )}

//       </div>
//       <p className="ml-[3rem] lg:mt-[6px]  text-xs text-gray-400">
//         SVG, PNG, JPG or GIF (max. 5MB)
//       </p>
//     </>
//   );
// };

// export default ImageUpload;


import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import SaveButton from "../Buttons/saveButton";

const MAX_FILE_SIZE_MB = 2;

const ImageUpload = ({
  selectedImage,
  setImage,
  setToggleSwitch,
  toggleSwitch,
  slideId,
  setActiveSlideId,
}) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File type validation
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed (JPG, PNG, SVG, GIF)");
      return;
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error("Image size must be under 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImage(reader.result);
      } else {
        toast.error("Failed to load image");
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };

  const handleCancel = () => {
    setImage(null);
  };

  async function saveAboutData(imageData) {
    try {
      const payload = {
        id: slideId,
        Photo: imageData,
        Published: toggleSwitch,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/onlineclassData`,
        payload,
        config
      );

      if (response?.data?.status) {
        // toast.success("Uploaded Successfully");
        setImage(response.data.data?.Photo);
        setToggleSwitch(response?.data?.data?.Published);
        setActiveSlideId(response?.data?.data?.id);
      } else {
        toast.error("Upload failed");
      }
    } catch (e) {
      console.error("Upload Error:", e);
      // toast.error("Something went wrong while uploading");
    }
  }

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <div
        className="relative  ml-[30px] flex flex-col items-center justify-center w-[250px] h-[150px] rounded bg-[#C2C2C28F] cursor-pointer"
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
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
              src={selectedImage}
              alt="uploaded"
              className="w-full h-full object-cover rounded"
            />
            <button
              className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              title="Remove Image"
            >
              ✖
            </button>
          </div>
        ) : (
          <>
            <img src="/Vector.png" alt="upload-icon" className="w-10 h-10" />
            <p className="text-sm text-center text-gray-500 mt-2">
              Drag & Drop or  upload image
            </p>
          </>
        )}
      </div>

      <p className="ml-[3rem] mt-[6px] text-xs text-gray-400">
        Only JPG, PNG, SVG  — Max 2MB
      </p>
    </>
  );
};

export default ImageUpload;
