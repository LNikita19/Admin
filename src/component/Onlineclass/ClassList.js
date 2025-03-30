import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from "react-toastify";
import OnlineClass from "./OnlineClass";

const ClassList = () => {
    const [classes, setClasses] = useState([]);
    const [editClass, setEditClass] = useState(null); // State to hold the class to edit
    const [showAddForm, setShowAddForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getonlineData`);
            setClasses(response.data.data);
        } catch (error) {
            console.error("Error fetching classes:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/DeleteonlineById/${id}`);
            toast.success("Class deleted successfully");
            fetchClasses();
        } catch (error) {
            console.error("Error deleting class:", error);
            toast.error("Failed to delete class");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const calculateDuration = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        return `${diffDays} Days`;
    };

    if (showAddForm) {
        return <OnlineClass classData={editClass} onSave={() => { // pass editClass to OnlineClass
            setShowAddForm(false);
            setEditClass(null); // Reset editClass
            fetchClasses();
        }} />;
    }

    return (
        <div className="p-8 bg-[#FFF9E1] max-w-5xl border-2 border-gray-300 shadow-lg rounded-xl min-h-screen  m-12">
            <div className=" ">
                <div className="flex justify-between  mb-6">
                    <h2 className="text-3xl font-bold text-[#361A06] ml-8">Online Classes</h2>
                    <button
                        className="px-4 py-2 bg-[#5A382D] text-white rounded-md shadow-md  hover:bg-[#3D241D]"
                        onClick={() => {
                            setEditClass(null); // Reset editClass when adding a new class.
                            setShowAddForm(true);
                        }}
                    >
                        Add New Class
                    </button>
                </div>

                <div className="space-y-6 max-w-2xl">
                    {classes.map((cls) => (
                        <div key={cls._id} className="bg-white ml-[2rem] rounded-xl p-4 shadow-md overflow-hidden border border-gray-200">
                            <img src={cls.Photo} alt={cls.selectProgram} className="w-full h-64 object-cover" />
                            <div className=" border-2 border-gray-100 p-4 ">
                                <p className="text-sm text-[#FD8531] mt-8 font-bold">TRAINING ONLINE</p>
                                <h3 className="text-xl font-semibold text-[#361A06] mt-2">{cls.selectProgram}</h3>
                                <p className="text-[#361A06] text-sm mt-2">{cls.description}</p>
                                <p className="text-[#361A06] text-sm mt-2 font-semibold">
                                    From: {formatDate(cls.startDate)} - {formatDate(cls.endDate)}
                                </p>
                                <p className="text-[#361A06] text-sm">
                                    Duration: {calculateDuration(cls.startDate, cls.endDate)}
                                </p>

                                <div className="flex flex-col gap-2 mt-4">
                                    <button
                                        onClick={() => {
                                            setEditClass(cls); // Set the class to edit
                                            setShowAddForm(true);
                                        }}
                                        className="flex-1 border border-[#361A0680] px-4 py-2 bg-[#FFF9E1] text-[#361A0680] rounded-md shadow-md"
                                    >
                                        Edit Program
                                    </button>

                                    <button onClick={() => handleDelete(cls._id)} className="flex-1 px-4 py-2 bg-[#361A06] text-white rounded-md shadow-md hover:bg-[#3D241D]">
                                        Delete Program
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassList;