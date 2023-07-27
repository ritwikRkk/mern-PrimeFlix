import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import "./userdetails.css";
// import "../../../styles/userdetails.css";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
// import { Link } from 'react-router-dom';
import userApi from '../../../../api/modules/user.api';
import { deleteFavorites } from '../../../../store/slices/FavoriteSlice';
import { deleteUser, userDetails } from '../../../../store/slices/UserSlice';
import { deleteMdState } from '../../../../store/slices/mediaDetailsSlice';
import LoadingBar from '../../../utility/loadingBar/LoadingBar';

const UserDetails = () => {
    // const [credentials, setCredentials] = useState({ userName: "", email: "" })
    const user = useSelector(state => state.user);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let authToken = localStorage.getItem('auth-token');
    // let authToken = localStorage.getItem('authToken');

    const fetchUser = async (token) => {
        let getUser = await userApi.userInfo(token);
        if (getUser.success) {
            console.log(getUser);
            dispatch(userDetails({ _id: getUser.user._id, userName: getUser.user.username, email: getUser.user.email }));
            // setCredentials({ userName: user.username, email: user.email })
        } else {
            console.log(getUser.success, getUser.error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        // console.log(authToken);
        if (!authToken) {
            // console.log(window.history)
            navigate("/user/login");
        } else {
            if (user.isLoading === true) {
                // console.log("fetchUser Called");
                fetchUser(authToken);
            }
        }
        // eslint-disable-next-line
    }, []);

    const handleLogOut = () => {
        // console.log('log out');
        dispatch(deleteFavorites());
        dispatch(deleteUser());
        dispatch(deleteMdState());
        localStorage.removeItem('auth-token');
        navigate("/user/login");
    }

    return (
        <>
            {user.isLoading === true && <LoadingBar />}
            {user.isLoading === false && 
                <div className="userDetails_container">
                    <div className="userDetails">
                        <div className="userDetails_content">
                            <h2>User Details</h2>
                            <div className="user_data">
                                <div className="container">
                                    <label htmlFor="">User Name</label>
                                    <p> {user.userInfo.userName} </p>
                                </div>
                                <div className="container">
                                    <label htmlFor="">Email</label>
                                    <p> {user.userInfo.email} </p>
                                </div>
                                <div className="userDetails_utils">
                                    <Link to="/user/changepassword" className="userDetails_utils_link changepass">Change Password</Link>
                                    <button className="userDetails_utils_link logout" onClick={() => handleLogOut()} >Log Out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserDetails;