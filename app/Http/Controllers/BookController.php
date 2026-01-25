<?php

namespace App\Http\Controllers;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        return Inertia::render('Books/Index', [
            'books' => Book::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Books/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'author' => 'required',
            'cover_image' => 'nullable|image',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);
        Book::create($request->all());

        return redirect()->route('books.index');
    }

    public function show(Book $book)
    {
        return Inertia::render('Books/Show', [
            'book' => $book
        ]);
    }

    public function edit(Book $book)
    {
        return Inertia::render('Books/Edit', [
            'book' => $book
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $book->update($request->all());
        return redirect()->route('books.index');
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('books.index');
    }
}
