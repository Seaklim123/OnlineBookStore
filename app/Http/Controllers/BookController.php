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

    if ($request->search) {
        $query->where('title', 'like', '%' . $request->search . '%')
              ->orWhere('author', 'like', '%' . $request->search . '%');
    }
        return Inertia::render('Books/Index', [
            'bookData' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only('search'),
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
        'author'      => 'required|string|max:255',
        'price'       => 'required|numeric|min:0',
        'stock'       => 'required|integer|min:0',
        'cover_image' => 'nullable|image|max:2048', // Max 2MB
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
