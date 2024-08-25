import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import Loader from '../Layout/Loader';
import { MDBDataTable } from "mdbreact"
import { Link } from 'react-router-dom';

// import { useDeleteProductMutation, useGetAdminProductsQuery } from '../../Redux/Api/productsApi';
import AdminLayout from '../Layout/AdminLayout';
import { useDeleteOrderMutation, useGetAdminOrdersQuery } from '../../Redux/Api/orderApi';

const ListOrder = () => {
    // const { isLoading, data, error } = useGetAdminProductsQuery();
    // const [deleteProduct, { isLoading: DeleteLoading, error: DeleteError, isSuccess }] = useDeleteProductMutation();
    const { data, error, isLoading } = useGetAdminOrdersQuery();
    const [deleteOrder, { error: DeleteError, isLoading: DeleteLoading, isSuccess }] = useDeleteOrderMutation();
    // console.log(data)

    useEffect(() => {

        if (error) {
            toast.error(error.data.message);
        }

        if (DeleteError) {
            toast.error(DeleteError.data.message);
        }
        if (isSuccess) {
            toast.success("Order deleted");
        }
    }, [error, isSuccess, DeleteError])



    const deleteHandler = (OrderId) => {
        console.log(OrderId)
        deleteOrder(OrderId)
    }
    const setOrders = () => {
        const orders = {
            columns: [
                {
                    label: "ID", field: "id", sort: "asc"
                },
                {
                    label: "Payment Status", field: "paymentStatus", sort: "asc"
                }, {
                    label: "Order Status", field: "orderStatus", sort: "asc"
                },
                {
                    label: "Actions", field: "actions", sort: "asc"
                }
            ],
            rows: []
        }

        if (data?.orders) {
            data.orders.forEach(order => {
                orders.rows.push({
                    id: order._id,
                    paymentStatus: order?.paymentInfo.status,
                    orderStatus: order?.orderStatus,
                    actions: (
                        <>
                            <Link to={`/admin/order/${order._id}`} className="btn btn-outline-primary">
                                <i className='fa fa-pencil'></i>
                            </Link>
                            <button className="btn btn-outline-danger ms-2" onClick={() => deleteHandler(order._id)} disabled={DeleteLoading} >
                                <i className='fa fa-trash'></i>
                            </button>


                        </>
                    )
                });
            });
        }

        return orders;
    }
    if (isLoading) return <Loader />
    return (
        <AdminLayout>
            <h1 className='my-5'>{data && data.orders.length} Orders</h1>
            <MDBDataTable data={setOrders()} className='px-3' striped bordered hover />
        </AdminLayout>
    )
}

export default ListOrder
