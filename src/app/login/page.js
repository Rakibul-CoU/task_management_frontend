'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Initialize useRouter for redirection

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username || !formData.password) {
            setMessage('Please enter both username and password.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            // Use environment variable for API URL
            const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);

            // Store tokens securely in localStorage
            if (response.data.access) localStorage.setItem('access', response.data.access);
            if (response.data.refresh) localStorage.setItem('refresh', response.data.refresh);

            setMessage('Login successful! Redirecting...');
            setTimeout(() => {
                router.push('/'); // Redirect to the Home page
            }, 1000);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
            setMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                className="bg-white p-6 rounded shadow-md w-96"
                onSubmit={handleLogin}
                aria-label="Login Form"
            >
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {message && (
                    <p
                        className={`mb-4 ${
                            message.includes('successful') ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {message}
                    </p>
                )}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter your username"
                        required
                        aria-required="true"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter your password"
                        required
                        aria-required="true"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white rounded ${
                        loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    disabled={loading}
                    aria-busy={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
