// resources/js/Pages/Customer/Orders/Show.jsx
import Navbar from '@/Components/Navbar'; 
import Footer from '@/Components/FooterGuest';
import { Head, Link } from '@inertiajs/react';

export default function Show({ order, auth }) {
    return (
        <>
            <Head title={`Order Invoice #${order.id}`} />
            <Navbar auth={auth} />
            <div className="pt-20 min-h-screen bg-gray-50 pb-10">
                <div className="py-12 max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Updated wording from 'History' to 'Invoices' */}
                    <Link href={route('customer.orders.index')} className="text-sm text-blue-600 mb-4 inline-block hover:underline">
                        ← Back to My Invoices
                    </Link>
                    
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        {/* Header - Styled as an Invoice Header */}
                        <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
                            <div>
                                <h1 className="text-xl font-bold uppercase tracking-tighter">Invoice #{order.id}</h1>
                                <p className="text-xs text-gray-500 font-medium uppercase">Order Status: {order.status}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-400 uppercase">Amount Due</p>
                                <span className="font-bold text-blue-600 text-2xl">${Number(order.order_total).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Order Status Alert */}
                        {order.status === 'cancelled' && (
                            <div className="m-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                                <p className="font-bold">Order Cancelled</p>
                                <p className="text-sm">Reason: {order.cancel_reason || 'N/A'}</p>
                            </div>
                        )}

                        {/* Items List with Cover Images */}
                        <div className="p-6">
                            <h3 className="font-bold mb-4 text-gray-700 uppercase tracking-wider text-xs border-b pb-2">Purchased Items</h3>
                            <div className="space-y-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                        <div className="flex items-center">
                                            {/* BOOK COVER IMAGE */}
                                            <div className="h-20 w-14 flex-shrink-0 overflow-hidden rounded border bg-gray-100">
                                                {item.book?.cover_image ? (
                                                    <img
                                                        src={`/storage/${item.book.cover_image}`}
                                                        alt={item.book.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-[10px] text-gray-400">No Cover</div>
                                                )}
                                            </div>
                                            
                                            <div className="ml-4">
                                                <p className="font-bold text-gray-900">{item.book?.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    {item.quantity} × <span className="font-medium">${Number(item.price).toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Invoice Summary */}
                        <div className="px-6 py-4 bg-gray-50 flex justify-end">
                            <div className="w-full md:w-1/3 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span>${Number(order.order_total).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>${Number(order.order_total).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-dashed">
                            <div>
                                <h4 className="font-bold text-gray-400 uppercase text-[10px] mb-2">Ship To</h4>
                                <p className="text-gray-600 text-sm font-medium">{order.shipping_address}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-400 uppercase text-[10px] mb-2">Payment Details</h4>
                                <p className="text-gray-600 text-sm capitalize"><span className="text-gray-400 mr-2">Method:</span> {order.payment_method}</p>
                                <p className="text-gray-600 text-sm mt-1"><span className="text-gray-400 mr-2">Contact:</span> {order.phone_number}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
