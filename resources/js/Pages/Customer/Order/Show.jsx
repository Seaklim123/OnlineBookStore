// resources/js/Pages/Customer/Orders/Show.jsx
import Navbar from '@/Components/Navbar'; 
import Footer from '@/Components/FooterGuest';
import { Head, Link } from '@inertiajs/react';

export default function Show({ order, auth }) {
    return (
          <> {/* Added Fragment Start */}
            <Head title="Order History" />
            <Navbar auth={auth} />
            <div className="pt-20 min-h-screen bg-gray-50 pb-10">
            <div className="py-12 max-w-4xl mx-auto sm:px-6 lg:px-8">
                <Link href={route('customer.orders.index')} className="text-sm text-blue-600 mb-4 inline-block">← Back to History</Link>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
                        <h1 className="text-xl font-bold">Order Summary #{order.id}</h1>
                        <span className="font-bold text-blue-600 text-lg">${Number(order.order_total).toFixed(2)}</span>
                    </div>

                    {/* Order Status Alert */}
                    {order.status === 'cancelled' && (
                        <div className="m-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                            <p className="font-bold">This order was cancelled</p>
                            <p className="text-sm">Reason: {order.cancel_reason || 'N/A'}</p>
                        </div>
                    )}

                    {/* Items List */}
                    <div className="p-6">
                        <h3 className="font-bold mb-4 text-gray-700 uppercase tracking-wider text-xs">Items Purchased</h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-50">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-900">{item.book?.title}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity} × ${item.price}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="p-6 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-8 border-t">
                        <div>
                            <h4 className="font-bold text-gray-400 uppercase text-xs mb-2">Shipping Address</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{order.shipping_address}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 uppercase text-xs mb-2">Payment Details</h4>
                            <p className="text-gray-600 text-sm">Method: <span className="capitalize">{order.payment_method}</span></p>
                            <p className="text-gray-600 text-sm mt-1">Phone: {order.phone_number}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Footer />
        </> /* Added Fragment End */
    );
}
