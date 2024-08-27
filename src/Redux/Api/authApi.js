import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userApi } from './userApi';

// http://localhost:4500
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://ecomserver-g20m.onrender.com/api/v1",
        credentials: "include"
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query(body) {
                return {
                    url: "/user/new",
                    method: "POST",
                    body
                }
            },
            // async onQueryStarted(args, { dispatch, queryFulfilled }) {
            //     try {
            //         await queryFulfilled;
            //         await dispatch(userApi.endpoints.getMe.initiate(null));
            //     } catch (error) {
            //         console.log(error.error.data.message);
            //     }
            // }
        })
        ,
        login: builder.mutation({
            query(body) {
                return {
                    url: "/user/login",
                    method: "POST",
                    body
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {
                    console.log(error.error.data.message);
                }
            }
        }),
        logout: builder.query({
            query: () => ({
                url: `/user/logout`,
            })
        })


    })
})

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } = authApi