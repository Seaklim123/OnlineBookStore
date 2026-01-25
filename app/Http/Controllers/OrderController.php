<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ShoppingCart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => Order::where('user_id', auth()->id())
                ->with('items.book')
                ->get()
        ]);
    }

    public function store()
    {
        $cart = ShoppingCart::where('user_id', auth()->id())
            ->with('items.book')
            ->firstOrFail();

        $order = Order::create([
            'user_id' => auth()->id(),
            'total_price' => $cart->items->sum(
                fn ($item) => $item->book->price * $item->quantity
            ),
            'status' => 'pending',
        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'book_id' => $item->book_id,
                'price' => $item->book->price,
                'quantity' => $item->quantity,
            ]);
        }
        $cart->items()->delete();

        return redirect()->route('orders.show', $order->id);
    }

    public function show(Order $order)
    {
        return Inertia::render('Orders/Show', [
            'order' => $order->load('items.book')
        ]);
    }
}
