import React, { useState } from 'react';

const OTPVerification = () => {
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        setErrorMessage('');
        e.preventDefault();
        setIsLoading(true);
        // Simulate OTP verification process (API call)
        try {
            // You'd call the backend API here to verify OTP 
            if (otp === '123456') {
                // Successful OTP Verification Logic
                alert('OTP verified successfully!');
            } else {
                setErrorMessage('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Error verifying OTP. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">OTP Verification</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block mb-1">Enter OTP:</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            required
                            maxLength="6"
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OTPVerification;