<?php

namespace App\Http\Controllers;

use App\Models\ShoppingCart;
use App\Models\ShoppingCartItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShoppingCartController extends Controller
{
    public function index()
    {
        $cart = ShoppingCart::firstOrCreate([
            'user_id' => auth()->id()
        ]);

        return Inertia::render('Cart/Index', [
            'cart' => $cart->load('items.book')
        ]);
    }

    public function add(Request $request)
    {
        $cart = ShoppingCart::firstOrCreate([
            'user_id' => auth()->id()
        ]);

        ShoppingCartItem::updateOrCreate(
            [
                'shopping_cart_id' => $cart->id,
                'book_id' => $request->book_id,
            ],
            [
                'quantity' => $request->quantity ?? 1
            ]
        );

        return redirect()->route('cart.index');
    }

     public function update(Request $request, $id)
    {
        $item = ShoppingCartItem::findOrFail($id);
        $item->update(['quantity' => $request->quantity]);

        return redirect()->route('cart.index');
    }

    public function remove($id)
    {
        ShoppingCartItem::findOrFail($id)->delete();
        return redirect()->route('cart.index');
    }
}
