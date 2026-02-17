<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory; 

    protected $fillable = [
        'category_id', 
        'title', 
        'pages',
        'author', 
        'description',
        'price', 
        'stock', 
        'cover_image'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function isAvailable(): bool
    {
        return $this->stock > 0;
    }

    // public function getDiscountedPrice(int $percent): float
    // {
    //     return $this->price - ($this->price * ($percent / 100));
    // }
}
