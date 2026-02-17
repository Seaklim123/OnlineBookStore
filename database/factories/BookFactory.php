<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Category; 
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(), 
            'title'       => fake()->sentence(),
            'pages'       => (string) fake()->randomNumber(3), 
            'author'      => fake()->name(),
            'description' => fake()->paragraph(),
            'price'       => fake()->randomFloat(2, 10, 100),
            'stock'       => fake()->numberBetween(0, 50),
        ];
    }
}
