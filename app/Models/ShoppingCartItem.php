<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingCartItem extends Model
{
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
