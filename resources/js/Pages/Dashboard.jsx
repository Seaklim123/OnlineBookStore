import React from 'react';
import AdminLTELayout from '../Layouts/AdminLayout'; 
import { Head } from '@inertiajs/react';
import Breadcrumb from '@/Components/Breadcrumb';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Dashboard = ({ salesData = [], quickStats = {} }) => { 
    const title = 'Dashboard';
    
    // --- ADDED THIS SECTION TO FIX THE REFERENCE ERROR ---
    const linksBreadcrumb = [
        { title: 'Home', url: '/' }, 
        { title: title, url: '' }
    ];

    const stats = [
        { 
            label: "Today's Orders", 
            value: quickStats?.todaySalesCount || 0, 
            icon: 'fas fa-shopping-cart', 
            color: 'primary' 
        },
        { 
            label: 'Total Revenue', 
            value: `$${Number(quickStats?.totalRevenue || 0).toLocaleString()}`, 
            icon: 'fas fa-dollar-sign', 
            color: 'success' 
        },
        { 
            label: 'Pending Orders', 
            value: quickStats?.pendingOrders || 0, 
            icon: 'fas fa-clock', 
            color: 'warning' 
        },
        { 
            label: 'Active Users', 
            value: quickStats?.totalUsers || 0, 
            icon: 'fas fa-users', 
            color: 'info' 
        },
    ];

    return (
        <AdminLTELayout breadcrumb={<Breadcrumb header={title} links={linksBreadcrumb} />}>
            <Head title={title} />

            <section className="content">
                <div className="container-fluid">

                    {/* STATS CARDS */}
                    <div className="row">
                        {stats.map((item, index) => (
                            <div className="col-lg-3 col-md-6 mb-4" key={index}>
                                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '14px' }}>
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="text-muted mb-1">{item.label}</h6>
                                            <h3 className="fw-bold mb-0">{item.value}</h3>
                                        </div>
                                        <div className={`text-${item.color}`} style={{ fontSize: '24px', background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '10px' }}>
                                            <i className={item.icon}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        {/* AREA CHART */}
                        <div className="col-md-8">
                            <div className="card shadow-sm border-0" style={{ borderRadius: '14px' }}>
                                <div className="card-header bg-white border-0 py-3">
                                    <h5 className="mb-0 font-weight-bold">Sales Trends (Last 7 Days)</h5>
                                </div>
                                <div className="card-body" style={{ height: '350px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#007bff" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                                            <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Area type="monotone" dataKey="amount" stroke="#007bff" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* QUICK INFO */}
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0" style={{ borderRadius: '14px' }}>
                                <div className="card-header bg-white border-0 py-3">
                                    <h5 className="mb-0 font-weight-bold">Inventory Summary</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="text-muted">Total Products</span>
                                        <span className="font-weight-bold">{quickStats?.totalProducts || 0}</span>
                                    </div>
                                    <hr />
                                    <div className="text-center py-2">
                                        <p className="text-muted small mb-0">Database Status</p>
                                        <span className="badge badge-success px-3 py-2">Connected & Healthy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLTELayout>
    );
};

export default Dashboard;
