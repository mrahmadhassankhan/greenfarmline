import React from "react";
import contactImage from "../../../images/contact-us.jpg";

function Contact() {
  return (
    <>
      <hr />
      <div className="text-4xl font-bold text-center mt-12">Contact Us</div>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row md:gap-11">
        <div className="w-full md:w-1/2 order-2 my-12">
          <div className="space-y-12">
            <p className="text-l text-justify">
              Green Farm Line <br />
              Johar Town <br />
              Block C Phase 1, Lahore, Pakistan <br />
              <br />
              <strong>Email:</strong> support@greenfarmline.com <br />
              <strong>Phone:</strong> +92 34 14126057 <br />
              <br />
              Need more help? <br />
            </p>
          </div>
          <div className="flex justify-center items-center md:justify-normal">
            <a href="/contact">
              <button className="bg-green-600 text-white p-2 mt-6 rounded-md hover:bg-green-700 duration-200 cursor-pointer">
                Contact Us
              </button>
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 order-1 my-12">
          <img
            className="rounded-2xl"
            src={contactImage}
            alt="contact image here"
          />
        </div>
      </div>
    </>
  );
}

export default Contact;
