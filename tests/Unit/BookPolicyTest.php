<?php

namespace Tests\Unit;

use App\Models\Book;
use PHPUnit\Framework\TestCase;
use Mockery;

class BookPolicyTest extends TestCase
{
    /**
     * A basic unit test example.
     */

    public function test_book_is_unavailable_when_stock_is_zero()
    {
        $book = new \App\Models\Book(['stock' => 0]);
        $this->assertFalse($book->isAvailable());
    }

    // public function test_it_calculates_discounted_price()
    // {
    // // Arrange: Create book in memory (NO database)
    // $book = new \App\Models\Book(['price' => 100.00]);

    // // Act: Apply 20% discount
    // $finalPrice = $book->getDiscountedPrice(20);

    // // Assert: Check if 100 - 20% = 80
    // $this->assertEquals(80.00, $finalPrice);
    // }

}
