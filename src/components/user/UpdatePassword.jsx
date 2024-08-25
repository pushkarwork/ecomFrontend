import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUpdatePasswordMutation } from '../../Redux/Api/userApi';
import UserLayout from '../Layout/UserLayout';
import { useSelector } from 'react-redux';

const UpdatePassword = () => {
    const [oldPassword, SetOldPassword] = useState("");
    const [Password, SetPassword] = useState("");
    const [updatePassword, { isLoading, isSuccess, error }] = useUpdatePasswordMutation();
    const nav = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (error) {
            toast.error(error.data.message)
        }

        if (isSuccess) {
            toast.success("Password updated Successfully");
            nav("/me/profile");
        }
    }, [user, isSuccess, error])

    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            oldPassword, Password
        }
        updatePassword(userData);
    }

    return (

        <UserLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form className="shadow rounded bg-body" onSubmit={submitHandler}>
                        <h2 className="mb-4">Update Password</h2>
                        <div className="mb-3">
                            <label htmlFor="old_password_field" className="form-label">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => SetOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="new_password_field" className="form-label">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={Password}
                                onChange={(e) => SetPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
                            {isLoading ? "Updating..." : " Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>

    )
}

export default UpdatePassword
