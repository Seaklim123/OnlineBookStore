// resources/js/Pages/Welcome.jsx

import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/FooterGuest';

export default function Welcome({ auth }) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        { icon: "fa-book-open", title: "50,000+ Books", description: "Curated collection across all genres", gradient: "from-purple-400 to-pink-600" },
        { icon: "fa-rocket", title: "Express Delivery", description: "Same-day shipping available", gradient: "from-blue-400 to-cyan-600" },
        { icon: "fa-percent", title: "Best Deals", description: "Up to 70% off on selected titles", gradient: "from-green-400 to-emerald-600" },
        { icon: "fa-lock", title: "Secure Checkout", description: "256-bit SSL encryption", gradient: "from-orange-400 to-red-600" }
    ];

    return (
        <>
            <Head title="Welcome" />

            {/* Navbar as Header */}
            <Navbar auth={auth} />

            {/* Page content with padding to avoid overlap with fixed navbar */}
            <div className="pt-16 min-h-screen overflow-hidden">

                {/* Hero Section */}
                <div className="relative flex items-center justify-center overflow-hidden min-h-screen">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: 'url(/images/store.jpg)' }}
                    >
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                                transform: `translateY(${scrollY * 0.5}px)`
                            }}
                        ></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
                        <p className="text-xl md:text-3xl text-white mb-12 font-light max-w-3xl mx-auto">
                            Immerse yourself in a universe of{' '}
                            <span className="font-bold text-yellow-200">50,000+</span>{' '}
                            handpicked books
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                            <Link
                                href="/books"
                                className="group relative bg-white text-[rgb(189,135,78)] px-10 py-5 rounded-full font-bold text-xl hover:bg-yellow-50 transition-all transform hover:scale-110 shadow-2xl inline-flex items-center gap-3"
                            >
                                <span>Explore Now</span>
                                <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                            </Link>

                            <Link
                                href="/categories"
                                className="group relative bg-white/10 border-2 border-white backdrop-blur-xl text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all transform hover:scale-110 inline-flex items-center gap-3"
                            >
                                <i className="fas fa-compass"></i>
                                <span>Browse Categories</span>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {[
                                { icon: "fa-book", number: "50K+", label: "Books" },
                                { icon: "fa-users", number: "100K+", label: "Readers" },
                                { icon: "fa-star", number: "4.9/5", label: "Rating" },
                                { icon: "fa-shipping-fast", number: "24/7", label: "Delivery" }
                            ].map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:scale-105 transition"
                                >
                                    <i className={`fas ${stat.icon} text-3xl text-white mb-2`}></i>
                                    <div className="text-4xl font-black text-white">{stat.number}</div>
                                    <div className="text-white/80">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                        <i className="fas fa-chevron-down text-white text-2xl"></i>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-32 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                                Why Choose{' '}
                                <span className="bg-gradient-to-r from-[#d4a76a] to-[#bd874e] bg-clip-text text-transparent">
                                    ចង់អាន
                                </span>
                            </h2>
                            <p className="text-2xl text-gray-400">
                                Experience the future of online book shopping
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="group bg-gray-800/50 backdrop-blur-xl p-8 rounded-3xl border border-gray-700 hover:-translate-y-4 transition"
                                >
                                    <div
                                        className={`mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                                    >
                                        <i className={`fas ${feature.icon} text-3xl text-white`}></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
