import React, { useEffect } from 'react'
import MetaData from './Layout/MetaData'
import { useGetProductsQuery } from '../Redux/Api/productsApi'
import ProductItem from './Products/ProductItem';
import Loader from './Layout/Loader';
import toast from 'react-hot-toast';
import CustomPagination from './Layout/customPagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Filters from './Layout/Filters';
import { useSelector } from 'react-redux';

const Home = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const keyword = searchParams.get("keyword") || "";
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const category = searchParams.get("category");
    const ratings = searchParams.get("ratings");

    const params = { page, keyword }

    min !== null && (params.min = min);
    max !== null && (params.max = max);
    ratings !== null && (params.ratings = ratings);
    category !== null && (params.category = category);

    const { data, isLoading, error, isError } = useGetProductsQuery(params);

    useEffect(() => {
        if (isError) {
            toast.success(error.data.message)
        }
        if (isAuthenticated) {
            nav('/')
        }
    }, [isError, isLoading, data, isAuthenticated])

    const colomnSize = keyword ? 4 : 3;
    if (isLoading) {
        return <Loader />
    }
    console.log("here", data?.resPerPage)

    return (
        <>
            <MetaData title={`Buy Best Products Online`} />

            <div className="row">
                {keyword && (
                    <div className="col-6 col-md-3 mt-5">
                        <Filters />
                    </div>
                )}
                <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
                    <h1 id="products_heading" className="text-secondary">{keyword ? `${data?.products?.length} products found for ${keyword}` : "Latest Products"}</h1>

                    <section id="products" className="mt-5">
                        <div className="row">
                            {data && data.products.map((pr) => <ProductItem key={pr._id} product={pr} colomnSize={colomnSize} />)}
                        </div>
                    </section>
                </div>
            </div>
            <CustomPagination resPerPage={data?.resPerPage} Filtered_Products_count={data?.filtered_Products_Count} />
        </>
    )
}

export default Home
