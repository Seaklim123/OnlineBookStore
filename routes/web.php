<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ShoppingCartController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware('role:admin')->name('dashboard');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/about', function () {
    return Inertia::render('Dashboard');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Dashboard');
})->name('contact');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index')->middleware(['check:category-list']);
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create')->middleware(['check:category-create']);
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::patch('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
    Route::get('/categories/{id}', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    // ===== BOOKS =====
    Route::get('/books', [BookController::class, 'index'])->name('books.index')->middleware(['check:book-list']);
    Route::get('/books/create', [BookController::class, 'create'])->name('books.create')->middleware(['check:book-create']);
    Route::post('/books', [BookController::class, 'store'])->name('books.store');
    Route::get('/books/{id}', [BookController::class, 'show'])->name('books.show');
    Route::get('/books/{book}/edit', [BookController::class, 'edit'])->name('books.edit');
    Route::patch('/books/{book}', [BookController::class, 'update'])->name('books.update');
    // Route::get('/books/{id}', [BookController::class, 'edit'])->name('books.edit');
    Route::delete('/books/{book}', [BookController::class, 'destroy'])->name('books.destroy');

    // ===== ORDERS =====
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.show');

    // ===== PAYMENTS =====
    Route::post('/payments/{id}', [PaymentController::class, 'store'])->name('payments.store');

    // ===== SHOPPING CART =====
    Route::get('/cart', [ShoppingCartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [ShoppingCartController::class, 'add'])->name('cart.add');
    Route::put('/cart/item/{id}', [ShoppingCartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/item/{id}', [ShoppingCartController::class, 'remove'])->name('cart.remove');


    // ===== ROLES & USERS =====
    Route::prefix('roles')->group(function () {
        Route::get('/', [RolesController::class, 'index'])->name('roles.index')->middleware(['check:role-list']);
        Route::get('/create', [RolesController::class, 'create'])->name('roles.create')->middleware(['check:role-create']);
        Route::get('/{id}', [RolesController::class, 'edit'])->name('roles.edit')->middleware(['check:role-edit']);
        Route::post("/", [RolesController::class, 'store'])->name('roles.store');
        Route::patch("/{id}", [RolesController::class, 'update'])->name('roles.update');
        Route::delete("/{id}", [RolesController::class, 'destroy'])->name('roles.destroy')->middleware(['check:role-delete']);
    });
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('users.index')->middleware(['check:user-list']);
        Route::get('/create', [UserController::class, 'create'])->name('users.create')->middleware(['check:user-create']);
        Route::get('/{id}', [UserController::class, 'edit'])->name('users.edit')->middleware(['check:user-edit']);
        Route::post("/", [UserController::class, 'store'])->name('users.store');
        Route::patch("/{id}", [UserController::class, 'update'])->name('users.update');
        Route::delete("/{id}", [UserController::class, 'destroy'])->name('users.destroy')->middleware(['check:user-delete']);
    });
});

require __DIR__.'/auth.php';
