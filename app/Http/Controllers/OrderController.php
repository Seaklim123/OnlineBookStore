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
         $orders = Order::with(['items.book', 'customer'])
        ->latest()
        ->paginate(10); 

        return Inertia::render('Orders/Index', [
            'ordersData' => $orders
        ]);
    }

    public function store()
    {
        $cart = ShoppingCart::where('customer_id', auth()->id())
            ->with('items.book')
            ->firstOrFail();
        
        $shippingFee = 2.00; 

        $order = Order::create([
            'customer_id' => auth()->id(),
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
        // Load nested relationships: Order -> Items -> Book
        $order->load(['customer', 'items.book']);

        return Inertia::render('Orders/Show', [
            'order' => $order
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
        'status' => 'required|in:pending,completed,cancelled',
        'cancel_reason' => 'required_if:status,cancelled|nullable|string',
    ]);

        // 2. Update explicitly to be safe
        $order->status = $request->status;
        
        // If status is NOT cancelled, clear the reason
        if ($request->status !== 'cancelled') {
            $order->cancel_reason = null;
        } else {
            $order->cancel_reason = $request->cancel_reason;
        }

        $order->save();

        return back();
    }
}
