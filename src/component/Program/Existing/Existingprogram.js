// Program.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "./imageUpload";
import axios from "axios";
import { toast } from "react-toastify";
import SaveButton from "../../Buttons/saveButton";
import { API_BASE_URL } from "../../../config";


const Existingprogram = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Quto, setQuto] = useState("");
    const [image, setImage] = useState(null);
    const [program, setProgram] = useState("");
    const [programFee, setProgramFee] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [timing, setTiming] = useState("");
    const [language, setLanguage] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [faqList, setFaqList] = useState([{ question: "", answer: "" }]);
    const [allPrograms, setAllPrograms] = useState([]);

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
            formData.append("Quto", Quto);
            faqList.forEach((faq, index) => {
                formData.append(`faq[${index}][question]`, faq.question);
                formData.append(`faq[${index}][answer]`, faq.answer);
            });
            let response;
            if (id) {
                // Update existing class
                response = await axios.put(`${API_BASE_URL}/updateExistingProgram/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                // Create new class
                response = await axios.post(`${API_BASE_URL}/createExistingProgram`, formData, {
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
        fetchAllPrograms();
        if (id) {
            fetchClassData(id);
        }
    }, [id]);

    const fetchAllPrograms = async () => {
        try {
            const [regularResponse, comboResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/getprogramData`),
                axios.get(`${API_BASE_URL}/getComboPrograms`)
            ]);

            const regularPrograms = regularResponse.data.data || [];
            const comboPrograms = comboResponse.data.data || [];

            const combinedPrograms = [
                ...regularPrograms.map(p => ({ ...p, type: 'regular', label: p.selectProgram })),
                ...comboPrograms.map(p => ({ ...p, type: 'combo', label: `Combo: ${p.selectProgram}` }))
            ];
            setAllPrograms(combinedPrograms);
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    };

    const handleProgramChange = async (e) => {
        const selectedProgramId = e.target.value;
        const selectedProgram = allPrograms.find(p => p._id === selectedProgramId);

        if (selectedProgram) {
            setProgram(selectedProgram.selectProgram);
            setProgramFee(selectedProgram.programFees || "");
            setStartDate(selectedProgram.startDate || "");
            setEndDate(selectedProgram.endDate || "");
            setTiming(selectedProgram.programTiming || "");
            setLanguage(selectedProgram.selectLanguage || "");
            setYoutubeLink(selectedProgram.youTubeLink || "");
            setQuto(selectedProgram.Quto || "");
            setFaqList(selectedProgram.faq || [{ question: "", answer: "" }]);
            setImage(selectedProgram.Photo || null);
        }
    };

    const fetchClassData = async (classId) => {
        try {
            let response;
            if (allPrograms.find(p => p._id === classId).type === 'combo') {
                response = await axios.get(`${API_BASE_URL}/getComboPrograms/${classId}`);
            } else {
                response = await axios.get(`${API_BASE_URL}/getprogramData/${classId}`);
            }
            const data = response.data.data;
            if (data) {
                setProgram(data.selectProgram);
                setProgramFee(data.programFees);
                setStartDate(data.startDate);
                setEndDate(data.endDate);
                setTiming(data.programTraining);
                setLanguage(data.selectLanguage);
                setYoutubeLink(data.youTubeLink);
                setQuto(data.Quto);
                setFaqList(data.faqList || []);
                setImage(data.Photo);
            }
        } catch (error) {
            console.error("Error fetching class details:", error);
        }
    };

    return (
        <div className="max-w-3xl ml-[90px] bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-[#361A06] mb-8">Existing Program</h2>
            <label className="text-sm font-bold text-[#361A06] mb-2 block">Photo </label>
            <ImageUpload selectedImage={image} setImage={setImage} />
            <div className="mt-2">
                <label className="text-sm font-bold text-[#361A06] mb-2 mt-3 block">Sadhguru Quote</label>
                <input placeholder="Type Heading here..." value={Quto} onChange={(e) => setQuto(e.target.value)} className="border p-3 w-full rounded-md" rows="4" />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                    <label className="text-sm font-bold text-[#361A06] mb-2">Select Program</label>
                    <select value={allPrograms.find(p => p.selectProgram === program)?._id || ""}
                        onChange={handleProgramChange}
                        className="border p-3 w-full rounded-md">
                        <option value="">Select program</option>
                        {allPrograms.map(program => (
                            <option key={program._id} value={program._id}>{program.label}</option>
                        ))}
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

export default Existingprogram;