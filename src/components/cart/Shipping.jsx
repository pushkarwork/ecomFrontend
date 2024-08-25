import React, { useEffect, useState } from 'react'
import { countries } from "countries-list";
import { useDispatch, useSelector } from 'react-redux';
import { SaveShippingInfo } from '../../Redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
const Shipping = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [address, SetAddress] = useState('');
    const [city, SetCity] = useState('');
    const [phone, SetPhone] = useState('');
    const [pinCode, SetPinCode] = useState('');
    const [country, SetCountry] = useState("");


    const { shippingInfo } = useSelector((state) => state.cart);
    const countries_List = Object.values(countries);

    const SubmitHandler = (e) => {
        e.preventDefault();
        dispatch(SaveShippingInfo({ address, city, phone, pinCode, country }));
        nav("/confirm_order")
    }

    useEffect(() => {
        if (shippingInfo) {
            SetAddress(shippingInfo.address);
            SetCity(shippingInfo.city);
            SetPhone(shippingInfo.phone);
            SetPinCode(shippingInfo.pinCode)
            SetCountry(shippingInfo.country);
        }
    }, [shippingInfo])

    return (<>
        <CheckoutSteps shipping />
        <div>
            <div className="row wrapper mb-5">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={SubmitHandler}
                    >
                        <h2 className="mb-4">Shipping Info</h2>
                        <div className="mb-3">
                            <label htmlFor="address_field" className="form-label">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                name="address"
                                value={address}
                                onChange={(e) => SetAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city_field" className="form-label">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                name="city"
                                value={city}
                                onChange={(e) => SetCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone_field" className="form-label">Phone No</label>
                            <input
                                type="tel"
                                id="phone_field"
                                className="form-control"
                                name="phone"
                                value={phone}
                                onChange={(e) => SetPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="postal_code_field" className="form-label"
                            >Postal Code</label
                            >
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                name="pinCode"
                                value={pinCode}
                                onChange={(e) => SetPinCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="country_field" className="form-label">Country</label>
                            <select
                                id="country_field"
                                className="form-select"
                                name="country"
                                value={country}
                                onChange={(e) => SetCountry(e.target.value)}
                                required
                            >
                                {countries_List.map((country) => (
                                    <option key={country.name} value={country.name}>{country.name}</option>
                                ))}

                                <option value="Country2">Country2</option>

                            </select>
                        </div>

                        <button id="shipping_btn" type="submit" className="btn w-100 py-2">
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default Shipping
