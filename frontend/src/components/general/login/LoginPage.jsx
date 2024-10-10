import React, { useState } from 'react';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        identifier: '',
        password: '',
        role: 'farmer',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleRoleChange = (role) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            role,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', credentials);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 py-28 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <div className="join flex justify-center mb-4">
                    <button
                        onClick={() => handleRoleChange('farmer')}
                        className={`btn join-item rounded-l-full flex-1 p-2 text-center rounded ${credentials.role === 'farmer' ? 'bg-lime-500 text-white' : 'bg-gray-200'}`}
                    >
                        Farmer
                    </button>
                    <button
                        onClick={() => handleRoleChange('seller')}
                        className={`btn join-item flex-1 p-2 text-center rounded ${credentials.role === 'seller' ? 'bg-lime-500 text-white' : 'bg-gray-200'}`}
                    >
                        Seller
                    </button>
                    <button
                        onClick={() => handleRoleChange('expert')}
                        className={`btn join-item rounded-r-full flex-1 p-2 text-center rounded ${credentials.role === 'expert' ? 'bg-lime-500 text-white' : 'bg-gray-200'}`}
                    >
                        Expert
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block mb-1">Email or Phone Number:</label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={credentials.identifier}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" className="w-full p-2 bg-lime-500 text-white rounded hover:bg-lime-600">
                        Login
                    </button>
                    <div className='flex flex-col md:flex-row justify-between mt-3'>
                        <a href="/forgetpassword"><p className="text-sm underline text-center">Forget password?</p></a>
                        <a href="/register"><p className="text-sm underline text-center">Create an account</p></a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
