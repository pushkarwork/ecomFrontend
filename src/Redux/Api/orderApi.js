import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4500/api/v1",
        credentials: "include"
    }),
    tagTypes: ["Order", "AdminOrders", "MyOrders"],
    endpoints: (builder) => ({
        createNewOrder: builder.mutation({
            query: (body) => ({
                url: '/order/new',
                method: "POST",
                body
            }),
            invalidatesTags: ["MyOrders"],
        }),
        updateOrder: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/order/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Order",]
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/admin/order/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["AdminOrders"]
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: '/myorders',
                method: "GET"
            }),
            providesTags: ["MyOrders"]
        }),
        getAdminOrders: builder.query({
            query: () => ({
                url: '/admin/allorders',
                method: "GET"
            }),
            providesTags: ["AdminOrders"]
        }),
        getOrderDetail: builder.query({
            query: (id) => ({
                url: `/order/${id}`,
                method: "GET"
            }),
            providesTags: ["Order"]
        }),
        stripeCheckoutSession: builder.mutation({
            query: (body) => ({
                url: '/payment/checkout_session',
                method: "POST",
                body
            })
        }),
        getDashboardSales: builder.query({
            query: ({ startDate, endDate }) => ({
                url: `/admin/get_sales?startDate=${startDate}&endDate=${endDate}`,
            })
        })
    })
})

export const { useDeleteOrderMutation, useUpdateOrderMutation, useGetAdminOrdersQuery, useLazyGetDashboardSalesQuery, useCreateNewOrderMutation, useStripeCheckoutSessionMutation, useGetAllOrdersQuery, useGetOrderDetailQuery } = orderApi