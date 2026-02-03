<?php

namespace App\Http\Controllers;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::with('category');

    // 1. Search by title or author
        $query->when($request->search, function ($q, $search) {
       
        $q->where(function ($subQuery) use ($search) {
            $subQuery->where('title', 'like', '%' . $search . '%')
                     ->orWhere('author', 'like', '%' . $search . '%');
        });
    });

    // 2. Category Filter
        $query->when($request->category_id, function ($q, $categoryId) {
        $q->where('category_id', $categoryId);
    });

    // 3. Price Range Filters
        $query->when($request->min_price, function ($q, $min) {
        $q->where('price', '>=', $min);
    });

     $query->when($request->max_price, function ($q, $max) {
        $q->where('price', '<=', $max);
    });

    // if ($request->search) {
    //     $query->where('title', 'like', '%' . $request->search . '%')
    //           ->orWhere('author', 'like', '%' . $request->search . '%');
    // }
        return Inertia::render('Books/Index', [
        'bookData' => $query->paginate(10)->withQueryString(),
        'filters' => $request->only(['search', 'category_id', 'min_price', 'max_price']),
        'categories' => Category::all(), 
    ]);
    }

    public function create()
    {
        $categories = Category::where('status', 1)->get();
        return Inertia::render('Books/CreateEdit', [
            'datas' => null,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
    $request->validate([
        'category_id' => 'required|exists:categories,id',
        'title'       => 'required|string|max:255',
        'pages'       => 'required|string|max:255',
        'author'      => 'required|string|max:255',
        'price'       => 'required|numeric|min:0',
        'stock'       => 'required|integer|min:0',
        'cover_image' => 'nullable|image|max:2048', 
    ]);

    // Handle File Upload if exists
    $data = $request->all();
    if ($request->hasFile('cover_image')) {
        $data['cover_image'] = $request->file('cover_image')->store('covers', 'public');
    }

    Book::create($data);

    return redirect()->route('books.index')->with('success', 'Book created successfully.');
    }

    public function show(Book $book)
    {
        return Inertia::render('Books/Show', [
            'book' => $book
        ]);
    }

    public function edit(Book $book)
    {
        return Inertia::render('Books/CreateEdit', [
           
            'datas' => $book,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Book $book)
    {
    $request->validate([
        'category_id' => 'required|exists:categories,id',
        'title'       => 'required|string|max:255',
        'pages'       => 'required|string|max:255',
        'author'      => 'required|string|max:255',
        'description' => 'nullable|string',
        'price'       => 'required|numeric|min:0',
        'stock'       => 'required|integer|min:0',
        'cover_image' => 'nullable|image|max:2048',
    ]);

    $data = $request->all();

    if ($request->hasFile('cover_image')) {
        $data['cover_image'] = $request->file('cover_image')->store('covers', 'public');
    }

    $book->update($data);

    return redirect()->route('books.index')->with('success', 'Book updated successfully.');
    }

    public function updateStock(Request $request, Book $book)
    {
    // Optionally, validate stock is non-negative
    $request->validate([
        'stock' => 'required|integer|min:0',
    ]);

    $book->update([
        'stock' => $request->stock
    ]);

    return back()->with('success', 'Stock updated successfully.');
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('books.index');
    }
}
