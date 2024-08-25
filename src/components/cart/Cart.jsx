import React from 'react'
import MetaData from '../Layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { setCartItem, removeCartItem } from '../../Redux/features/cartSlice';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const DecreaseQty = (item, quantity) => {
        const Newqty = quantity - 1;
        if (Newqty <= 0) return;
        setItemToCart(item, Newqty);
    }
    const increaseQty = (item, quantity) => {
        const Newqty = quantity + 1;
        if (Newqty > item.stock) return;
        setItemToCart(item, Newqty);
    }
    const RemoveCartItem = (id) => {
        dispatch(removeCartItem(id))
    }
    const setItemToCart = (item, Newqty) => {
        const CartItem = {
            product: item.product,
            name: item.name,
            image: item.image,
            stock: item.stock,
            price: item.price,
            quantity: Newqty
        }
        dispatch(setCartItem(CartItem));
        // toast.success("Item added to Cart");
    }

    const handleCheckOut = () => {
        nav("/shipping");
    }
    return (
        <>
            <MetaData title={'Your Cart'} />
            {cartItems.length == 0 ? <h2 className="mt-5">Your Cart is Empty</h2> :
                <>
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">

                            {cartItems.map((item, index) => (
                                <>
                                    <hr />
                                    <div className="cart-item" data-key="product1">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.image}
                                                    height="90"
                                                    width="115"
                                                />
                                            </div>
                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product}`}> {item.name} </Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => DecreaseQty(item, item.quantity)}> - </span>
                                                    <input
                                                        type="number"
                                                        className="form-control count d-inline"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <span className="btn btn-primary plus" onClick={() => increaseQty(item, item.quantity)}> + </span>
                                                </div>
                                            </div>
                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => RemoveCartItem(item.product)}></i>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            ))}


                            Add more cart items here as needed
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Units: <span className="order-summary-values">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>
                                <hr />
                                <button id="checkout_btn" className="btn btn-primary w-100" onClick={handleCheckOut}>
                                    Check out
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }


        </>
    )
}

export default Cart
