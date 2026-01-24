import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
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
            onFinish: () => reset('password', 'password_confirmation'),
            onError: (errs) => {
                const messages = Object.values(errs).flat().join(' ');
                setCustomError(messages);
            },
        });
    };

    const FormContent = (
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
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
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddac78]"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddac78]"
                        placeholder="your@email.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddac78]"
                        placeholder="••••••••"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddac78]"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#bda081] text-white py-3 rounded-lg font-semibold hover:bg-[#ddac78] transition duration-200 disabled:bg-[#bda081]"
                >
                    {processing ? 'Creating Account...' : 'Register'}
                </button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link href={route('login')} className="text-[#bda081] hover:text-[#ddac78] font-semibold">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center p-4">
                {FormContent}
            </div>
        </>
    );
}
