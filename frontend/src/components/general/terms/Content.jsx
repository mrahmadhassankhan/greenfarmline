import React from 'react'

function Content() {
    return (
        <>
            <div className="container mx-auto md:px-20 px-4 py-6 mt-16">
                <h1 className="text-4xl font-bold text-green-600 text-center mb-8">Terms and Conditions</h1>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Welcome to Green Farm Line! By using our platform, you agree to abide by the following terms and conditions.
                    Please read them carefully before proceeding.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">1. Introduction</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    These Terms and Conditions govern your use of Green Farm Line, including our e-commerce, forum, and crop
                    disease detection services. By accessing our platform, you acknowledge that you have read and understood
                    these terms.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">2. Definitions</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    <strong>“Platform”</strong> refers to Green Farm Line, including its website, services, and tools.
                    <strong>“User”</strong> refers to anyone using our platform. <strong>“Services”</strong> include our e-commerce store,
                    forum, and crop disease detection.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">3. User Obligations</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    As a user, you agree to provide accurate information when creating an account, keep your login credentials
                    confidential, and comply with all local and international laws regarding your use of the platform.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">4. Service Description</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Green Farm Line offers a range of services, including an e-commerce marketplace for agricultural products, a
                    discussion forum for farmers and experts, and an AI-based crop disease detection system. We make every effort
                    to ensure our services function properly but do not guarantee uninterrupted access.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">5. Payment Terms</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Payments for products listed on the e-commerce platform must be made through our authorized payment gateways.
                    Refunds are processed based on the seller’s refund policy and applicable laws.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">6. Intellectual Property</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    All content on the platform, including product listings, forum posts, and AI tools, is the intellectual property
                    of Green Farm Line or its users. You may not reuse, distribute, or modify any content without permission.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">7. User-Generated Content</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Users may post content, such as forum posts and reviews. Green Farm Line is not responsible for user content
                    and reserves the right to moderate or remove any content that violates these terms.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">8. Privacy and Data Protection</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Your data is handled in accordance with our <a href="/privacypolicy" className="text-blue-500 underline">Privacy Policy</a>.
                    By using our platform, you consent to the collection, storage, and processing of your data.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">9. Termination of Use</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Green Farm Line reserves the right to terminate user accounts for violations of these terms. Users may also
                    terminate their account at any time by contacting customer support.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">10. Amendments and Updates</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    These terms may be updated from time to time. Users will be notified of any major changes, and it is the user's
                    responsibility to review the terms regularly.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500 mb-4">11. Contact Information</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    For any questions regarding these terms, please contact us at <a href="/contact" className="text-blue-500 underline">Contact Us</a>.
                </p>

                <footer className="text-gray-600 dark:text-gray-300 mt-12">
                    Last updated: October 2024
                </footer>
            </div>
        </>
    )
}

export default Content