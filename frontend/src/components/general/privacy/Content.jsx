import React from "react";

function Content() {
  return (
    <div className="container md:px-20 px-4 py-6 mt-16">
      <h1 className="text-5xl font-bold text-center text-green-600 mb-12">
        Privacy Policy
      </h1>

      {/* Introduction Section */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-500 mb-4">
          Introduction
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          At Green Farm Line, we value your privacy and are committed to
          protecting your personal data. This Privacy Policy outlines the types
          of information we collect, how we use it, and the steps we take to
          ensure your information remains secure.
        </p>
      </section>

      {/* Information We Collect */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-500 mb-4">
          Information We Collect
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          We collect the following types of information to provide better
          services and enhance your experience on our platform:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-300 space-y-2">
          <li>
            Personal Identification Information: Name, email address, phone
            number, etc.
          </li>
          <li>
            Activity Data: Browsing history, forum interactions, products
            viewed.
          </li>
          <li>Transaction Information: Payment details, order history.</li>
          <li>Crop images for AI-based disease detection.</li>
        </ul>
      </section>

      {/* How We Use Your Information */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-500 mb-4">
          How We Use Your Information
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Your data is used for a variety of purposes, including:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-300 space-y-2">
          <li>Processing transactions and fulfilling orders.</li>
          <li>Enhancing the platform's functionality and user experience.</li>
          <li>
            Communicating updates, promotional offers, and relevant content to
            you.
          </li>
          <li>Improving our AI crop detection model using uploaded images.</li>
        </ul>
      </section>

      {/* How We Share Your Information */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-500 mb-4">
          How We Share Your Information
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          We only share your information with third-party services necessary for
          operating our platform:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-300 space-y-2">
          <li>Payment processors (Stripe) to handle transactions securely.</li>
          <li>Analytics tools to help improve the platform.</li>
          <li>
            Compliance with legal obligations and regulatory requirements.
          </li>
        </ul>
      </section>

      {/* Data Security */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-500 mb-4">
          Data Security
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          We implement robust security measures, such as encryption and secure
          server environments, to protect your data. However, no system is
          entirely secure, and we encourage you to protect your account
          credentials.
        </p>
      </section>

      {/* Your Rights */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-500 mb-4">
          Your Rights
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          You have the right to request access, correction, or deletion of your
          personal data. To exercise any of these rights, please contact us at
          the details provided below.
        </p>
      </section>

      {/* Cookies */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-500 mb-4">
          Cookies
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          We use cookies to enhance your experience on Green Farm Line. These
          small files help us recognize your preferences and improve site
          functionality.
        </p>
      </section>

      {/* Changes to This Privacy Policy */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-500 mb-4">
          Changes to This Privacy Policy
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          We may update this Privacy Policy periodically. Any changes will be
          posted on this page, and significant updates will be communicated via
          email or a platform notification.
        </p>
      </section>

      {/* Contact Us */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-500 mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          If you have any questions or concerns about our Privacy Policy or how
          we handle your data, please reach out to us at:
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Email:{" "}
          <a href="mailto:support@greenfarmline.com" className="text-green-700">
            support@greenfarmline.com
          </a>
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Phone: +92 31 23456789
        </p>
      </section>

      {/* Footer - Last Updated */}
      <div className="text-center text-gray-600 dark:text-gray-300 mt-16">
        <p>Last updated: October 4, 2024</p>
      </div>
    </div>
  );
}

export default Content;
