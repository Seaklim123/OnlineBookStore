<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
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
}
