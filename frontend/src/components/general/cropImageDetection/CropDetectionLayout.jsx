import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CropDetectionLayout = ({ user }) => {
    const [image, setImage] = useState(null);
    const [detectionResult, setDetectionResult] = useState(null);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleDetect = () => {
        if (!user || user.role !== 'farmer') {
            navigate('/login'); // Redirect to login if the user is not logged in
            return;
        }

        // Dummy detection result
        const dummyResult = {
            disease: 'Leaf Spot',
            confidence: '92%',
            recommendations: [
                'Use fungicide spray.',
                'Avoid overwatering.',
                'Ensure proper drainage.',
            ],
        };

        setDetectionResult(dummyResult);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen mt-16">
            <h1 className="text-2xl font-bold text-lime-600 mb-4">Crop Image Detection</h1>
            <div className="bg-white p-6 shadow-md rounded-lg">
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
                            src={image}
                            alt="Uploaded Crop"
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    </div>
                )}

                {/* Detect Button */}
                <button
                    onClick={handleDetect}
                    className="bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-lime-700"
                >
                    Detect
                </button>

                {/* Detection Results */}
                {detectionResult && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800">Detection Results:</h2>
                        <p className="text-gray-700">
                            <strong>Disease:</strong> {detectionResult.disease}
                        </p>
                        <p className="text-gray-700">
                            <strong>Confidence:</strong> {detectionResult.confidence}
                        </p>
                        <div className="mt-2">
                            <strong className="text-gray-800">Recommendations:</strong>
                            <ul className="list-disc list-inside text-gray-700">
                                {detectionResult.recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropDetectionLayout;
