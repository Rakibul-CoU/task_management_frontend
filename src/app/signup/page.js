'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import axios from 'axios';

export default function SignUp() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const router = useRouter(); // Initialize useRouter for navigation

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
            setMessage('Signup successful! Redirecting to login page...');
            setTimeout(() => {
                router.push('/login'); // Redirect to the login page after success
            }, 2000); // Add a short delay before redirection
        } catch (error) {
            setMessage(error.response?.data?.error || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSignup}>
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                {message && <p className={`mb-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
