import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userApi } from '../../Redux/Api/userApi'
import { useGetMeQuery } from '../../Redux/Api/userApi';
import { setUser, setIsAuthenticated, setLoading } from "../../Redux/features/userSlice"
import Loader from '../Layout/Loader';
// import {} from "../../Redux/features/userSlice"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // const { refetch: fetchUserData } = useGetMeQuery(null, { skip: true });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('https://ecomserver-g20m.onrender.com/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                withCredntials: true,
                credentials: 'include', // Include credentials for cookies
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || 'Login failed');
                return; // Exit the function here to prevent showing the success message
            }

            const loginData = await response.json();
            toast.success('Login successful');

            // Fetch user data after successful login
            const userResponse = await fetch('https://ecomserver-g20m.onrender.com/api/v1/me', {
                method: 'GET',
                withCredntials: true,
                credentials: 'include', // Include credentials for cookies
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                dispatch(setUser(userData.user));
                dispatch(setIsAuthenticated(true));
            } else {
                const errorData = await userResponse.json();
                toast.error(errorData.message || 'Failed to fetch user data');
            }
        } catch (error) {
            console.error('Network Error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };



    if (isLoading) return <Loader />;

    return (
        <div>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="mb-4">Login</h2>
                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Link to="/password/forgot" className="float-end mb-4">Forgot Password?</Link>

                        <button id="login_button" type="submit" className="btn w-100 py-2" disabled={isLoading}>
                            {isLoading ? 'Authenticating....' : 'LOGIN'}
                        </button>

                        <div className="my-3">
                            <Link to="/register" className="float-end">New User?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
