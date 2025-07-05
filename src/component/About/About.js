// import React, { useEffect, useState } from "react";
// import ImageUpload from "./imageUpload";
// import { API_BASE_URL } from "../../config";
// import axios from "axios";
// import { toast } from "react-toastify";
// import SaveButton from "../Buttons/saveButton";

// const About = () => {
//   const [heading, setHeading] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]); // Array for multiple images
//   const [aboutId, setAboutId] = useState(null);

//   // Fetch about data
//   const getAboutData = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/getaboutData`);
//       const aboutData = response.data.data[0];

//       if (aboutData) {
//         setAboutId(aboutData.id);
//         setHeading(aboutData.Heading);
//         setDescription(aboutData.Description);
//         setImages(aboutData.Photos || []); // Ensure it's an array
//       }
//     } catch (e) {
//       console.error("Error fetching about data:", e);
//     }
//   };

//   useEffect(() => {
//     getAboutData();
//   }, []);

//   // Handle Save
//   const onSaveChanges = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("Heading", heading);
//       formData.append("Description", description);

//       images.forEach((image) => {
//         if (image instanceof File) {
//           formData.append("Photos", image); // Append multiple files
//         }
//       });

//       let response;
//       if (aboutId) {
//         response = await axios.put(`${API_BASE_URL}/updateaboutData/${aboutId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         response = await axios.post(`${API_BASE_URL}/createaboutData`, formData, {
//           headers: { "Content-Type": "multipart/form" },
//         });
//       }

//       if (response?.data?.status) {
//         setAboutId(response.data.data._id);
//         toast.success(aboutId ? "Updated Successfully" : "Created Successfully");
//         getAboutData();
//       } else {
//         toast.error("Failed to save data");
//       }
//     } catch (e) {
//       console.error("Error saving about data:", e);
//       toast.error("Error saving data");
//     }
//   };

//   return (
//     <div className="ml-[90px] mt-[5rem] font-jakarta w-[900px] h-auto lg:w-[700px] rounded-3xl bg-white shadow-lg border border-[#361A0633]  p-8">
//       <h2 className="text-[#361A06] text-2xl font-bold mb-6 ml-[2rem]">About Studio</h2>

//       <div className="flex flex-row gap-4">
//         <ImageUpload selectedImages={images} setImages={setImages} inputId="about-image-1" index={0} />
//         {/* <ImageUpload selectedImages={images} setImages={setImages} inputId="about-image-2" index={1} /> */}
//       </div>

//       <div className="flex flex-col font-jakarta">
//         <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#361A06]">
//           Main Heading
//         </label>
//         <input
//           type="text"
//           className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
//           value={heading}
//           placeholder="Type Heading here...."
//           onChange={(e) => setHeading(e.target.value)}
//         />

//         <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#361A06]">
//           Description (Each sentence after a period will appear on a new line)
//         </label>
//         <textarea
//           className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[540px] lg:w-[360px] min-h-[120px] whitespace-pre-wrap"
//           value={description}
//           placeholder="Type description here. Each sentence should end with a period. The next sentence will automatically start on a new line..."
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <SaveButton onSave={onSaveChanges} />
//       </div>
//     </div>
//   );
// };

// export default About;


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

  const getAboutData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getaboutData`);
      const aboutData = response.data.data?.[0];

      if (aboutData) {
        setAboutId(aboutData._id); // ✅ FIXED: Use _id not id
        setHeading(aboutData.Heading || "");
        setDescription(aboutData.Description || "");
        setImages(aboutData.Photos || []);
      }
    } catch (e) {
      console.error("Error fetching about data:", e);
      // toast.error("Failed to fetch about data");
    }
  };

  useEffect(() => {
    getAboutData();
  }, []);

  const onSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("Heading", heading);
      formData.append("Description", description);

      images.forEach((image) => {
        if (image instanceof File) {
          formData.append("Photos", image); // ✅ append each file
        }
      });

      let response;

      if (aboutId) {
        // ✅ update existing
        response = await axios.put(`${API_BASE_URL}/updateaboutData/${aboutId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // ✅ create new
        response = await axios.post(`${API_BASE_URL}/createaboutData`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response?.data?.status) {
        setAboutId(response.data.data._id); // ✅ Set new ID after creating
        toast.success(aboutId ? "Updated Successfully" : "Created Successfully");
        getAboutData(); // 🔄 Refresh data
      } else {
        toast.error("Failed to save data");
      }
    } catch (e) {
      console.error("Error saving about data:", e);
      toast.error("Error saving data");
    }
  };

  const handleAddImageBox = () => {
    setImages((prev) => [...prev, null]);
  };

  const handleImageChange = (file, index) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="ml-[90px] mt-[5rem] font-jakarta w-[900px] h-auto lg:w-[700px] rounded-3xl bg-white shadow-lg border border-[#361A0633]  p-8">
      <h2 className="text-[#361A06] text-2xl font-bold mb-6 ml-[2rem]">About Studio</h2>

      <div className="flex flex-wrap gap-4 ml-[30px]">
        {images.map((img, index) => (
          <ImageUpload
            key={index}
            image={img}
            index={index}
            onImageChange={handleImageChange}
            onRemove={handleRemoveImage}
          />
        ))}

        <button
          type="button"
          onClick={handleAddImageBox}
          className="w-[200px] h-[150px] bg-[#FD8531] text-white font-bold rounded flex items-center justify-center"
        >
          + Add Image
        </button>
      </div>

      <div className="flex flex-col font-jakarta">
        <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#361A06]">
          Main Heading
        </label>
        <input
          type="text"
          className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
          value={heading}
          placeholder="Type Heading here...."
          onChange={(e) => setHeading(e.target.value)}
        />

        <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#361A06]">
          Description (Each sentence after a period will appear on a new line)
        </label>
        <textarea
          className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[540px] lg:w-[360px] min-h-[120px] whitespace-pre-wrap"
          value={description}
          placeholder="Type description here. Each sentence should end with a period. The next sentence will automatically start on a new line..."
          onChange={(e) => setDescription(e.target.value)}
        />

        <SaveButton onSave={onSaveChanges} />
      </div>
    </div>
  );
};

export default About;
