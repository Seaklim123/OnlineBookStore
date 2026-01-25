import { Link, usePage } from '@inertiajs/react';
import $ from 'jquery';
import 'admin-lte/dist/css/adminlte.min.css'; // Ensure styles are loaded
import 'admin-lte/dist/js/adminlte.min.js';
import { useEffect } from 'react';

export default function MenuSideBar({ }) {
    const { url, auth } = usePage().props;
    const can = auth?.can ?? {};
    useEffect(() => {
        // Ensure dropdowns, tooltips, and modals work
        $('[data-toggle="dropdown"]').dropdown();
    }, []);

    useEffect(() => {
        // Initialize AdminLTE sidebar treeview
        $('[data-widget="treeview"]').each(function () {
            $(this).Treeview('init');
        });
    }, []);

    return (
        <>
            {/* Sidebar */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link href="/" className="brand-link">
                    <span className="brand-text font-weight-light">ADMIN</span>
                </Link>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={'/images/avatar.png'} className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <Link href="#" className="d-block"><span> {auth?.user?.name} </span></Link>
                        </div>
                    </div>

                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <Link href={route('dashboard')} className={`nav-link ${route().current('dashboard') && 'active'}`}>
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link href="#" className="nav-link">
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Widgets
                                        <span className="right badge badge-danger">New</span>
                                    </p>
                                </Link>
                            </li> */}
                            {can['category-list'] && (
                                <li className="nav-header">SETTING</li>
                            )}
                            {/* {can['category-list'] && (
                                <>
                                
                                <li className={`nav-item ${(route().current('categories.index') || route().current('categories.create')) && 'menu-is-opening menu-open'}`}>
                                    <a href="#" className={`nav-link ${(route().current('categories.index') || route().current('categories.create')) && 'active'}`}>
                                        <i className="nav-icon far fa-plus-square"></i>
                                        <p> CATEGORY </p>                                           
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">                                          
                                            <Link href={route('categories.index')} className={`nav-link ${route().current('categories.index') && 'active'}`}>
                                                <i className="fa-solid fa-list-ul nav-icon text-warning"></i>
                                                <p>CATEGORY</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                </>
                            )} */}

                            <li className="nav-item px-2 mb-1"> {/* Added padding and margin for better alignment */}
                                <Link
                                    href={route('categories.index')}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition duration-200 ${
                                        route().current('categories.index')
                                            ? 'bg-blue-600 text-white active'
                                            : 'text-gray-300 hover:bg-gray-800'
                                    }`}
                                >
                                    {/* Reduced icon size to text-base and margin */}
                                    <i className="fa-solid fa-table-cells text-base"></i>
                                    
                                    {/* Reduced font size to text-sm for a cleaner sidebar look */}
                                    <span className="text-sm font-medium">Category</span>
                                </Link>
                            </li>

                            <li className="nav-item px-2 mb-1"> {/* Added padding and margin for better alignment */}
                                <Link
                                    href={route('books.index')}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition duration-200 ${
                                        route().current('books.index')
                                            ? 'bg-blue-600 text-white active'
                                            : 'text-gray-300 hover:bg-gray-800'
                                    }`}
                                >
                                    {/* Reduced icon size to text-base and margin */}
                                    <i className="fas fa-book text-base"></i>
                                    
                                    {/* Reduced font size to text-sm for a cleaner sidebar look */}
                                    <span className="text-sm font-medium">Book</span>
                                </Link>
                            </li>

                            <li className="nav-item px-2 mb-1"> {/* Added padding and margin for better alignment */}
                                <Link
                                    href={route('orders.index')}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition duration-200 ${
                                        route().current('orders.index')
                                            ? 'bg-blue-600 text-white active'
                                            : 'text-gray-300 hover:bg-gray-800'
                                    }`}
                                >
                                    {/* Reduced icon size to text-base and margin */}
                                    <i className="fa-solid fa-cart-shopping text-base"></i>
                                    
                                    {/* Reduced font size to text-sm for a cleaner sidebar look */}
                                    <span className="text-sm font-medium">Order</span>
                                </Link>
                            </li>

                            {can['role-list' || 'user-list'] && (
                                <li className="nav-header">AUTHENTICATION</li>
                            )}
                            {can['role-list'] && (
                                <>
                                <li className={`nav-item ${(route().current('roles.index') || route().current('roles.create')) && 'menu-is-opening menu-open'}`}>
                                    <a href="#" className={`nav-link ${(route().current('roles.index') || route().current('roles.create')) && 'active'}`}>
                                        <i className="nav-icon far fa-plus-square"></i>
                                        <p> ROLE
                                            <i className="fas fa-angle-left right"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link href={route('roles.index')} className={`nav-link ${route().current('roles.index') && 'active'}`}>
                                                <i className="fa-solid fa-list-ul nav-icon text-warning"></i>
                                                <p>LIST</p>
                                            </Link>
                                        </li>
                                        {can['role-create'] && (
                                            <li className="nav-item">
                                                <Link href={route('roles.create')} className={`nav-link ${route().current('roles.create') && 'active'}`}>
                                                    <i className="fa-regular fa-square-plus nav-icon text-info"></i>
                                                    <p>CREATE</p>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                                </>
                            )}
                            {can['user-list'] && (
                                <>
                                <li className={`nav-item ${(route().current('users.index') || route().current('users.create')) && 'menu-is-opening menu-open'}`}>
                                    <a href="#" className={`nav-link ${(route().current('users.index') || route().current('users.create')) && 'active'}`}>
                                        <i className="nav-icon far fa-plus-square"></i>
                                        <p> USER
                                            <i className="fas fa-angle-left right"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link href={route('users.index')} className={`nav-link ${route().current('users.index') && 'active'}`}>
                                                <i className="fa-solid fa-list-ul nav-icon text-warning"></i>
                                                <p>LIST</p>
                                            </Link>
                                        </li>
                                        {can['user-create'] && (
                                            <li className="nav-item">
                                                <Link href={route('users.create')} className={`nav-link ${route().current('users.create') && 'active'}`}>
                                                    <i className="fa-regular fa-square-plus nav-icon text-info"></i>
                                                    <p>CREATE</p>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}
