import React, { useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar'; 
import Footer from '@/Components/FooterGuest';

export default function Checkout({ auth, cart }) {
    const { flash } = usePage().props; 
    const { data, setData, post, processing, errors } = useForm({
        phone_number: '',
        shipping_address: '',
        payment_method: 'delivery',
        transaction_image: null,
    });

    useEffect(() => {
        if (flash && flash.error) {
            alert(flash.error);
        }
    }, [flash]);

    const submit = (e) => {
        e.preventDefault();
        // Inertia handles FormData conversion automatically when files are present
        post(route('checkout.placeOrder'), {
            forceFormData: true,
        });
    };

    // Calculate Total locally for display
    const totalAmount = cart.items.reduce(
        (t, i) => t + (parseFloat(i.price) * i.quantity), 0
    );

        return (
        <> {/* Added Fragment Start */}
            <Head title="Checkout" />
            <Navbar auth={auth} />

            <div className="pt-20 min-h-screen bg-gray-50 pb-10"> {/* Added padding-top for Navbar spacing */}
                <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl">
                    <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Finalize Your Order</h1>

                    {/* 1. Order Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 tracking-wider">Your Items</h3>
                        {cart.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center mb-3">
                                <span className="text-gray-700">{item.book.title} <span className="text-gray-400">× {item.quantity}</span></span>
                                <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t mt-4 pt-4 flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-800">Total:</span>
                            <span className="text-2xl font-black text-blue-600">${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* 2. Checkout Form */}
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
                            <input
                                type="text"
                                placeholder="e.g., 012-345-678"
                                className={`w-full border rounded-lg p-3 ${errors.phone_number ? 'border-red-500' : 'border-gray-200'}`}
                                value={data.phone_number}
                                onChange={e => setData('phone_number', e.target.value)}
                            />
                            {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Detailed Delivery Address</label>
                            <textarea
                                placeholder="Street Name, House No, City..."
                                rows="3"
                                className={`w-full border rounded-lg p-3 ${errors.shipping_address ? 'border-red-500' : 'border-gray-200'}`}
                                value={data.shipping_address}
                                onChange={e => setData('shipping_address', e.target.value)}
                            />
                            {errors.shipping_address && <p className="text-red-500 text-xs mt-1">{errors.shipping_address}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">How would you like to pay?</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setData('payment_method', 'delivery')}
                                    className={`p-4 border rounded-xl text-center font-bold ${data.payment_method === 'delivery' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                >
                                    🚚 Pay on Delivery
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('payment_method', 'online')}
                                    className={`p-4 border rounded-xl text-center font-bold ${data.payment_method === 'online' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                >
                                    💳 Online Payment
                                </button>
                            </div>
                        </div>

                        {data.payment_method === 'online' && (
                            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl text-center">
                                <p className="font-black text-blue-900 mb-3">Scan to Pay Now</p>
                                <img src="/images/qr-code.png" alt="Payment QR" className="w-44 h-50 mx-auto mb-6 shadow-md rounded-lg" />
                                <div className="text-left">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Upload Transaction Screenshot</label>
                                    <input
                                        type="file"
                                        className="w-full text-sm"
                                        onChange={e => setData('transaction_image', e.target.files[0])}
                                    />
                                    {errors.transaction_image && <p className="text-red-500 text-xs mt-1 font-bold">{errors.transaction_image}</p>}
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-green-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-green-700 transition disabled:opacity-50 mt-4"
                        >
                            {processing ? 'Submitting Order...' : 'Confirm & Place Order'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </> // Added Fragment End
    );
}