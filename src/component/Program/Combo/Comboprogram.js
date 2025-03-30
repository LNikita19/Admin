

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom"; // Import useLocation
import ImageUpload from "./imageUpload";

import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../config";
import SaveButton from "../../Buttons/saveButton";


const ComboProgram = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation
    const programData = location.state?.programData; //
    const [Quto, setQuto] = useState("");
    const [Description, setDescription] = useState("");
    const [Quto1, setQuto1] = useState("");
    const [program1, setProgram1] = useState("");
    const [programFee1, setProgramFee1] = useState("");
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

    // const handleSave = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append("Photo", image);
    //         formData.append("selectProgram", program);
    //         formData.append("Description", Description);
    //         formData.append("programFees", programFee);
    //         formData.append("startDate", startDate);
    //         formData.append("endDate", endDate);
    //         formData.append("programTiming", timing); // Corrected to programTiming
    //         formData.append("selectLanguage", language);
    //         formData.append("youTubeLink", youtubeLink);
    //         formData.append("Quto", Quto);
    //         formData.append("Quto1", Quto1);
    //         formData.append("selectProgram1", program1); // Corrected to selectProgram1
    //         formData.append("programFees1", programFee1);
    //         formData.append("faq", JSON.stringify(faqList));

    //         let response;
    //         if (id) {
    //             response = await axios.put(`${API_BASE_URL}/updateComboProgram/${id}`, formData, {
    //                 headers: { "Content-Type": "multipart/form-data" },
    //             });
    //         } else {
    //             response = await axios.post(`${API_BASE_URL}/createComboProgram`, formData, {
    //                 headers: { "Content-Type": "multipart/form-data" },
    //             });
    //         }

    //         if (response?.data?.status) {
    //             toast.success(id ? "Class Updated Successfully" : "Class Saved Successfully");
    //             navigate("/ProgramList");
    //         }
    //     } catch (error) {
    //         console.error("Error saving class:", error);
    //         toast.error("Failed to save class");
    //     }
    // };







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
            formData.append("Quto", Quto);
            formData.append("Quto1", Quto1);
            formData.append("Description", Description); //add description as a single value

            formData.append("selectProgram1", program1);
            formData.append("programFees1", programFee1);

            // Append faqList directly as it is an array of objects
            faqList.forEach((faq, index) => {
                formData.append(`faq[${index}][question]`, faq.question);
                formData.append(`faq[${index}][answer]`, faq.answer);
            });

            let response;
            if (id) {
                response = await axios.put(`${API_BASE_URL}/updateComboProgram/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axios.post(`${API_BASE_URL}/createComboProgram`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response?.data?.status) {
                toast.success(id ? "Class Updated Successfully" : "Class Saved Successfully");
                navigate("/ProgramList");
            }
        } catch (error) {
            console.error("Error saving class:", error);
            toast.error("Failed to save class");
        }
    };
    useEffect(() => {
        if (id && !programData) {
            fetchClassData(id);
        } else if (programData) {
            setQuto(programData.Quto || "");
            setDescription(programData.Description || "");
            setQuto1(programData.Quto1 || "");
            setProgram1(programData.selectProgram1 || "");
            setProgramFee1(programData.programFees1 || "");
            setImage(programData.Photo || null);
            setProgram(programData.selectProgram || "");
            setProgramFee(programData.programFees || "");
            setStartDate(programData.startDate ? new Date(programData.startDate).toISOString().split('T')[0] : "");
            setEndDate(programData.endDate ? new Date(programData.endDate).toISOString().split('T')[0] : "");
            setTiming(programData.programTiming || "");
            setLanguage(programData.selectLanguage || "");
            setYoutubeLink(programData.youTubeLink || "");
            setFaqList(programData.faq || [{ question: "", answer: "" }]);
        }
    }, [id, programData]);
    const fetchClassData = async (comboId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getComboPrograms/${comboId}`);
            const data = response.data;

            setProgram(data.selectProgram);
            setDescription(data.Description);
            setProgramFee(data.programFees);
            setStartDate(data.startDate);
            setEndDate(data.endDate);
            setTiming(data.programTiming); // Corrected key
            setLanguage(data.selectLanguage);
            setYoutubeLink(data.youTubeLink);
            setQuto(data.Quto);
            setQuto1(data.Quto1);
            setProgram1(data.selectProgram1); // Corrected assignment
            setProgramFee1(data.programFees1);
            setFaqList(data.faq || []); // Ensure FAQ is set properly
            setImage(data.Photo);

        } catch (error) {
            console.error("Error fetching class details:", error);
        }
    };


    return (
        <div className="max-w-3xl ml-[90px] bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-[#361A06] mb-8">Combo Program</h2>
            <h1 className="mt-6 font-bold text-center text-xl">First Program</h1>
            <label className="text-sm font-bold text-[#361A06] mb-2 block">Photo </label>
            <ImageUpload selectedImage={image} setImage={setImage} />
            <div className="mt-2">
                <label className="text-sm font-bold text-[#361A06] mb-2 mt-3 block">Sadhguru Quote</label>
                <input placeholder="Type Heading here..." value={Quto} onChange={(e) => setQuto(e.target.value)} className="border p-3 w-full rounded-md" rows="4" />
            </div>
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
                <label className="text-sm font-bold text-[#361A06] mb-2 mt-3 block">Description</label>
                <input placeholder="Type Heading here..." value={Description} onChange={(e) => setDescription(e.target.value)} className="border p-3 w-full rounded-md" rows="4" />
            </div>

            <h1 className="mt-6 font-bold text-center text-xl">Second Program</h1>
            <div className="mt-2">
                <label className="text-sm font-bold text-[#361A06] mb-2 mt-3 block">Sadhguru Quote</label>
                <input placeholder="Type Heading here..." value={Quto1} onChange={(e) => setQuto1(e.target.value)} className="border p-3 w-full rounded-md" rows="4" />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">

                <div>


                    <label className="text-sm font-bold text-[#361A06] mb-2">Select Program</label>
                    <select value={program1} onChange={(e) => setProgram1(e.target.value)} className="border p-3 w-full rounded-md">
                        <option value="">Type Heading here...</option>
                        <option value="program1">Program 1</option>
                        <option value="program2">Program 2</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2 block">Select Program Fee</label>
                    <select value={programFee1} onChange={(e) => setProgramFee1(e.target.value)} className="border p-3 w-full rounded-md">
                        <option value="">Type Heading here...</option>
                        <option value="100">$100</option>
                        <option value="200">$200</option>
                    </select>
                </div>
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

export default ComboProgram;