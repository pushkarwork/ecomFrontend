import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4500/api/v1",
        credentials: "include",
        tagTypes: ["Product", "Reviews", "AdminProducts"]
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: '/getAllProducts',
                params: {
                    page: params.page,
                    keyword: params.keyword,
                    "price[gte]": params.min,
                    "price[lte]": params.max,
                    category: params.category,
                    "ratings[gte]": params.ratings
                }

            }),
            providesTags: ["AdminProducts"]
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/product/${id}`,

            }),
            // provideTags: ["Product"]
            providesTags: ["Product"]
        }),
        canUserReview: builder.query({
            query: (productId) => ({
                url: `/can_review/?productId=${productId}`
            }),
        }),
        submitReview: builder.mutation({
            query: (body) => ({
                url: '/reviews',
                method: "PUT",
                body
            }),
            invalidatesTags: ['Product']
        }),
        getAdminProducts: builder.query({
            query: () => ({
                url: `/admin/products`
            }),
            providesTags: ["AdminProducts"]
        }),
        createProduct: builder.mutation({
            query: (body) => ({
                url: '/admin/newProduct',
                method: "POST",
                body
            }),
            invalidatesTags: ["AdminProducts"]
        }),
        updateProduct: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/product/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["AdminProducts", "Product"]
        }),
        uploadProductImages: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/product/${id}/upload_images`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProductImage: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/product/${id}/delete_image`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `admin/product/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["AdminProducts", "Product"]
        }),
        getProductReviews: builder.query({
            query: (productID) => ({
                url: `/allReviews?id=${productID}`,

            }),
            provideTags: ["Reviews"]
            // providesTags: ["Product"]
        }),
        deleteProductReview: builder.mutation({
            query: ({ productID, id }) => ({
                url: `/review/delete?productId=${productID}&id=${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Reviews"]
        }),
    })
})

export const { useDeleteProductReviewMutation, useLazyGetProductReviewsQuery, useDeleteProductMutation, useDeleteProductImageMutation, useUploadProductImagesMutation, useUpdateProductMutation, useCreateProductMutation, useGetAdminProductsQuery, useGetProductsQuery, useGetProductDetailsQuery, useCanUserReviewQuery, useSubmitReviewMutation } = productApi