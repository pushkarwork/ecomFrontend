import React, { useEffect, useState } from 'react'
import { getPriceQueryParams } from '../helpers/helpers'
import { useNavigate, useSearchParams } from 'react-router-dom'
// const PRODUCT_CATEGORIES = require("../../constants/constants")
import { PRODUCT_CATEGORIES } from "../../constants/constants"
import StarRatings from 'react-star-ratings';
const Filters = () => {
    const nav = useNavigate();
    let [searchParams] = useSearchParams()
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    useEffect(() => {
        searchParams.has("min") && setMin(searchParams.get("min"));
        searchParams.has("max") && setMax(searchParams.get("max"));
    }, [])


    const handleCheckBoxClick = (checkbox) => {
        const checkboxes = document.getElementsByName(checkbox.name)

        checkboxes.forEach((item) => {
            if (item !== checkbox) item.checked = false;
        })

        if (checkbox.checked == false) {
            //delete the query
            if (searchParams.has(checkbox.name)) {
                searchParams.delete(checkbox.name)
                const path = window.location.pathname + "?" + searchParams.toString();
                nav(path);
            }
        } else {
            if (searchParams.has(checkbox.name)) {
                searchParams.set(checkbox.name, checkbox.value)
            } else {
                searchParams.append(checkbox.name, checkbox.value)
            }
            const path = window.location.pathname + "?" + searchParams.toString();
            nav(path);
        }

    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        searchParams = getPriceQueryParams(searchParams, "min", min)
        searchParams = getPriceQueryParams(searchParams, "max", max)
        const path = window.location.pathname + "?" + searchParams.toString();
        nav(path);

    }

    const defaultCheckHandler = (checkboxType, checkboxValue) => {
        const value = searchParams.get(checkboxType);
        if (checkboxValue === value) return true;
        return false;
    };


    return (
        <div>
            <div className="border p-3 filter">
                <h3>Filters</h3>
                <hr />
                <h5 className="filter-heading mb-3">Price</h5>
                <form
                    id="filter_form"
                    className="px-2"
                    action="your_action_url_here"
                    method="get"
                >
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control px-2"
                                placeholder="Min($)"
                                name="min"
                                value={min}
                                onChange={(e) => setMin(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control px-2"
                                placeholder="Max($)"
                                name="max"
                                value={max}
                                onChange={(e) => setMax(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary" onClick={handleButtonClick}>GO</button>
                        </div>
                    </div>
                </form>
                <hr />
                <h5 className="mb-3">Category</h5>
                {PRODUCT_CATEGORIES.map((category) => (
                    <div key={category} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="category"
                            id="check4"
                            value={category}
                            defaultChecked={defaultCheckHandler("category", category)}
                            onClick={(e) => handleCheckBoxClick(e.target)}
                        />
                        <label className="form-check-label" htmlFor="check4"> {category} </label>
                    </div>
                ))}



                <hr />
                <h5 className="mb-3">Ratings</h5>

                {[5, 4, 3, 2, 1].map((rating) => (
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="ratings"
                            id="check7"
                            value={rating}
                            defaultChecked={defaultCheckHandler("ratings", rating.toString())}
                            onClick={(e) => handleCheckBoxClick(e.target)}
                        />
                        <label className="form-check-label" htmlFor="check7">
                            <StarRatings
                                rating={rating}
                                starRatedColor="#ffb829"
                                numberOfStars={5}
                                name='rating'
                                starDimension='21px'
                                starSpacing='1px'
                            />
                        </label>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Filters
