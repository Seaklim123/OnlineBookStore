import { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';

export default function RegisterModal({ isOpen, onClose, onOpenLogin }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [customError, setCustomError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setCustomError('');

        if (data.password !== data.password_confirmation) {
            setCustomError('Passwords do not match');
            return;
        }

        if (data.password.length < 8) {
            setCustomError('Password must be at least 8 characters');
            return;
        }

        post(route('register'), {
            onSuccess: () => {
                reset();
                if (onClose) onClose(); 
            },
            onError: (errs) => {
                const messages = Object.values(errs).flat().join(' ');
                setCustomError(messages);
            },
        });
    };

    if (!isOpen) return null; // Don't render anything if modal is closed

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md mx-auto"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow text-gray-700 hover:text-gray-900"
                >
                    ✕
                </button>

                <div className="bg-white rounded-xl shadow-2xl p-6 w-full">
                    {/* Form Content */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h1>
                        <p className="text-gray-600">Join our bookstore community</p>
                        <img
                            src="/images/jong an.png"
                            alt="Register Illustration"
                            className="mx-auto my-3 w-20 h-20 rounded-full object-cover"
                        />
                    </div>

                    {customError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {customError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Full Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddac78]"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddac78]"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddac78]"
                            required
                        />
                        <input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddac78]"
                            required
                        />

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#bda081] text-white py-3 rounded-lg font-semibold hover:bg-[#ddac78] transition duration-200"
                        >
                            {processing ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <button
    type="button"
    onClick={onOpenLogin}
    className="text-[#bda081] hover:text-[#ddac78] font-semibold"
>
    Login here
</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
