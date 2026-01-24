import { Link } from '@inertiajs/react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">📚 Bookstore</h3>
                        <p className="text-gray-400">
                            Your one-stop shop for all your reading needs.
                            Discover thousands of books across all genres.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href={route('welcome')} className="hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href={route('books.index')} className="hover:text-white">
                                    Books
                                </Link>
                            </li>
                            <li>
                                <Link href={route('about')} className="hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href={route('contact')} className="hover:text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>📧 Email: info@bookstore.com</li>
                            <li>📞 Phone: +1 234 567 890</li>
                            <li>📍 Address: 123 Book Street, Reading City</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Bookstore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
