import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout'; // Ensure path matches your project
import { Head, Link } from '@inertiajs/react';
import Breadcrumb from '@/Components/Breadcrumb';

const Index = ({ orders, totalRevenue, filters }) => {
    const title = 'Sales Reports';
    const linksBreadcrumb = [{ title: 'Home', url: '/' }, { title, url: '' }];

    return (
        <AdminLayout breadcrumb={<Breadcrumb header={title} links={linksBreadcrumb} />}>
            <Head title={title} />
            
            <div className="container-fluid">
                <div className="card shadow-sm border-0" style={{ borderRadius: '14px' }}>
                    <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                        <h5 className="mb-0 font-weight-bold">Summary Report</h5>
                        {/* Use standard <a> for PDF downloads, NOT Inertia <Link> */}
                        <a 
                            href={route('reports.pdf', filters)} 
                            className="btn btn-danger btn-sm"
                        >
                            <i className="fas fa-file-pdf mr-2"></i> Export PDF
                        </a>
                    </div>
                    <div className="card-body">
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="p-3 bg-light rounded">
                                    <small className="text-muted">Total Completed Revenue</small>
                                    <h3 className="text-primary font-weight-bold mb-0">
                                        ${Number(totalRevenue).toLocaleString()}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th className="text-right">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.customer?.name}</td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="text-right">${Number(order.order_total).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
