// OnlineClass.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ImageUpload from "./imageUpload";
import SaveButton from "../Buttons/saveButton";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import { API_BASE_URL } from "../../config";

const OnlineClass = ({ classData, onSave }) => { // Receive classData prop
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Import and use useLocation
    const passedClassData = location.state?.programData || classData; // Get data from location.state or props

    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [program, setProgram] = useState("");
    const [programFee, setProgramFee] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [timing, setTiming] = useState("");
    const [language, setLanguage] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [faqList, setFaqList] = useState([{ question: "", answer: "" }]);


    const handleFaqChange = (index, field, value) => {
        const updatedFaqs = [...faqList];
        updatedFaqs[index][field] = value;
        setFaqList(updatedFaqs);
    };

    const addFaq = () => {
        setFaqList([...faqList, { question: "", answer: "" }]);
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("Photo", image);
            formData.append("selectProgram", program);
            formData.append("programFees", programFee);
            formData.append("startDate", startDate);
            formData.append("endDate", endDate);
            formData.append("programTiming", timing);
            formData.append("selectLanguage", language);
            formData.append("youTubeLink", youtubeLink);
            formData.append("Description", description);
            formData.append("faq", JSON.stringify(faqList));

            let response;
            if (id) {
                // Update existing class
                response = await axios.put(`${API_BASE_URL}/updateonlineData/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                // Create new class
                response = await axios.post(`${API_BASE_URL}/onlineclassData`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response?.data?.status) {
                toast.success(id ? "Class Updated Successfully" : "Class Saved Successfully");

                navigate("/ClassList");
            }
        } catch (error) {
            console.error("Error saving class:", error);
            toast.error("Failed to save class");
        }
    };
    useEffect(() => {
        if (id && !passedClassData) { // Fetch data only if id exists and no classData is passed
            fetchClassData(id);
        } else if (passedClassData) { // If classData is passed, prefill the form
            setDescription(passedClassData.Description || "");
            setImage(passedClassData.Photo || null);
            setProgram(passedClassData.selectProgram || "");
            setProgramFee(passedClassData.programFees || "");
            setStartDate(passedClassData.startDate ? new Date(passedClassData.startDate).toISOString().split('T')[0] : "");
            setEndDate(passedClassData.endDate ? new Date(passedClassData.endDate).toISOString().split('T')[0] : "");
            setTiming(passedClassData.programTraining || "");
            setLanguage(passedClassData.selectLanguage || "");
            setYoutubeLink(passedClassData.youTubeLink || "");
            setFaqList(passedClassData.faq || [{ question: "", answer: "" }]);
        }
    }, [id, passedClassData]);

    const fetchClassData = async (classId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getonlineData/${classId}`);
            const data = response.data;

            setProgram(data.selectProgram);
            setProgramFee(data.programFees);
            setStartDate(data.startDate);
            setEndDate(data.endDate);
            setTiming(data.programTraining);
            setLanguage(data.selectLanguage);
            setYoutubeLink(data.youTubeLink);
            setDescription(data.Description);
            setFaqList(data.faqList || []);
            setImage(data.Photo);
        } catch (error) {
            console.error("Error fetching class details:", error);
        }
    };


    return (
        <div className="max-w-3xl ml-[90px] bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-[#361A06] mb-8">ADD New Class</h2>
            <label className="text-sm font-bold text-[#361A06] mb-2 block">Photo </label>
            <ImageUpload selectedImage={image} setImage={setImage} />

            <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2">Select Program</label>
                    <select value={program} onChange={(e) => setProgram(e.target.value)} className="border p-3 w-full rounded-md">
                        <option value="">Type Heading here...</option>
                        <option value="program1">Program 1</option>
                        <option value="program2">Program 2</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select Program Fee</label>
                    <select value={programFee} onChange={(e) => setProgramFee(e.target.value)} className="border p-3 w-full rounded-md">
                        <option value="">Type Heading here...</option>
                        <option value="100">$100</option>
                        <option value="200">$200</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select Start Date</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-3 w-full rounded-md" />
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select End Date</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-3 w-full rounded-md" />
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select Program Timing</label>
                    <select value={timing} onChange={(e) => setTiming(e.target.value)} className="border p-3 w-full rounded-md">
                        <option value="">Type Heading here...</option>
                        <option value="morning">Morning</option>
                        <option value="evening">Evening</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select Language</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border p-3 w-full rounded-md">
                        <option value="">Type Heading here...</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                    </select>
                </div>
            </div>

            <div className="mt-2">
                <label className="text-sm font-bold text-[#361A06] mb-2 block">Add YouTube Link</label>
                <input type="text" placeholder="Type Heading here..." value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} className="border p-3 w-full rounded-md" />
            </div>

            <div className="mt-2">
                <label className="text-sm font-bold text-[#361A06] mb-2 block">Description</label>
                <textarea placeholder="Type Heading here..." value={description} onChange={(e) => setDescription(e.target.value)} className="border p-3 w-full rounded-md" rows="4"></textarea>
            </div>

            <div className="mt-2">
                <div className="flex justify-between">

                    <label className="text-lg mt-4 font-bold text-[#361A06] mb-2 block">FAQ</label>
                    <button onClick={addFaq} className="px-4 py-2 mb-6 bg-[#361A06] text-[#FFF9E1] rounded-md font-bold mt-2">+ Add FAQ</button>
                </div>

                {faqList.map((faq, index) => (
                    <div key={index} className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter question"
                            value={faq.question}
                            onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                            className="border p-3 w-full rounded-md mb-2"
                        />
                        <textarea
                            placeholder="Enter answer"
                            value={faq.answer}
                            onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                            className="border p-3 w-full rounded-md"
                            rows="2"
                        ></textarea>
                    </div>
                ))}
            </div>


            <div className="flex justify-start mt-2 gap-4">
                <SaveButton onSave={handleSave} className="px-4 py-2 bg-[#FF7A00] text-white rounded-md font-bold" />
            </div>
        </div>
    );
};

export default OnlineClass;