import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/FooterGuest';
import { router } from '@inertiajs/react';

export default function Index({ books, auth, categories }) {
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books.data || []);

    // Filter books whenever search or category changes
    useEffect(() => {
        let filtered = books.data;

        if (search.trim() !== '') {
            filtered = filtered.filter(book =>
                book.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filterCategory) {
            filtered = filtered.filter(
                book => book.category && book.category.id === parseInt(filterCategory)
            );
        }

        setFilteredBooks(filtered);
    }, [search, filterCategory, books.data]);

    const handleViewBook = (bookId) => {
    router.get(`/customer/books/${bookId}`);
    };

    const handleAddToCart = (bookId, quantity = 1) => {
    if (!auth?.user) {
        alert('Please login or register to add books to your cart.');
        router.visit('/login');
        return;
    }

    // Pass bookId as the second argument to 'route'
    // This generates: /cart/add/2
    router.post(route('cart.add', { book: bookId }), { 
        quantity: quantity 
    }, {
        onSuccess: () => {
            alert('Book added to cart!');
        },
        onError: (errors) => {
            console.error(errors);
            alert('Failed to add book to cart.');
        }
    });
    };




    return (
        <>
            <Head title="Books" />
            <Navbar auth={auth} />

            <div className="pt-16 min-h-screen flex flex-col">
                {/* Main content */}
                <div className="container my-5 flex-grow">
                    {/* Filters */}
                    <div className="row mb-4">
                        <div className="col-md-6 mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-2">
                            <select
                                className="form-select"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Book Cards */}
                    <div className="row">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map(book => (
                                <div className="col-md-2 mb-4" key={book.id}>
                                    <div className="card border-0 h-100">
                                        <img
                                            src={book.cover_image ? `/storage/${book.cover_image}` : '/images/no-book.png'}
                                            className="card-img-top"
                                            alt={book.title}
                                        />
                                        <div className="card-body p-2 d-flex flex-column justify-content-between">
                                            <div>
                                                <h6 className="mb-1 text-truncate">{book.title}</h6>
                                                <small className="text-muted">{book.author}</small>
                                                <div>
                                                    <small className="text-primary">
                                                        {book.category?.name || 'No category'}
                                                    </small>
                                                </div>
                                                <div>
                                                    <small className="text-success">
                                                        {book.price ? `${book.price} $` : 'Price not available'}
                                                    </small>
                                                </div>
                                            </div>

                                            {/* Buttons */}
                                            <div className="mt-2 d-flex flex-column gap-2">
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() => handleViewBook(book.id)}
                                                >
                                                    View
                                                </button>

                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleAddToCart(book.id)}
                                                >
                                                    <i className="fas fa-cart-plus mr-1"></i>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <p>No books found.</p>
                            </div>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
