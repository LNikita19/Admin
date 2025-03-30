import React, { useEffect, useState } from "react";
import ImageUpload from "./imageUpload";
import SaveButton from "../Buttons/saveButton";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
    const [formData, setFormData] = useState({
        location: "",
        contactNumber: "",
        instagramLink: "",
        facebookLink: "",
        youtubeLink: "",
        xLink: "",
        photo: null
    });
    const [activeSlideId, setActiveSlideId] = useState(null);

    const onSaveChanges = async () => {
        try {
            const formDataToSend = new FormData();

            if (formData.photo) {
                formDataToSend.append("Photo", formData.photo);
            }
            formDataToSend.append("Location", formData.location);
            formDataToSend.append("ContactNumber", formData.contactNumber);
            formDataToSend.append("instagramLink", formData.instagramLink);
            formDataToSend.append("FacebookLink", formData.facebookLink);
            formDataToSend.append("YouTubeLink", formData.youtubeLink);
            formDataToSend.append("XLink", formData.xLink);

            let response;
            if (activeSlideId) {
                response = await axios.put(`${API_BASE_URL}/updatefooterData/${activeSlideId}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axios.post(`${API_BASE_URL}/footerData`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response?.data?.status) {
                setActiveSlideId(response.data.data._id);
                toast.success(activeSlideId ? "Updated Successfully" : "Created Successfully");
            } else {
                toast.error("Failed to save data");
            }
        } catch (e) {
            console.error("Error saving footer data:", e);
            toast.error("Error saving data");
        }
    };

    const getFooterData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getfooterData`);
            const data = response?.data?.data;
            if (data) {
                setFormData({
                    location: data.Location || "",
                    contactNumber: data.ContactNumber || "",
                    instagramLink: data.instagramLink || "",
                    facebookLink: data.FacebookLink || "",
                    youtubeLink: data.YouTubeLink || "",
                    xLink: data.XLink || "",
                    photo: data.Photo || null
                });
                setActiveSlideId(data._id);
            }
        } catch (e) {
            console.error("Error fetching footer data:", e);
        }
    };

    useEffect(() => {
        getFooterData();
    }, []);

    return (
        <div className="2xl:ml-[90px] mt-[5rem] 2xl:w-[900px] h-auto lg:w-[700px] rounded-3xl bg-white shadow-lg border-2px border-[#361A0633] p-8">
            <h2 className="text-[#361A06] text-2xl font-bold mb-6 ml-[2rem]">Footer Section</h2>

            <ImageUpload
                selectedImage={formData.photo}
                setImage={(img) => setFormData({ ...formData, photo: img })}
            />

            <div className="flex flex-col space-y-6 font-['Roboto']">
                <div className="flex flex-col">
                    <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Location</label>
                    <input
                        type="text"
                        className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
                        value={formData.location}
                        placeholder="Enter location..."
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />

                    <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Contact Number</label>
                    <input
                        type="text"
                        className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[540px] lg:w-[360px] h-auto"
                        value={formData.contactNumber}
                        placeholder="Enter contact number..."
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    />
                </div>

                <div className="flex flex-col space-y-4">
                    <div className="flex flex-row space-x-3">
                        <div className="flex flex-col">
                            <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Instagram Link</label>
                            <input
                                type="text"
                                className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 w-[350px] rounded"
                                value={formData.instagramLink}
                                placeholder="Enter Instagram link..."
                                onChange={(e) => setFormData({ ...formData, instagramLink: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Facebook Link</label>
                            <input
                                type="text"
                                className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 w-[350px] rounded"
                                value={formData.facebookLink}
                                placeholder="Enter Facebook link..."
                                onChange={(e) => setFormData({ ...formData, facebookLink: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-3">
                        <div className="flex flex-col">
                            <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">YouTube Link</label>
                            <input
                                type="text"
                                className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 w-[350px] rounded"
                                value={formData.youtubeLink}
                                placeholder="Enter YouTube link..."
                                onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">X Link</label>
                            <input
                                type="text"
                                className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 w-[350px] rounded"
                                value={formData.xLink}
                                placeholder="Enter X link..."
                                onChange={(e) => setFormData({ ...formData, xLink: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SaveButton onSave={onSaveChanges} />
        </div>
    );
};

export default Footer;