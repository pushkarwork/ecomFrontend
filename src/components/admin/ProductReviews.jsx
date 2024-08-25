import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from '../Layout/Loader';
import { MDBDataTable } from "mdbreact"
import { Link } from 'react-router-dom';

import AdminLayout from '../Layout/AdminLayout';
import { useDeleteProductReviewMutation, useLazyGetProductReviewsQuery } from '../../Redux/Api/productsApi';
const ProductReviews = () => {
    // const { data, isLoading, error } = useGetAdminUsersQuery();
    // const [deleteAdminUser, { error: DeleteError, isLoading: DeleteLoading, isSuccess }] = useDeleteAdminUserMutation();
    const [getProductReviews, { data, isLoading, error }] = useLazyGetProductReviewsQuery();
    const [deleteProductReview, { error: DeleteError, isLoading: DeleteLoading, isSuccess }] = useDeleteProductReviewMutation();
    const [productID, setProductID] = useState();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Review Deleted Successfully");
        }
    }, [isSuccess])
    useEffect(() => {

        if (error) {
            toast.error(error.data.message);
        }
        if (DeleteError) {
            toast.error(DeleteError.data.message);
        }



    }, [error, DeleteError])

    const deleteHandler = (id) => {
        // console.log(id)
        deleteProductReview({ productID, id })
    }

    const submitHandler = (e) => {
        e.preventDefault(); // Prevent form submission from causing a page reload
        if (productID) {
            getProductReviews(productID);
        } else {
            toast.error("Please enter a product ID");
        }
    }


    const setReviews = () => {
        const Reviews = {
            columns: [
                {
                    label: "Review ID", field: "id", sort: "asc"
                },
                {
                    label: "Rating", field: "rating", sort: "asc"
                }, {
                    label: "Comment", field: "comment", sort: "asc"
                },
                {
                    label: "User", field: "user", sort: "asc"
                },
                {
                    label: "Actions", field: "actions", sort: "asc"
                }
            ],
            rows: []
        }

        if (data?.allReviews) {
            data.allReviews.forEach(review => {
                Reviews.rows.push({
                    id: review._id,
                    rating: review?.rating,
                    comment: review?.comment,
                    user: review?.user?.name,
                    actions: (
                        <>
                            <button className="btn btn-outline-danger ms-2" disabled={DeleteLoading} onClick={() => deleteHandler(review._id)}  >
                                <i className='fa fa-trash'></i>
                            </button>


                        </>
                    )
                });
            });
        }

        return Reviews;
    }
    if (isLoading) return <Loader />
    return (

        <AdminLayout>
            <div className="row justify-content-center my-5">
                <div className="col-6">
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor="productId_field" className="form-label">
                                Enter Product ID
                            </label>
                            <input
                                type="text"
                                id="productId_field"
                                className="form-control"
                                value={productID}
                                onChange={(e) => setProductID(e.target.value)}
                            />
                        </div>

                        <button
                            id="search_button"
                            type="submit"
                            className="btn btn-primary w-100 py-2"
                        >
                            SEARCH
                        </button>
                    </form>
                </div>
            </div>
            {
                data?.allReviews.length > 0 ? (
                    <MDBDataTable data={setReviews()} className='px-3' striped bordered hover />
                ) : (
                    <p className="mt-5 text-center">No Reviews</p>
                )
            }

        </AdminLayout >
    )
}

export default ProductReviews
