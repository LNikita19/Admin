import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import SaveButton from "../Buttons/saveButton";
import ImageUpload from "./imageUpload";
import TestimonialImages from "./TestimoniamImages";

const Testimonials = () => {
    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");
    const [comment, setComment] = useState("");
    const [image, setImage] = useState(null);
    const [testimonialId, setTestimonialId] = useState(null);
    const [testimonials, setTestimonials] = useState([]);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        getTestimonialData();
    }, []);

    const getTestimonialData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/gettestimonialdata`);
            if (response.data.status) {
                setTestimonials(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching testimonial data:", error);
        }
    };

    const handleEdit = (testimonial) => {
        setName(testimonial.Name);
        setProfession(testimonial.Profession);
        setComment(testimonial.comment);
        setImage(testimonial.Photo);
        setTestimonialId(testimonial._id);
        setIsAddingNew(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/deletetestimonialdatabyid/${id}`);
            toast.success("Testimonial deleted successfully");
            getTestimonialData();
        } catch (error) {
            console.error("Error deleting testimonial:", error);
        }
    };

    const handleAddNew = () => {
        setName("");
        setProfession("");
        setComment("");
        setImage(null);
        setTestimonialId(null);
        setIsAddingNew(true);
    };

    const onSaveChanges = async () => {
        try {
            const payload = { Name: name, Profession: profession, comment, Photo: image };
            const apiUrl = testimonialId
                ? `${API_BASE_URL}/updatetestimonialdata/${testimonialId}`
                : `${API_BASE_URL}/createtestimonial`;

            const response = await axios.post(apiUrl, payload);
            if (response?.data?.status) {
                toast.success("Data Saved Successfully");
                getTestimonialData();
                setIsAddingNew(false);
            }
        } catch (error) {
            console.error("Error saving testimonial data:", error);
        }
    };

    return (
        <>
            <div className="p-8 bg-[#FFF9E1] min-h-screen">
                {!isAddingNew ? (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[#361A06] text-3xl ml-[6rem] font-bold">Testimonials</h2>
                            <button
                                onClick={handleAddNew}
                                className="bg-[#361A06] text-white px-4 py-2 mr-[6rem] rounded-md shadow-md hover:bg-[#4A2810]"
                            >
                                Add New Comment
                            </button>
                        </div>
                        <div className="max-w-3xl ml-[90px] bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

                            <div className="grid grid-cols-3 gap-6">
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial._id} className="bg-[#FDF7C4] px-8 py-6 rounded-lg shadow-lg">
                                        <div className="flex items-center mb-4">
                                            {testimonial.Photo && (
                                                <img
                                                    src={testimonial.Photo}
                                                    alt={testimonial.Name}
                                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                                />
                                            )}
                                            <div>
                                                <h3 className="font-bold text-[#361A06] text-lg">{testimonial.Name}</h3>
                                                <p className="text-sm text-[#6B7280]">{testimonial.Profession}</p>
                                            </div>
                                        </div>
                                        <p className="text-[#361A06] ">"{testimonial.comment}"</p>
                                        <div className="mt-4 flex flex-col rounded-lg space-y-2 gap-2">
                                            <button onClick={() => handleEdit(testimonial)} className="bg-[#fff] text-[#361A06] px-3 py-2 text-center rounded shadow-md">Edit Comment</button>
                                            <button onClick={() => handleDelete(testimonial._id)} className="bg-[#361A06] text-[#FFF9E1] px-3 py-2 text-center rounded shadow-md">Delete Comment </button>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-[#361A06] text-2xl ml-[6rem] font-bold mt-8">{testimonialId ? "Edit Comment" : "New Comment"}</h2>
                        <div className="2xl:ml-[90px] mt-[5rem] 2xl:w-[900px] h-auto lg:w-[700px] rounded-3xl bg-[#fff] shadow-lg border-2px border-[#361A0633] p-8">
                            <h2 className="text-[#361A06] text-2xl font-bold mb-6 ml-[2rem]">New Comment</h2>

                            <ImageUpload selectedImage={image} setImage={setImage} />

                            <div className="flex flex-col font-['Roboto']">
                                <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Name</label>
                                <input
                                    type="text"
                                    className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
                                    value={name}
                                    placeholder="Type Name here...."
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Profession</label>
                                <input
                                    type="text"
                                    className="mt-[4px] text-[12px] ml-[30px] border border-[#0000003B] px-2 py-2 2xl:w-[540px] lg:w-[350px] rounded"
                                    value={profession}
                                    placeholder="Type Profession here...."
                                    onChange={(e) => setProfession(e.target.value)}
                                />

                                <label className="ml-[30px] mt-[27px] text-[14px] font-semibold text-[#1A233899]">Comment</label>
                                <textarea
                                    className="ml-[30px] text-[12px] border border-[#0000003B] px-2 py-2 rounded 2xl:w-[540px] lg:w-[360px] h-auto"
                                    value={comment}
                                    placeholder="Type Comment ...."
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                                <p className="ml-[30px] text-[12px] text-[#1A233899]">100/100 Words Remaining</p>

                                <SaveButton onSave={onSaveChanges} />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <TestimonialImages />
        </>
    );
};

export default Testimonials;
