import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import axios from "axios";

const ProgramList = () => {

    const [programs, setPrograms] = useState([]);
    const [existingPrograms, setExistingPrograms] = useState([]);

    const [comboPrograms, setComboPrograms] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllPrograms();
    }, []);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    const calculateDuration = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end days
        return `${diffDays} Days`;
    };
    // Fetch both regular and combo programs
    const fetchAllPrograms = async () => {
        setIsLoading(true);
        try {
            const [regularResponse, comboResponse, existingResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/getprogramData`),
                axios.get(`${API_BASE_URL}/getComboPrograms`),
                axios.get(`${API_BASE_URL}/getExistingPrograms`) // ✅ Fetch Existing Programs
            ]);

            setPrograms(regularResponse.data.data || []);
            setComboPrograms(comboResponse.data.data || []);
            setExistingPrograms(existingResponse.data.data || []); // ✅ Store existing programs

        } catch (error) {
            console.error("Error fetching programs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete program by ID
    const handleDelete = async (id, isCombo = false) => {
        if (window.confirm("Are you sure you want to delete this program?")) {
            try {
                await axios.delete(`${API_BASE_URL}/${isCombo ? 'DeletecomboprogramById' : 'DeleteprogramById'}/${id}`);
                if (isCombo) {
                    setComboPrograms(prev => prev.filter(program => program._id !== id));
                } else {
                    setPrograms(prev => prev.filter(program => program._id !== id));
                }
            } catch (error) {
                console.error("Error deleting program:", error);
            }
        }
    };

    // Navigate to selected program page
    const handleProgramSelect = (type) => {
        setShowPopup(false);
        navigate(type === 'combo' ? '/ComboProgram' : '/Program');
    };

    // Combine both program types for display
    const allPrograms = [
        ...programs.map(p => ({ ...p, type: 'regular' })),
        ...comboPrograms.map(p => ({ ...p, type: 'combo' })),
        ...existingPrograms.map(p => ({ ...p, type: 'existing' })) // ✅ Include existing programs
    ];
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#361A06]">Programs</h1>
                <button
                    className="bg-[#361A06] text-white px-4 py-2 rounded-md hover:bg-[#2a1404] transition-colors"
                    onClick={() => setShowPopup(true)}
                >
                    ADD NEW PROGRAM
                </button>
            </div>

            {/* Program Type Selection Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center w-80">
                        <h2 className="text-xl font-bold mb-4 text-[#361A06]">Select Program Type</h2>
                        <div className="space-y-3">
                            <button
                                className="block w-full bg-[#FEF8E7] text-[#361A06] border p-3 rounded-md font-semibold hover:bg-[#FEEBC8] transition-colors"
                                onClick={() => handleProgramSelect('regular')}
                            >
                                New Program
                            </button>
                            <button
                                className="block w-full bg-[#361A06] text-white p-3 rounded-md font-semibold hover:bg-[#2a1404] transition-colors"
                                onClick={() => handleProgramSelect('combo')}
                            >
                                Add Combo Program
                            </button>
                            <button
                                className="block w-full bg-[#FDF7C4] text-[#361A06] p-3 rounded-md font-semibold hover:bg-[#FCE7A6] transition-colors"
                                onClick={() => navigate('/Existingprogram')}
                            >
                                Existing Program
                            </button>
                        </div>
                        <button
                            className="mt-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="text-center py-10">
                    <p className="text-gray-500">Loading programs...</p>
                </div>
            )}

            {/* Programs Grid */}
            {!isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 shadow-lg">
                    {allPrograms.length > 0 ? (
                        allPrograms.map((program) => (
                            <div
                                key={program._id}
                                className="relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col w-96 md:w-[500px]"
                            >
                                {/* Program Image */}
                                <img
                                    src={program.Photo}
                                    alt={program.selectProgram}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.target.src = '/default-program.jpg';
                                    }}
                                />
                                <div className="absolute text-[12px] top-3 left-3 bg-[#FDF7C4] text-[#361A06] font-bold md:text-[24px] px-3 py-1 rounded-full">

                                    {formatDate(program.startDate)} -  {formatDate(program.endDate)}
                                </div>

                                {/* Combo Badge */}
                                {program.type === 'combo' && (
                                    <div className="absolute top-3 right-3 bg-[#FD8531] text-white text-sm px-3 py-1 rounded-full">
                                        COMBO
                                    </div>
                                )}
                                {/* Program Details */}
                                <div className="px-6 py-2 flex-1 font-jakarta">
                                    <h2 className="text-[#361A06] font-extrabold text-[20px] md:text-[40px]">
                                        {program.selectProgram}
                                    </h2>
                                    {/* Include Date in Description */}
                                    {/* <p className="text-[#361A06] font-semibold text-[12px] md:text-[18px] mt-2">
                                        Date: {program.date}
                                    </p> */}
                                    <p className="text-[#361A06] font-semibold text-[12px] md:text-[18px] mt-2">
                                        {program.Description}
                                    </p>
                                    {/* Action Buttons */}
                                    <div className="mt-4 space-y-2">
                                        <button
                                            className="bg-white border w-full py-2 rounded-md text-[#361A06] hover:bg-gray-50 transition-colors"
                                            onClick={() => navigate(
                                                program.type === 'combo' ? `/ComboProgram/${program._id}` : `/Program/${program._id}`,
                                                { state: { programData: program } } // Pass program data as state
                                            )}
                                        >
                                            Edit Program
                                        </button>
                                        <button
                                            className="bg-[#361A06] text-white w-full py-2 rounded-md hover:bg-[#2a1404] transition-colors"
                                            onClick={() => handleDelete(program._id, program.type === 'combo')}
                                        >
                                            Delete Program
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <p className="text-gray-500 mb-4">No programs available.</p>
                            <button
                                className="bg-[#361A06] text-white px-4 py-2 rounded-md hover:bg-[#2a1404] transition-colors"
                                onClick={() => setShowPopup(true)}
                            >
                                Create Your First Program
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProgramList;