import React, { useState } from "react";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email
    if (!email) {
      setError("Email is required");
      return;
    }
    // Assume a function sendPasswordResetLink exists to handle the request
    setSuccess("A password reset link has been sent to your email");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="bg-white text-black dark:bg-slate-900 dark:border shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-500 mb-6">
          Forgot Your Password?
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter your email address below and we’ll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-slate-900 dark:text-white"
              placeholder="Enter your email"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Send Reset Link
          </button>
          {success && (
            <p className="text-green-600 text-sm mt-4 text-center">{success}</p>
          )}
        </form>
        <div className="text-center mt-6">
          <a href="/login" className="text-sm text-green-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
