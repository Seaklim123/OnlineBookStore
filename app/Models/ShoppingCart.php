<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    public function items()
    {
        return $this->hasMany(ShoppingCartItem::class);
    }
}
