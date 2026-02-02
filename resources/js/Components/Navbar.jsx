import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import RegisterModal from '@/Components/RegisterModal';
import LoginModal from '@/Components/LoginModal';
import Swal from 'sweetalert2';

const Navbar = ({ auth }) => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

const logout = () => {
    Swal.fire({
        title: 'Logging Out',
        text: 'Are you sure you want to logout from your account?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444', // Red-500
        cancelButtonColor: '#bda081',  // Your Theme Color
        confirmButtonText: 'Yes, Logout',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            router.post(route('logout'), {}, {
                onSuccess: () => {
                    // Final confirmation toast
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Logged out successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }
    });
};

    const isAdmin = auth.user?.roles?.some(
        role => role.name.toLowerCase() === 'admin'
    );

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#bda081] text-white rounded-t-lg shadow-inner">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="text-xl md:text-2xl font-bold flex items-center">
                            <img
                                src="/images/jong an.png"
                                alt="Logo"
                                className="h-10 w-10 mr-2 rounded-full object-cover"
                            />
                            <span className="truncate">Bookstore</span>
                        </Link>

                        {/* Desktop Links (Hidden on Mobile) */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="/customer/books" className="hover:text-blue-200 transition">Books</Link>

                            {auth.user ? (
                                <>
                                    {isAdmin ? (
                                        <Link href="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                                    ) : (
                                        <>
                                            <Link href="/cart" className="hover:text-blue-200 flex items-center gap-1 group">
                                                <div className="relative">
                                                    <span className="text-xl">🛒</span>
                                                    {auth.cartCount > 0 && (
                                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#bda081]">
                                                            {auth.cartCount}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="ml-1">Cart</span>
                                            </Link>
                                            <Link href="/customer/orders" className="hover:text-blue-200">Orders</Link>
                                        </>
                                    )}
                                    <span className="text-sm font-medium">Hi, {auth.user.name}</span>
                                    <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition">Logout</button>
                                </>
                            ) : (
                                <div className="space-x-4">
                                    <button onClick={() => setLoginOpen(true)} className="hover:text-blue-200 font-medium">Login</button>
                                    <button onClick={() => setRegisterOpen(true)} className="bg-white text-[#bda081] px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition">Register</button>
                                </div>
                            )}
                        </div>

                        {/* Hamburger Button (Visible on Mobile) */}
                        <div className="md:hidden flex items-center">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 focus:outline-none"
                            >
                                <div className="space-y-1.5">
                                    <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                    <span className={`block w-6 h-0.5 bg-white ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                    <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`md:hidden bg-[#bda081] overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen border-t border-[#a68b6d]' : 'max-h-0'}`}>
                    <div className="px-4 pt-2 pb-6 space-y-3">
                        <Link href="/customer/books" className="block py-2 hover:text-blue-200">Books</Link>
                        {auth.user ? (
                            <>
                                {isAdmin ? (
                                    <Link href="/dashboard" className="block py-2">Dashboard</Link>
                                ) : (
                                    <>
                                        <Link href="/cart" className="flex items-center py-2">Cart ({auth.cartCount || 0})</Link>
                                        <Link href="/customer/orders" className="block py-2">Orders</Link>
                                    </>
                                )}
                                <div className="pt-2 border-t border-[#a68b6d]">
                                    <p className="text-sm mb-3 text-blue-100 italic font-medium">Hi, {auth.user.name}</p>
                                    <button onClick={logout} className="w-full bg-red-500 py-3 rounded-lg font-bold">Logout</button>
                                </div>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <button onClick={() => setLoginOpen(true)} className="border border-white py-2 rounded-lg font-bold">Login</button>
                                <button onClick={() => setRegisterOpen(true)} className="bg-white text-[#bda081] py-2 rounded-lg font-bold">Register</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modals */}
                <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
                <RegisterModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} />
            </nav>
        </>
    );
};

export default Navbar;
