import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import Loader from '../Layout/Loader';
import { MDBDataTable } from "mdbreact"
import { Link } from 'react-router-dom';

import { useDeleteProductMutation, useGetAdminProductsQuery } from '../../Redux/Api/productsApi';
import AdminLayout from '../Layout/AdminLayout';

const ListProducts = () => {
    const { isLoading, data, error } = useGetAdminProductsQuery();
    const [deleteProduct, { isLoading: DeleteLoading, error: DeleteError, isSuccess }] = useDeleteProductMutation();


    useEffect(() => {
        if (isSuccess) {
            toast.success("Product Deleted");
        }
        if (error) {
            toast.error(error.data.message);
        }
        if (DeleteError) {
            toast.error(DeleteError.data.message);
        }
    }, [error, DeleteError, isSuccess])

    const deleteHandler = (productId) => {
        console.log(productId)
        deleteProduct(productId)
    }
    const setProducts = () => {
        const products = {
            columns: [
                {
                    label: "ID", field: "id", sort: "asc"
                },
                {
                    label: "Name", field: "name", sort: "asc"
                }, {
                    label: "Stock", field: "stock", sort: "asc"
                },
                {
                    label: "Actions", field: "actions", sort: "asc"
                }
            ],
            rows: []
        }

        if (data && data.products) {
            data.products.forEach(product => {
                products.rows.push({
                    id: product._id,
                    name: `${product.name.substring(0, 20)}...`,
                    stock: product.stock,
                    actions: (
                        <>
                            <Link to={`/admin/product/${product._id}`} className="btn btn-outline-primary">
                                <i className='fa fa-pencil'></i>
                            </Link>
                            <Link to={`/admin/product/${product._id}/upload_images`} className="btn btn-outline-success ms-2">
                                <i className='fa fa-image'></i>
                            </Link>
                            <button className="btn btn-outline-danger ms-2" disabled={DeleteLoading} onClick={() => deleteHandler(product?._id)}>
                                <i className='fa fa-trash'></i>
                            </button>
                        </>
                    )
                });
            });
        }

        return products;
    }
    if (isLoading) return <Loader />
    return (
        <AdminLayout>
            <h1 className='my-5'>{data && data.products.length} Products</h1>
            <MDBDataTable data={setProducts()} className='px-3' striped bordered hover />
        </AdminLayout>
    )
}

export default ListProducts
