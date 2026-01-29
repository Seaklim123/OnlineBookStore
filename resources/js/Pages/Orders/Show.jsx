import Breadcrumb from '@/Components/Breadcrumb';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import moment from 'moment';

export default function OrderShow({ order }) {
    const headWeb = 'Order Details';
    const linksBreadcrumb = [
        { title: 'Home', url: '/dashboard' },
        { title: 'Orders', url: route('orders.index') },
        { title: headWeb, url: '' },
    ];

    return (
        <AdminLayout breadcrumb={<Breadcrumb header={headWeb} links={linksBreadcrumb} />}>
            <Head title={headWeb} />

            <section className="content">
                <div className="row">
                    {/* Customer & Shipping Info */}
                    <div className="col-md-4">
                        {/* START: Cancellation Alert */}
                        {order.status === 'cancelled' && (
                            <div className="alert alert-danger shadow-sm mb-3">
                                <h5><i className="icon fas fa-ban"></i> Order Cancelled</h5>
                                <strong>Reason:</strong> {order.cancel_reason || 'No reason provided.'}
                            </div>
                        )}
                        {/* END: Cancellation Alert */}

                        <div className="card card-outline card-info">
                            <div className="card-header">
                                <h3 className="card-title font-weight-bold">Order Information</h3>
                                <div className="card-tools">
                                    <span className={`badge ${order.status === 'completed' ? 'badge-success' : order.status === 'cancelled' ? 'badge-danger' : 'badge-warning'}`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body">
                                <strong><i className="fas fa-user mr-1"></i> Customer</strong>
                                <p className="text-muted">{order.customer?.name} ({order.customer?.email})</p>
                                <hr />
                                <strong><i className="fas fa-phone mr-1"></i> Phone</strong>
                                <p className="text-muted">{order.phone_number}</p>
                                <hr />
                                <strong><i className="fas fa-map-marker-alt mr-1"></i> Shipping Address</strong>
                                <p className="text-muted">{order.shipping_address}</p>
                                <hr />
                                <strong><i className="fas fa-credit-card mr-1"></i> Payment Method</strong>
                                <p className="text-muted text-capitalize">{order.payment_method}</p>
                                <hr />
                                <strong><i className="fas fa-calendar mr-1"></i> Order Date</strong>
                                <p className="text-muted">{moment(order.order_date).format('DD MMMM YYYY, HH:mm')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items Table */}
                    <div className="col-md-8">
                        <div className="card card-outline card-primary">
                            <div className="card-header">
                                <h3 className="card-title font-weight-bold">Ordered Books</h3>
                                <div className="card-tools">
                                    <span className="badge badge-primary p-2">Total: ${Number(order.order_total).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Book Title</th>
                                            <th className="text-center">Price</th>
                                            <th className="text-center">Quantity</th>
                                            <th className="text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items?.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.book?.title || 'Unknown Book'}</td>
                                                <td className="text-center">${Number(item.price).toFixed(2)}</td>
                                                <td className="text-center">{item.quantity}</td>
                                                <td className="text-right font-weight-bold">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colSpan="3" className="text-right">Grand Total:</th>
                                            <th className="text-right text-primary text-lg">${Number(order.order_total).toFixed(2)}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* Transaction Receipt Image */}
                        {order.transaction_image && (
                            <div className="card card-outline card-secondary mt-3">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="fas fa-image mr-1"></i> Payment Receipt</h3>
                                    <div className="card-tools">
                                        <a href={`/storage/${order.transaction_image}`} target="_blank" className="btn btn-tool">
                                            <i className="fas fa-download"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <img 
                                        src={`/storage/${order.transaction_image}`} 
                                        alt="Receipt" 
                                        className="img-fluid img-thumbnail"
                                        style={{ maxHeight: '500px' }} 
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}
