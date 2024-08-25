import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../../Redux/Api/authApi';
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const nav = useNavigate();
    // const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: "", email: "", password: ""
    })
    const { isAuthenticated } = useSelector((state) => state.auth);

    const { name, email, password } = user;

    const [register, { isLoading, error, data }] = useRegisterMutation()
    // console.log(data)


    useEffect(() => {
        if (isAuthenticated) {
            nav('/')
        }
        if (error) {
            toast.error(error.data.message)
        }
        if (data) {
            toast.success("User created successfully")
            // Assuming the response contains user data and a token
            nav('/login')
        }

    }, [error, isAuthenticated, data, nav])

    const onchangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const registerData = {
            name, email, password
        }
        register(registerData)
    }
    return (
        <div>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Register</h2>

                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onchangeHandler}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onchangeHandler}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onchangeHandler}
                            />
                        </div>

                        <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
                            {isLoading ? "Creating...." : "REGISTER"}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register
