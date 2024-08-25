import React, { useEffect } from 'react'
import { useGetAllOrdersQuery } from '../../Redux/Api/orderApi'
import toast from 'react-hot-toast';
import Loader from '../Layout/Loader';
import { MDBDataTable } from "mdbreact"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../Redux/features/cartSlice';

const MyOrders = () => {
    const { isLoading, data, error } = useGetAllOrdersQuery();
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const OrderSuccess = searchParams.get("order_success");

    useEffect(() => {
        if (OrderSuccess) {
            dispatch(clearCart())
            nav("/me/orders")

        }
        if (error) {
            toast.error(error.data.message);
        }
    }, [error, OrderSuccess, dispatch, nav])
    const setOrders = () => {
        const orders = {
            columns: [
                {
                    label: "ID", field: "id", sort: "asc"
                },
                {
                    label: "Amount Paid", field: "amount", sort: "asc"
                }, {
                    label: "Payment Status", field: "status", sort: "asc"
                }, {
                    label: "Order Status", field: "orderStatus", sort: "asc"
                },
                {
                    label: "Actions", field: "actions", sort: "asc"
                }
            ],
            rows: []
        }

        if (data && data.myorder) {
            data.myorder.forEach(order => {
                orders.rows.push({
                    id: order._id,
                    amount: `$${order.totalAmount}`, // Add currency formatting if needed
                    status: order.paymentInfo.status.toUpperCase(),
                    orderStatus: order.orderStatus,
                    actions: (
                        <>
                            <Link to={`/me/order/${order._id}`} className="btn btn-primary">
                                <i className='fa fa-eye'></i>
                            </Link>
                            <Link to={`/invoice/order/${order._id}`} className="btn btn-success ms-2">
                                <i className='fa fa-print'></i>
                            </Link>
                        </>
                    )
                });
            });
        }

        return orders;
    }
    if (isLoading) return <Loader />
    return (
        <div>
            <h1 className='my-5'>{data && data.myorder.length} Orders</h1>
            <MDBDataTable data={setOrders()} className='px-3' striped bordered hover />
        </div>
    )
}

export default MyOrders
