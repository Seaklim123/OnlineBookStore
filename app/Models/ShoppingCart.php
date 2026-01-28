<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;


class ShoppingCart extends Model
{
    protected $fillable = ['customer_id', 'status', 'total_price'];

    public function items(): HasMany
    {
    return $this->hasMany(ShoppingCartItem::class, 'shopping_cart_id');
    }

    public function customer()
    {
    return $this->belongsTo(User::class, 'customer_id');
    }
}
