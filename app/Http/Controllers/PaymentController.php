<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request, Order $order)
    {
        $request->validate([
            'method' => 'required'
        ]);

        Payment::create([
            'order_id' => $order->id,
            'amount' => $order->total_price,
            'method' => $request->method,
            'status' => 'paid',
        ]);

        $order->update(['status' => 'paid']);

        return redirect()->route('orders.show', $order->id);
    }
}
