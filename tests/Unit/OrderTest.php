<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\Order;

class OrderTest extends TestCase
{
    #[\PHPUnit\Framework\Attributes\Test]
    public function order_can_be_cancelled_with_reason()
    {
        $order = new Order(['status' => 'pending']);

        $order->status = 'cancelled';
        $order->cancel_reason = 'Out of stock';

        $this->assertEquals('cancelled', $order->status);
        $this->assertEquals('Out of stock', $order->cancel_reason);
    }

    #[\PHPUnit\Framework\Attributes\Test]
    public function it_sets_initial_order_status_to_pending()
    {
        $order = new Order(['status' => 'pending']);
        $this->assertEquals('pending', $order->status);
    }
}
