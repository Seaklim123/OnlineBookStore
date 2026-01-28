<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\ShoppingCart;
use App\Models\ShoppingCartItem;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShoppingCartController extends Controller
{
     public function index()
    {
        $cart = ShoppingCart::with('items.book')
            ->where('customer_id', Auth::id())
            ->where('status', 0)
            ->first();

        return Inertia::render('Customer/Cart/Index', [
            'cart' => $cart
        ]);
    }

    // app/Http/Controllers/Customer/ShoppingCartController.php

public function add(Request $request, $book)
{
    $request->validate([
        'quantity' => 'required|integer|min:1',
    ]);

    $bookModel = Book::findOrFail($book);

    $cart = ShoppingCart::firstOrCreate([
        'customer_id' => Auth::id(),
        'status' => 0,
    ]);

    // The result of this operation is what we need to inspect
    $cartItem = $cart->items()->updateOrCreate(
        ['book_id' => $bookModel->id],
        [
            'quantity' => $request->quantity,
            'price' => $bookModel->price,
        ]
    );
    
    

    return back()->with('success', 'Book added!');
}



    public function update(Request $request, ShoppingCartItem $cartItem)
{
    $request->validate([
        'quantity' => 'required|integer|min:1',
    ]);
    

    $cartItem->update([
        'quantity' => $request->quantity
    ]);

    return back()->with('success', 'Quantity updated');
}

public function destroy(ShoppingCartItem $cartItem) // Change 'destroy' to 'remove'
{
    $cartItem->delete();

    return back()->with('success', 'Item removed');
}
}
