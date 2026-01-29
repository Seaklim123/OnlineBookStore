<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
    'customer_id', 
    'order_date', 
    'order_total', 
    'status', 
    'cancel_reason',
    'phone_number', 
    'shipping_address', 
    'payment_method', 
    'transaction_image'

    ];
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function customer()
    {

        return $this->belongsTo(User::class, 'customer_id');

    }
}
