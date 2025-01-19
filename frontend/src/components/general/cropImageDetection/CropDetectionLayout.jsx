import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CropDetectionLayout = ({ user }) => {
    const [image, setImage] = useState(null);
    const [detectionResult, setDetectionResult] = useState(null);
    const [loading, setLoading] = useState(false); // For loading state
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleDetect = async () => {
        if (!user || user.role !== 'farmer') {
            navigate('/login'); // Redirect to login if the user is not logged in
            return;
        }

        if (!image) {
            alert('Please upload an image first.');
            return;
        }

        setLoading(true);
        setDetectionResult(null); // Reset previous results

        const formData = new FormData();
        formData.append('file', image); // Attach the image file

        try {
            // Send POST request to the backend API
            const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Update the detection result from the API response
            setDetectionResult(response.data);
        } catch (error) {
            console.error('Error during detection:', error);
            alert('Failed to detect crop disease. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen mt-16">
            <h1 className="text-2xl text-center font-bold text-lime-600 mb-4">Crop Image Detection</h1>
            <div className="w-1/2 bg-white p-6 shadow-md rounded-lg">
                {/* Image Upload Section */}
                <div className="mb-4">
                    <label
                        htmlFor="upload"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Upload an image of your crop:
                    </label>
                    <input
                        type="file"
                        id="upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                {/* Display Uploaded Image */}
                {image && (
                    <div className="mb-4">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded Crop"
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    </div>
                )}

                {/* Detect Button */}
                <button
                    onClick={handleDetect}
                    className="bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-lime-700"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Detecting...' : 'Detect'}
                </button>

                {/* Detection Results */}
                {detectionResult && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800">Detection Results:</h2>
                        <p className="text-gray-700">
                            <strong>Disease:</strong> {detectionResult.prediction}
                        </p>
                        <p className="text-gray-700">
                            <strong>Confidence:</strong> {(detectionResult.confidence)*100}%
                        </p>
                        <hr />
                        {detectionResult.recommendations && (
                            <div className="mt-2">
                                <strong className="text-lime-500">Recommendations:</strong>
                                <ul className="list-disc list-inside text-gray-700">
                                    {detectionResult.recommendations.map((rec, index) => (
                                        <li key={index}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropDetectionLayout;