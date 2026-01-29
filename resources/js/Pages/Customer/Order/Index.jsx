// resources/js/Pages/Customer/Orders/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Or your customer layout
import { Head, Link } from '@inertiajs/react';
import moment from 'moment';
import Navbar from '@/Components/Navbar'; 
import Footer from '@/Components/FooterGuest';

export default function Index({ orders, auth }) {
    const ordersList = orders.data || [];

    return (
         <> {/* Added Fragment Start */}
            <Head title="Order History" />
            <Navbar auth={auth} />
            <div className="pt-20 min-h-screen bg-gray-50 pb-10"> {/* Added padding-top for Navbar spacing */}
                <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl">
                    <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Order History</h1>
                
                {ordersList.length > 0 ? (
                    <div className="grid gap-6">
                        {ordersList.map((order) => (
                            <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                                    <p className="font-semibold text-lg">${Number(order.order_total).toFixed(2)}</p>
                                    <p className="text-xs text-gray-400">{moment(order.order_date).format('MMMM DD, YYYY')}</p>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                        order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                    <Link href={route('customer.orders.show', order.id)} className="text-blue-600 font-medium hover:underline">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-10 text-center rounded-lg shadow">
                        <p className="text-gray-500">No orders found yet.</p>
                        <Link href="/" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded">Start Shopping</Link>
                    </div>
                )}
            </div>
        </div>
            <Footer />
        </> /* Added Fragment End */
    );
}
