<?php

namespace Tests\Feature\Admin;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\Book;

class BookManagementTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;

    protected function setUp(): void
    {
    parent::setUp();

    // 1. Create the permission in the test database
    \Spatie\Permission\Models\Permission::create(['name' => 'book-create']);
    
    // 2. Refresh the internal Spatie cache so it sees the new permission
    $this->app->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

    \Spatie\Permission\Models\Role::create(['name' => 'admin'])->givePermissionTo('book-create');
    \Spatie\Permission\Models\Role::create(['name' => 'customer']);
    }

    public function test_customer_cannot_create_a_book()
{
    $customer = User::factory()->create();
    $customer->assignRole('customer');
    $category = \App\Models\Category::factory()->create();

    // CHANGE: Use postJson instead of post
    $response = $this->actingAs($customer)->postJson(route('books.store'), [
        'category_id' => $category->id,
        'title'       => 'Hack Attempt',
        'pages'       => '100',
        'author'      => 'Hacker',
        'price'       => 15.00,
        'stock'       => 5
    ]);

    // Now this will correctly be 403
    $response->assertStatus(403); 
}

}
