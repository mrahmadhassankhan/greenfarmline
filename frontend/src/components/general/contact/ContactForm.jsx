import React, { useState } from "react";
import contactImage from "../../../images/contactPageImage.jpg";
import { Axios_Node } from "../../../Axios";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, phone, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setResponseMessage("All required fields must be filled!");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setResponseMessage("Invalid email format!");
      setLoading(false);
      return;
    }

    if (message.length > 500) {
      setResponseMessage("Message is too long!");
      setLoading(false);
      return;
    }

    try {
      const res = await Axios_Node.post("/form/contactForm", formData);
      setResponseMessage(res.data.message);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setResponseMessage(
        error.response?.data?.error || "Something went wrong."
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center px-4 md:px-20 ">
      <div className="max-w-7xl w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
            <img
              src={contactImage}
              alt="Contact Us"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="bg-white text-black dark:bg-slate-900 dark:border dark:text-white p-6 rounded-lg shadow-lg">
            <form className="space-y-6 " onSubmit={handleSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="bg-white text-black w-full p-1 "
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="bg-white text-black w-full p-1"
              />
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (Optional)"
                className="bg-white text-black w-full p-1"
              />
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="bg-white text-black w-full p-1"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message (Max 500 chars)"
                required
                className="bg-white text-black w-full p-1"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg"
              >
                {loading ? "Sending..." : "Send Query"}
              </button>
              {responseMessage && (
                <p className="text-center text-green-600">{responseMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
