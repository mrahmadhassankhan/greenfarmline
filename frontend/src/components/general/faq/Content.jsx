import React, { useState } from 'react';

const faqData = [
    {
        question: "How do I register for an account?",
        answer: "To register, click on the 'Register' button at the top right of the homepage and fill out the form with your details."
    },
    {
        question: "How do I place an order on Green Farm Line?",
        answer: "To place an order, browse the products in the E-commerce section, add them to your cart, and proceed to checkout."
    },
    {
        question: "What is the crop disease detection feature?",
        answer: "The crop disease detection feature allows users to upload crop images and use AI to identify potential diseases."
    },
    {
        question: "How do I post a question in the forum?",
        answer: "To post a question in the forum, navigate to the forum section, log in, and click 'New Post' to submit your query."
    },
    {
        question: "What payment methods are supported?",
        answer: "We support multiple payment methods including credit cards, Stripe, and other online payment platforms."
    },
    {
        question: "How do I contact customer support?",
        answer: "You can contact customer support by visiting our Contact Us page and submitting a query via the form."
    },
];

const Content = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-10 md:px-20 mt-16">
            <h1 className="text-4xl text-green-600 font-bold text-center mb-8">Frequently Asked Questions</h1>
            <div className="max-w-4xl mx-auto">
                {faqData.map((faq, index) => (
                    <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                        <button
                            onClick={() => toggleAnswer(index)}
                            className="w-full text-left text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-green-600 focus:outline-none transition-colors duration-300"
                        >
                            {faq.question}
                        </button>
                        {openIndex === index && (
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                {faq.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Content;