import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import RegisterModal from '@/Components/RegisterModal';
import LoginModal from '@/Components/LoginModal';

const Navbar = ({ auth }) => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    
    const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
    };

    const logout = () => {
    if (!confirm('Are you sure you want to logout?')) {
        return;
    }

    router.post(route('logout'), {}, {
        onSuccess: () => {
            console.log('Logged out successfully');
        },
        onError: (errors) => {
            console.log('Logout error', errors);
        }
    });
    };

    const isAdmin = auth.user?.roles?.some(
    role => role.name.toLowerCase() === 'admin'
);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#bda081] text-white shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="text-2xl font-bold flex items-center">
                            <img
                                src="/images/jong an.png"
                                alt="Bookstore Logo"
                                className="h-10 w-10 mr-2 rounded-full object-cover"
                            />
                            Bookstore
                        </Link>

                        <div className="flex items-center space-x-6">
                            <Link href="/customer/books" className="hover:text-blue-200">Books</Link>

                            {auth.user ? (
                            <>
                                {auth.user?.roles?.some(role => role.name === 'admin') ? (
                                    <Link href="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                                ) : (
                                    <>
                                        <Link href="/cart" className="hover:text-blue-200 flex items-center gap-1 group">
                                            <div className="relative">
                                                <span className="text-xl">🛒</span>
                                                {auth.cartCount > 0 && (
                                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white">
                                                        {auth.cartCount}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="ml-1">Cart</span>
                                        </Link>
                                        <Link href="/customer/orders" className="hover:text-blue-200">Orders</Link>
                                    </>
                                )}

                                <span className="text-sm">Hi, {auth.user.name}</span>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>

                            ) : (
                                <>
                                    <button onClick={() => setLoginOpen(true)} className="hover:text-blue-200">
                                        Login
                                    </button>
                                    <button onClick={() => setRegisterOpen(true)} className="hover:text-blue-200">
                                        Register
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modals */}
                {loginOpen && <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />}
                {registerOpen && <RegisterModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} />}
            </nav>
        </>
    );
};

export default Navbar;
