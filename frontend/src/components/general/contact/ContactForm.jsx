import React from "react";
import contactImage from "../../../images/contactPageImage.jpg";

function ContactForm() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 md:px-20">
        <div className="max-w-7xl w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter Your Email Address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter Your Phone Number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter Subject"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="Type Your Message Here"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-lime-500 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Send Query
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={contactImage}
                alt="Contact Us"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
