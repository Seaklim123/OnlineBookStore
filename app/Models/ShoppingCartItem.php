<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingCartItem extends Model

{
 
    protected $fillable = ['shopping_cart_id', 'book_id', 'quantity', 'price'];

    public function cart()
    {
        return $this->belongsTo(ShoppingCart::class, 'shopping_cart_id');
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

}
