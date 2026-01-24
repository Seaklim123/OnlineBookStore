import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Footer from '@/Components/FooterGuest';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100 pt-6 sm:pt-0">
            {/* Logo */}
            <div className="flex justify-center">
                <Link href={route('welcome')}>
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            {/* Page content */}
            <div className="mt-6 w-full flex-grow overflow-hidden bg-white px-6 py-4 shadow-md sm:mx-auto sm:max-w-md sm:rounded-lg">
    {children}
</div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
