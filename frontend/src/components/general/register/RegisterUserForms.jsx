import React, { useState } from 'react';

const RegisterUserForms = () => {
    const [userType, setUserType] = useState('farmer');

    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        registrationNo: '',
        logo: null,
        qualification: '',
        degree: null,
        yearsOfExperience: '',
        expertise: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormValues({ ...formValues, [name]: files[0] });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formValues.fullName) tempErrors.fullName = 'Full Name is required';
        if (!formValues.email || !emailPattern.test(formValues.email)) tempErrors.email = 'Valid email is required';
        if (!formValues.phoneNumber) tempErrors.phoneNumber = 'Phone Number is required';
        if (!formValues.address) tempErrors.address = 'Address is required';
        if (!formValues.password || formValues.password.length < 6) tempErrors.password = 'Password must be at least 6 characters long';
        if (formValues.password !== formValues.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

        if (userType === 'seller') {
            if (!formValues.businessName) tempErrors.businessName = 'Business Name is required';
            if (!formValues.registrationNo) tempErrors.registrationNo = 'Registration No. is required';
            if (!formValues.logo) tempErrors.logo = 'Business logo is required';
        }

        if (userType === 'expert') {
            if (!formValues.qualification) tempErrors.qualification = 'Qualification is required';
            if (!formValues.degree) tempErrors.degree = 'Degree document is required';
            if (!formValues.yearsOfExperience) tempErrors.yearsOfExperience = 'Years of experience is required';
            if (!formValues.expertise) tempErrors.expertise = 'Area of expertise is required';
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted successfully', formValues);
        } else {
            console.log('Validation failed');
        }
    };

    const renderFormFields = () => {
        switch (userType) {
            case 'farmer':
                return (
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                            <input type="text" name="fullName" placeholder="Enter your full name" className="w-full p-2 border rounded-md"
                                value={formValues.fullName} onChange={handleChange} />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" name="email" placeholder="Enter your email address" className="w-full p-2 border rounded-md"
                                value={formValues.email} onChange={handleChange} />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                            <input type='tel' name="phoneNumber" placeholder="Enter your phone number" className="w-full p-2 border rounded-md"
                                value={formValues.phoneNumber} onChange={handleChange} />
                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                            <input type='text' name="address" placeholder="Enter your address" className="w-full p-2 border rounded-md"
                                value={formValues.address} onChange={handleChange} />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input type='password' name="password" placeholder="Enter your password" className="w-full p-2 border rounded-md"
                                value={formValues.password} onChange={handleChange} />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                            <input type='password' name="confirmPassword" placeholder="Confirm your password" className="w-full p-2 border rounded-md"
                                value={formValues.confirmPassword} onChange={handleChange} />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                );
            case 'seller':
                return (
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                            <input type="text" name="fullName" placeholder="Enter your full name" className="w-full p-2 border rounded-md"
                                value={formValues.fullName} onChange={handleChange} />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" name="email" placeholder="Enter your email address" className="w-full p-2 border rounded-md"
                                value={formValues.email} onChange={handleChange} />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                            <input type='tel' name="phoneNumber" placeholder="Enter your phone number" className="w-full p-2 border rounded-md"
                                value={formValues.phoneNumber} onChange={handleChange} />
                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                            <input type='text' name="address" placeholder="Enter your address" className="w-full p-2 border rounded-md"
                                value={formValues.address} onChange={handleChange} />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input type='password' name="password" placeholder="Enter your password" className="w-full p-2 border rounded-md"
                                value={formValues.password} onChange={handleChange} />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                            <input type='password' name="confirmPassword" placeholder="Confirm your password" className="w-full p-2 border rounded-md"
                                value={formValues.confirmPassword} onChange={handleChange} />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Business Name</label>
                            <input type="text" name="businessName" placeholder="Enter your business name" className="w-full p-2 border rounded-md"
                                value={formValues.businessName} onChange={handleChange} />
                            {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Registration No.</label>
                            <input type="text" name="registrationNo" placeholder="Enter your registration number" className="w-full p-2 border rounded-md"
                                value={formValues.registrationNo} onChange={handleChange} />
                            {errors.registrationNo && <p className="text-red-500 text-xs mt-1">{errors.registrationNo}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Business Logo</label>
                            <input type="file" name="logo" className="w-full p-2 border rounded-md" onChange={handleChange} />
                            {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
                        </div>
                    </div>
                );
            case 'expert':
                return (
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                            <input type="text" name="fullName" placeholder="Enter your full name" className="w-full p-2 border rounded-md"
                                value={formValues.fullName} onChange={handleChange} />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input type="email" name="email" placeholder="Enter your email address" className="w-full p-2 border rounded-md"
                                value={formValues.email} onChange={handleChange} />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                            <input type='tel' name="phoneNumber" placeholder="Enter your phone number" className="w-full p-2 border rounded-md"
                                value={formValues.phoneNumber} onChange={handleChange} />
                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                            <input type='text' name="address" placeholder="Enter your address" className="w-full p-2 border rounded-md"
                                value={formValues.address} onChange={handleChange} />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input type='password' name="password" placeholder="Enter your password" className="w-full p-2 border rounded-md"
                                value={formValues.password} onChange={handleChange} />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                            <input type='password' name="confirmPassword" placeholder="Confirm your password" className="w-full p-2 border rounded-md"
                                value={formValues.confirmPassword} onChange={handleChange} />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Qualification</label>
                            <input type="text" name="qualification" placeholder="Enter your qualification" className="w-full p-2 border rounded-md"
                                value={formValues.qualification} onChange={handleChange} />
                            {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Degree</label>
                            <input type="file" name="degree" className="w-full p-2 border rounded-md" onChange={handleChange} />
                            {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Years of Experience</label>
                            <input type="number" name="yearsOfExperience" placeholder="Enter your years of experience" className="w-full p-2 border rounded-md"
                                value={formValues.yearsOfExperience} onChange={handleChange} />
                            {errors.yearsOfExperience && <p className="text-red-500 text-xs mt-1">{errors.yearsOfExperience}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Area of Expertise</label>
                            <input type="text" name="expertise" placeholder="Enter your area of expertise" className="w-full p-2 border rounded-md"
                                value={formValues.expertise} onChange={handleChange} />
                            {errors.expertise && <p className="text-red-500 text-xs mt-1">{errors.expertise}</p>}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center py-28 px-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                <p className='text-sm text-right mb-6'>Already register? <a href="/login" className='font-bold underline'>Login</a></p>
                <h2 className="text-2xl font-bold text-center mb-6">Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}</h2>
                <div className="join flex justify-center mb-6">
                    <button
                        className={`btn join-item rounded-l-full px-4 py-2 ${userType === 'farmer' ? 'bg-lime-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setUserType('farmer')}
                    >
                        Farmer
                    </button>
                    <button
                        className={`btn join-item px-4 py-2 ${userType === 'seller' ? 'bg-lime-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setUserType('seller')}
                    >
                        Seller
                    </button>
                    <button
                        className={`btn join-item rounded-r-full px-4 py-2 ${userType === 'expert' ? 'bg-lime-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setUserType('expert')}
                    >
                        Expert
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {renderFormFields()}
                    <div className="mt-6">
                        <button className="w-full bg-lime-500 text-white py-2 rounded-lg hover:bg-lime-600">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterUserForms;