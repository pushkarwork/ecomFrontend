import React, { useEffect, useState } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux';
import { CalculateOrderPrice } from '../helpers/helpers';
import { useCreateNewOrderMutation, useStripeCheckoutSessionMutation } from '../../Redux/Api/orderApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PaymentMethod = () => {
    const [method, setMethod] = useState("");
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth)

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = CalculateOrderPrice(cartItems);
    const [createNewOrder, { isLoading, isSuccess, error }] = useCreateNewOrderMutation();
    const [stripeCheckoutSession, { data: Checkoutdata, error: checkoutError }] = useStripeCheckoutSessionMutation();
    const nav = useNavigate();



    useEffect(() => {
        if (Checkoutdata) {
            console.log(Checkoutdata.url)
            window.location.href = Checkoutdata.url
        }
        if (checkoutError) {
            toast.error(checkoutError.data.message)
        }
    }, [Checkoutdata, checkoutError])

    useEffect(() => {
        if (error) {
            toast.error(error.data.message);
        }
        if (isSuccess) {
            nav("/me/orders?order_success=true")
        }
    }, [error, isSuccess])
    const SubmitHandler = (e) => {
        e.preventDefault();
        if (method === "COD") {
            // console.log(user)

            const orderData = {
                shippingInfo,
                orderItems: cartItems,
                itemsPrice, shippingAmount: shippingPrice, taxAmount: taxPrice, totalAmount: totalPrice,
                paymentInfo: {
                    status: "Not Paid"
                },
                paymentMethod: "COD"

            }
            createNewOrder(orderData)
        }
        if (method === "CARD") {
            const orderData = {
                shippingInfo,
                orderItems: cartItems,
                itemsPrice, shippingAmount: shippingPrice, taxAmount: taxPrice, totalAmount: totalPrice,
            }

            stripeCheckoutSession(orderData)
        }
    }


    return (
        <div>
            <CheckoutSteps shipping confirmOrder payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={SubmitHandler}
                    >
                        <h2 className="mb-4">Select Payment Method</h2>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="codradio"
                                value="COD"
                                onClick={(e) => setMethod("COD")}
                            />
                            <label className="form-check-label" htmlFor="codradio">
                                Cash on Delivery
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="payment_mode"
                                id="cardradio"
                                value="CARD"
                                onClick={(e) => setMethod("CARD")}
                            />
                            <label className="form-check-label" htmlFor="cardradio">
                                Card - VISA, MasterCard
                            </label>
                        </div>

                        <button id="shipping_btn" type="submit" className="btn py-2 w-100">
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod
