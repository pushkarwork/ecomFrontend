import React, { useEffect, useState } from 'react'
import Pagination from "react-js-pagination";
import { useNavigate, useSearchParams } from 'react-router-dom';
//FILTERED_PRODUCTS_COUNT IS TOTAL NUMBER OF PRODUCTS in DATABASE

const CustomPagination = ({ resPerPage, Filtered_Products_count }) => {
    const [currentPage, setCurrentPage] = useState()
    const nav = useNavigate()
    const [searchParams] = useSearchParams() //used to read/write the params in URL
    const page = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        setCurrentPage(page)
    }, [page])

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
        if (searchParams.has("page")) {
            searchParams.set("page", pageNumber)
        } else {
            searchParams.append("page", pageNumber)
        }
        const path = window.location.pathname + "?" + searchParams.toString()
        nav(path)
    }
    return (
        <div className='d-flex justify-content-center my-5'>
            {Filtered_Products_count > resPerPage && (<Pagination activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={Filtered_Products_count}
                firstPageText={"First"}
                lastPageText={"Last"}
                prevPageText={"Prev"}
                nextPageText={"Next"}
                itemClass="page-item"
                linkClass="page-link"
                onChange={setCurrentPageNo} />)}

        </div>
    )
}

export default CustomPagination
