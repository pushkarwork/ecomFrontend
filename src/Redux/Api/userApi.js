import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser, setIsAuthenticated, setLoading } from "../features/userSlice"


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4500/api/v1",
        credentials: "include"
    }), tagTypes: ["User", "AdminUsers"],
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => ({
                url: `/me`,
            }),
            transformResponse: (result) => result.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // console.log(data)
                    dispatch(setUser(data));
                    dispatch(setIsAuthenticated(true));
                    dispatch(setLoading(false));
                } catch (error) {
                    console.log(error);
                    dispatch(setLoading(false));
                }
            },
            providesTags: ["User"]
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: `/me/update`,
                method: "PUT",
                body

            }),
            invalidatesTags: ["User"]
        }),
        uploadAvatar: builder.mutation({
            query: (body) => ({
                url: `/me/upload_avatar`,
                method: "PUT",
                body

            }),
            invalidatesTags: ["User"]
        }),
        updatePassword: builder.mutation({
            query: (body) => ({
                url: `/password/update`,
                method: "PUT",
                body

            }),
            invalidatesTags: ["User"]
        }),
        forgotPassword: builder.mutation({
            query: (body) => ({
                url: `/user/password/forgot`,
                method: "POST",
                body

            })
        }),
        ResetPassword: builder.mutation({
            query: ({ token, body }) => ({
                url: `/password/reset/${token}`,
                method: "PUT",
                body

            })
        }),
        getAdminUsers: builder.query({
            query: () => ({
                url: `/admin/users`,
            }),
            providesTags: ["AdminUsers"]
        }),
        getAdminUser: builder.query({
            query: (id) => ({
                url: `/admin/user/${id}`,
            }),
            providesTags: ["AdminUsers"]
        }),
        updateAdminUser: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/updateuser/${id}`,
                method: "PUT",
                body

            }),
            invalidatesTags: ["AdminUsers"]
        }),
        deleteAdminUser: builder.mutation({
            query: (id) => ({
                url: `/admin/delete/${id}`,
                method: "DELETE"

            }),
            invalidatesTags: ["AdminUsers"]
        }),

    })
});
export const { useDeleteAdminUserMutation, useUpdateAdminUserMutation, useGetAdminUserQuery, useGetAdminUsersQuery, useGetMeQuery, useUpdateUserMutation, useUploadAvatarMutation, useUpdatePasswordMutation, useForgotPasswordMutation, useResetPasswordMutation } = userApi