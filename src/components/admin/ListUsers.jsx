import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import Loader from '../Layout/Loader';
import { MDBDataTable } from "mdbreact"
import { Link } from 'react-router-dom';

import AdminLayout from '../Layout/AdminLayout';
import { useDeleteAdminUserMutation, useGetAdminUsersQuery } from '../../Redux/Api/userApi';


const ListUsers = () => {

    const { data, isLoading, error } = useGetAdminUsersQuery();
    const [deleteAdminUser, { error: DeleteError, isLoading: DeleteLoading, isSuccess }] = useDeleteAdminUserMutation();

    useEffect(() => {

        if (error) {
            toast.error(error.data.message);
        }
        if (DeleteError) {
            toast.error(DeleteError.data.message);
        }
        if (isSuccess) {
            toast.success("User Deleted Successfully");
        }


    }, [error, DeleteError, isSuccess])

    const deleteHandler = (id) => {
        deleteAdminUser(id)
    }




    const setUsers = () => {
        const users = {
            columns: [
                {
                    label: "ID", field: "id", sort: "asc"
                },
                {
                    label: "Name", field: "name", sort: "asc"
                }, {
                    label: "Email", field: "email", sort: "asc"
                },
                {
                    label: "Role", field: "role", sort: "asc"
                },
                {
                    label: "Actions", field: "actions", sort: "asc"
                }
            ],
            rows: []
        }

        if (data?.users) {
            data.users.forEach(user => {
                users.rows.push({
                    id: user._id,
                    name: user?.name,
                    email: user?.email,
                    role: user?.role,
                    actions: (
                        <>
                            <Link to={`/admin/user/${user._id}`} className="btn btn-outline-primary">
                                <i className='fa fa-pencil'></i>
                            </Link>
                            <button className="btn btn-outline-danger ms-2" onClick={() => deleteHandler(user._id)} disabled={DeleteLoading} >
                                <i className='fa fa-trash'></i>
                            </button>


                        </>
                    )
                });
            });
        }

        return users;
    }
    if (isLoading) return <Loader />
    return (
        <AdminLayout>
            <h1 className='my-5'>{data && data?.users.length} users</h1>
            <MDBDataTable data={setUsers()} className='px-3' striped bordered hover />
        </AdminLayout>
    )
}

export default ListUsers
