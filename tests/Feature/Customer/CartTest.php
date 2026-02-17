<?php

namespace Tests\Feature\Customer;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Book;
use App\Models\User;

class CartTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    use RefreshDatabase;

    // tests/Feature/Customer/CartTest.php
public function test_user_can_add_book_to_cart()
{
    $user = User::factory()->create();
    $book = Book::factory()->create(['stock' => 10, 'price' => 20]);

    // 1. Act: Call the 'add' method
    $response = $this->actingAs($user)->post(route('cart.add', $book->id), [
        'quantity' => 2
    ]);

    // 2. Assert: Check Database instead of Session
    $response->assertStatus(302);
    
    $this->assertDatabaseHas('shopping_carts', [
        'customer_id' => $user->id,
        'status' => 0,
    ]);

    $this->assertDatabaseHas('shopping_cart_items', [
        'book_id' => $book->id,
        'quantity' => 2,
    ]);
}

}