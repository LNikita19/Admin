import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import ImageUpload1 from "./imageUpload1";

const TestimonialImages = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // Add this state

    useEffect(() => {
        getTestimonialImages();
    }, []);

    const getTestimonialImages = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getImageDataData`);
            if (response.data.status) {
                setUploadedImages(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
            toast.error("Failed to load images");
        }
    };

    const handleAddNewImage = () => {
        setSelectedImage(null); // Reset selected image when opening modal
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage(null); // Reset selected image when closing modal
    };

    const handleImageUpload = async () => {
        if (!selectedImage) {
            toast.error("Please select an image first");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/uploadImageData`, {
                Photo: selectedImage
            });

            if (response?.data?.status) {
                toast.success("Image Uploaded Successfully");
                getTestimonialImages(); // Refresh the list
                setShowModal(false); // Close the modal
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 bg-[#FFF9E1] min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={handleAddNewImage}
                    className="bg-[#361A06] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#4A2810] transition-colors"
                >
                    Add New Image
                </button>
            </div>

            {/* Images Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-[6rem]">
                {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={image.Photo}
                            alt="Uploaded testimonial"
                            className="w-full h-64 object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[#361A06]">Upload New Image</h3>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <ImageUpload1
                            selectedImage={selectedImage}
                            setImage={setSelectedImage} // Pass the setter function
                        />

                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleImageUpload}
                                className="px-4 py-2 bg-[#361A06] text-white rounded-md hover:bg-[#4A2810] disabled:opacity-50"
                                disabled={isLoading || !selectedImage}
                            >
                                {isLoading ? 'Uploading...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestimonialImages;