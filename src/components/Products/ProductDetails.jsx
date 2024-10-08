import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../../Redux/Api/productsApi'
import toast from 'react-hot-toast'
import Loader from '../Layout/Loader'
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux'
import { setCartItem } from '../../Redux/features/cartSlice'
import NewReviews from '../reviews/NewReviews'
import ListReviews from '../reviews/ListReviews'
import NotFound from '../Layout/NotFound'

const ProductDetails = () => {
    const dispatch = useDispatch();
    const [activeImage, setActiveImage] = useState("")
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams()
    const { data, error, isLoading, isError } = useGetProductDetailsQuery(id)
    // console.log(data && data.product)
    const product = data && data.product;

    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        setActiveImage(product && product.images[0] ? product.images[0].url : "no Image")

    }, [product])

    useEffect(() => {
        if (isError) {
            toast.success(error.data.message)
        }
    }, [isError])

    const DecreaseQty = () => {
        const count = document.querySelector(".count");
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }
    const increaseQty = () => {
        const count = document.querySelector(".count");
        if (count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    const setItemToCart = () => {
        const CartItem = {
            product: product?._id,
            name: product?.name,
            image: product?.images[0].url,
            stock: product?.stock,
            price: product?.price,
            quantity
        }
        dispatch(setCartItem(CartItem));
        toast.success("Item added to Cart");
    }
    if (isLoading) {
        return <Loader />
    }

    if (error && error?.status == 404) {
        return <NotFound /> 
    }

    // console.log(product)
    return (
        <div>
            <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <div className="p-3">
                        <img
                            className="d-block w-100"
                            src={activeImage}
                            alt=""
                            width="340"
                            height="390"
                        />
                    </div>
                    <div className="row justify-content-start mt-5">
                        {product.images.map((img, index) =>
                            <div key={index} className="col-2 ms-4 mt-2">
                                <a role="button">
                                    <img
                                        className={`d-block border rounded p-3 cursor-pointer ${img?.url === activeImage ? "border-warning" : ""}`}
                                        height="100"
                                        width="100"
                                        src={img?.url}
                                        alt=""
                                        onClick={(e) => setActiveImage(img?.url)}
                                    />
                                </a>
                            </div>
                        )}
                    </div>

                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    <p id="product_id">Product # {product._id}</p>

                    <hr />

                    <div className="d-flex">
                        <StarRatings
                            rating={product.ratings}
                            starRatedColor="#ffb829"
                            numberOfStars={5}
                            name='rating'
                            starDimension='22px'
                            starSpacing='1px'
                        />
                        <span id="no-of-reviews" className="pt-1 ps-2"> ({product.numOfReviews} Reviews) </span>
                    </div>
                    <hr />

                    <p id="product_price">$ {product.price}</p>
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={DecreaseQty}>-</span>
                        <input
                            type="number"
                            className="form-control count d-inline"
                            value={quantity}
                            readOnly
                        />
                        <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                    </div>
                    <button
                        type="button"
                        id="cart_btn"
                        className="btn btn-primary d-inline ms-4"
                        disabled={product.stock <= 0}
                        onClick={setItemToCart}
                    >
                        Add to Cart
                    </button>

                    <hr />

                    <p>
                        Status: <span id="stock_status" className={product.stock > 0 ? "greenColor" : "redColor"}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                    </p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>
                        {product.description}
                    </p>
                    <hr />
                    <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                    {isAuthenticated ? <NewReviews productId={product._id} /> : (

                        <div className="alert alert-danger my-5" type="alert">
                            Login to post your review.
                        </div>
                    )}
                </div>
                {product?.reviews?.length > 0 && <ListReviews reviews={product.reviews} />}
            </div>
        </div>
    )
}

export default ProductDetails
