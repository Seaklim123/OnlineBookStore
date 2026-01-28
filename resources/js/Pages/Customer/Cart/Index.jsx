import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/FooterGuest';

export default function Cart({ cart, auth }) {
    // Sync local state with server data
    const [cartItems, setCartItems] = useState(cart?.items || []);

    useEffect(() => {
        setCartItems(cart?.items || []);
    }, [cart]);

    // Update quantity in DB
    const handleQuantityChange = (cartItemId, newQty) => {
        if (newQty < 1) return;

        // Optimistic Update: Change UI immediately
        setCartItems(prev =>
            prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item)
        );

        router.put(route('cart.update', cartItemId), { 
            quantity: newQty 
        }, {
            preserveScroll: true 
        });
    };

    // Remove item from DB
    const handleRemoveItem = (cartItemId) => {
        if (confirm('Are you sure you want to remove this book?')) {
            router.delete(route('cart.remove', cartItemId), {
                preserveScroll: true,
                onSuccess: () => {
                    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
                }
            });
        }
    };

    // Calculate total price
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + (parseFloat(item.book.price) * item.quantity),
        0
    );

    return (
        <>
            <Head title="My Cart" />
            <Navbar auth={auth} />

            <div className="pt-16 min-h-screen flex flex-col bg-gray-50">
                <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-lg flex-grow">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h2>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500 mb-4">Your cart is empty.</p>
                            <button 
                                onClick={() => router.visit('/')}
                                className="text-blue-600 hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="border-b">
                                    <tr className="text-left text-gray-600 uppercase text-sm">
                                        <th className="pb-4">Book</th>
                                        <th className="pb-4">Price</th>
                                        <th className="pb-4 text-center">Quantity</th>
                                        <th className="pb-4">Subtotal</th>
                                        <th className="pb-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="py-6 flex items-center gap-4">
                                                <img
                                                    src={item.book.cover_image ? `/storage/${item.book.cover_image}` : '/images/no-book.png'}
                                                    alt={item.book.title}
                                                    className="w-16 h-24 object-cover rounded shadow-sm"
                                                />
                                                <div>
                                                    <p className="font-bold text-gray-800">{item.book.title}</p>
                                                    <p className="text-sm text-gray-500">{item.book.author}</p>
                                                </div>
                                            </td>
                                            <td className="py-6 text-gray-700">${parseFloat(item.book.price).toFixed(2)}</td>
                                            <td className="py-6">
                                                <div className="flex justify-center items-center gap-3">
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-6 font-semibold text-gray-900">
                                                ${(parseFloat(item.book.price) * item.quantity).toFixed(2)}
                                            </td>
                                            <td className="py-6 text-right">
                                                <button
                                                    className="text-red-500 hover:text-red-700 font-medium transition"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex flex-col items-end mt-10 border-t pt-6">
                                <div className="text-gray-600 mb-2">Total Amount:</div>
                                <div className="text-3xl font-bold text-gray-900 mb-6">${totalPrice.toFixed(2)}</div>
                                <div className="flex gap-4">
                                    <button
                                        className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50"
                                        onClick={() => router.visit('/customer/books')}
                                    >
                                        Back to Store
                                    </button>
                                    <button
                                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-lg transition"
                                        onClick={() => router.visit('/checkout')}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}
