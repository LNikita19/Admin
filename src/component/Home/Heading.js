import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";

const Heading = () => {
  const [id, setId] = useState(null);
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [smallheading, setSmallHeading] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getHomeData();
  }, []);

  const getHomeData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getData`);
      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setId(data?._id || null); // Set `null` if no ID is returned
        setDescription(data?.Description || "");
        setHeading(data?.Heading || "");
        setSmallHeading(data?.SmallHeading || "");
      } else {
        setId(null); // Ensure a new record can be created if no data exists
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };


  const saveHomeData = async () => {
    try {
      const payload = {
        Heading: heading,
        Description: description,
        SmallHeading: smallheading,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let response;

      if (id) {
        // If `id` exists, update the data (PUT request)
        response = await axios.put(`${API_BASE_URL}/updateData/${id}`, payload, config);
      } else {
        // If no `id`, create new data (POST request)
        response = await axios.post(`${API_BASE_URL}/createData`, payload, config);
      }

      if (response.data.status) {
        toast.success(id ? "Data updated successfully" : "Data created successfully");
        setIsEditing(false);
        getHomeData(); // Refresh data
      }
    } catch (e) {
      console.error("Error saving data:", e);
    }
  };



  return (
    <>
      <div className="2xl:ml-[90px] mt-[5rem] 2xl:w-[900px] h-auto lg:w-[700px] rounded-3xl bg-white shadow-lg border-2px border-[#361A0633] p-8">
        <h2 className="text-[#361A06] text-2xl font-bold mb-6">Hero Section</h2>
        <div className="flex flex-col font-['Roboto']">
          <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">
            Small Heading
          </label>
          <input
            type="text"
            className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[460px] lg:w-[350px] rounded"
            value={smallheading}
            placeholder="Type Small Heading here..."
            onChange={(e) => setSmallHeading(e.target.value)}
            disabled={!isEditing}
          />

          <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">
            Main Heading
          </label>
          <input
            type="text"
            className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[460px] lg:w-[350px] rounded"
            value={heading}
            placeholder="Type Heading here..."
            onChange={(e) => setHeading(e.target.value)}
            disabled={!isEditing}
          />

          <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">
            Description
          </label>
          <textarea
            className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[460px] lg:w-[360px] h-auto"
            value={description}
            placeholder="Type Description..."
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditing}
          ></textarea>

          <p className="ml-[30px] text-[12px] text-[#1A233899]">
            100/100 Words Remaining
          </p>

          {/* Buttons */}
          <div className="font-['Roboto'] mb-[32px] ml-[2rem]  2xl:mt-[30px] lg:mt-[13px] space-x-4">
            <Button
              variant="outlined"
              onClick={() => setIsEditing(true)}
              style={{
                borderColor: "#FD8531",
                color: "#4A301C",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "4px",
                padding: "6px,16px",
              }}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              onClick={saveHomeData}
              style={{
                backgroundColor: "#FD8531",
                color: "#FFF9E1",
                padding: "6px,16px",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "4px",
              }}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heading;
