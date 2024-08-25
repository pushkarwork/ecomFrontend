import React, { useEffect, useState } from 'react'
import UserLayout from '../Layout/UserLayout'
import { useSelector } from 'react-redux'

const Profile = () => {
        const { user } = useSelector((state) => state.auth)
        // console.log(user)
    // const [user, setUser] = useState();
    // console.log(user)
    // useEffect(() => {


    //     if (user) {
    //         setUser(user)
    //     }
    // }, [])
    return (
        <UserLayout>
            <div className="row justify-content-around mt-5 user-info">
                <div className="col-12 col-md-3">
                    <figure className="avatar avatar-profile">
                        <img
                            className="rounded-circle img-fluid"
                            src={
                                user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
                            }
                            alt={user.name}
                        />
                    </figure>
                </div>

                <div className="col-12 col-md-5">
                    <h4>Full Name</h4>
                    <p>{user.name}</p>

                    <h4>Email Address</h4>
                    <p>{user.email}</p>

                    <h4>Joined On</h4>
                    <p>{user.createdAt}</p>
                </div>
            </div>
        </UserLayout>
    )
}

export default Profile
