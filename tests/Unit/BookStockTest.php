<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class BookStockTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function it_can_check_if_stock_is_available()
    {
        // Arrange: Book has 5 in stock
        $book = new Book(['stock' => 5]);

        // Act & Assert
        $this->assertTrue($book->stock >= 1); // Logic check
    }

    public function test_book_can_tell_if_it_has_enough_stock()
    {
        $book = new \App\Models\Book(['stock' => 5]);

        $this->assertTrue($book->stock >= 3); 
        $this->assertFalse($book->stock >= 10); 
    }
}
