import Breadcrumb from '@/Components/Breadcrumb';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import Pagination from '@/Components/Pagination';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import moment from 'moment';
import { useState } from 'react';

export default function CategoriesPage({ categoryData }) {
    const datasList = categoryData.data;
    const [confirmingDataDeletion, setConfirmingDataDeletion] = useState(false);
    const [dataEdit, setDataEdit] = useState({});

    const { data: deleteData, setData: setDeleteData, delete: destroy, processing, reset, clearErrors } =
        useForm({
            id: '',
            name: ''
        });

    const confirmDataDeletion = (data) => {
        setDataEdit(data);
        setDeleteData('id', data.id);
        setDeleteData('name', data.name);
        setConfirmingDataDeletion(true);
    };

    const closeModal = () => {
        setConfirmingDataDeletion(false);
        setDataEdit({});
        clearErrors();
        reset();
    };

    const deleteDataRow = (e) => {
        e.preventDefault();
        destroy(route('categories.destroy', dataEdit.id), {
            preserveScroll: true,
            onSuccess: closeModal,
            onFinish: reset,
        });
    };

    const headWeb = 'Category List';
    const linksBreadcrumb = [
        {
            title: 'Create',
            type: 'button',
            url: route('categories.create'),
            className: 'btn btn-primary btn-sm'
        }
    ];

    return (
        <AdminLayout breadcrumb={<Breadcrumb header={headWeb} links={linksBreadcrumb} />}>
            <Head title={headWeb} />
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-outline card-info">
                            <div className="card-header">
                                <h3 className="card-title">Datalist Management</h3>
                                <div className="card-tools">
                                    <div className="input-group input-group-sm" style={{ width: '150px' }}>
                                        <input
                                            type="text"
                                            name="table_search"
                                            className="form-control float-right"
                                            placeholder="Search"
                                        />
                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-default">
                                                <i className="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datasList.length > 0 ? (
                                            datasList.map((item, k) => (
                                                <tr key={k}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>

                                                    {/* STATUS: Based on category 'status' field */}
                                                    <td>
                                                        {item.status ? (
                                                            <span className="badge badge-success">Active</span>
                                                        ) : (
                                                            <span className="badge badge-danger">Out of Stock</span>
                                                        )}
                                                    </td>

                                                    <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>

                                                    <td width="170">
                                                        <Link
                                                            href={route('categories.edit', item.id)}
                                                            className="btn btn-info btn-xs mr-2"
                                                        >
                                                            <i className="fas fa-edit"></i> Edit
                                                        </Link>

                                                        <button
                                                            onClick={() => confirmDataDeletion(item)}
                                                            type="button"
                                                            className="btn btn-danger btn-xs"
                                                        >
                                                            <i className="fas fa-trash"></i> Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5}>There are no records!</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <Modal show={confirmingDataDeletion} onClose={closeModal}>
                                    <form onSubmit={deleteDataRow} className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900">Confirmation!</h2>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Are you sure you want to delete{' '}
                                            <span className="text-lg font-medium">{deleteData.name}</span>?
                                        </p>
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={closeModal}
                                            >
                                                No
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-danger ms-3"
                                                disabled={processing}
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    </form>
                                </Modal>
                            </div>

                            <div className="card-footer clearfix">
                                <Pagination links={categoryData.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}
