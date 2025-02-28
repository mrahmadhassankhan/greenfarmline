import React from 'react'

function Intro() {
    return (
        <>
            <hr />
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 my-12 md:my-32 flex flex-col justify-center items-center'>
                <div className='space-y-12'>
                    <h1 className='text-4xl font-bold text-center'>
                        Empowering Farmers with Technology
                    </h1>
                    <p className='text-l text-center'>
                        Green Farm Line is dedicated to transforming agriculture through innovative solutions. We offer a one-stop platform where farmers can access high-quality fertilizers, pesticides, and machinery, connect with experts for advice, and leverage advanced crop disease detection technology to ensure healthy harvests.
                    </p>
                </div>
                <a href="/about"><button className="bg-green-600 text-white p-2 mt-6 rounded-md hover:bg-green-700 duration-200 cursor-pointer">Learn More</button></a>
            </div>
        </>
    )
}

export default Intro