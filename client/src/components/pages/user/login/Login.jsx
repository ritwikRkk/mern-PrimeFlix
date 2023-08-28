import React, { useEffect, useState } from 'react';
import "./login.css";
// import "../../../styles/login.css";
import formValidator from '../../../utility/form/FormValidator';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '../../../../api/modules/user.api';
import { useDispatch } from 'react-redux';
import { getFavorites } from '../../../../store/slices/FavoriteSlice';
import favoriteApi from '../../../../api/modules/favorites.api';
import LoadingCircular from '../../../utility/loadingCircle/LoadingCircular';
import { deleteMsg, msgDetails } from '../../../../store/slices/MsgSlice';
const Login = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let authToken = localStorage.getItem('auth-token');

    useEffect(() => {
        // window.scrollTo(0, 0);
        if (authToken) {
            navigate("/user");
        }
        // eslint-disable-next-line
    }, []);

    const [credentials, setCredentials] = useState({ loginid: "", password: "" });
    const [validCred, setValidCred] = useState({ loginid: "false", password: "false" });
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (event) => {
        let { name, value } = event.target;
        setCredentials((prevValue) => {
            return {
                ...prevValue,
                [name]: value.replace(/\s+/g, "") // removing exptra spaces
            };
        });
        // console.log(formValidator[name](value));
        let isValid = false;
        if (name === "cpassword") {
            isValid = formValidator[name](credentials.password, value, validCred.password);
        }
        else {
            isValid = formValidator[name](value);
        }
        if (isValid) {
            // VALID
            setValidCred({ ...validCred, [name]: "true" });
            event.target.classList.remove("highlight-red");
            event.target.classList.add("highlight-green");
            // document.querySelector(`.login_content small.${name}`).style.visibility = "hidden";
            document.querySelector(`.login_content small.${name}`).style.display = "none";
        } else {
            // INVALID
            setValidCred({ ...validCred, [name]: "false" });
            event.target.classList.remove("highlight-green");
            event.target.classList.add("highlight-red")
            // document.querySelector(`.login_content small.${name}`).style.visibility = "unset";
            document.querySelector(`.login_content small.${name}`).style.display = "block";
        }

    };

    const fetchFavorites = async (token) => {
        const favorites = await favoriteApi.getFavorites(token);
        // console.log(favorites);
        dispatch(getFavorites(favorites.favourites));
    }

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        // console.log(credentials);
        let getUser = await userApi.login(credentials);
        // console.log(getUser);
        if (getUser.success) {
            setTimeout(() => {
                setIsLoading(false);
                dispatch(msgDetails({msgType: "success", msgContent: getUser.msg}))
                setTimeout(() =>  dispatch(deleteMsg()), 3000);
                fetchFavorites(getUser.authToken);
                localStorage.setItem("auth-token", getUser.authToken);
                navigate("/user");
            }, 2000);
        } else {
            setTimeout(() => {
                // console.log(getUser.success, getUser.error)
                dispatch(msgDetails({msgType: "failed", msgContent: getUser.msg}))
                setIsLoading(false);
                setTimeout(() =>  dispatch(deleteMsg()), 3000);
            }, 2000);
        }
    };

    const togglePassField = (toggle, field) => {
        // TO SHOW PASSWORD
        let inpField = document.querySelector(`input[name=${field}]`);
        if (toggle === "show") {
            inpField.type = "text";
            let showSpanBtn = document.querySelector(`.show_pass.${field}`);
            showSpanBtn.style.visibility = "hidden";
            let hideSpanBtn = document.querySelector(`.hide_pass.${field}`);
            hideSpanBtn.style.visibility = "unset";
        } else {
            // TO HIDE PASSOWORD
            inpField.type = "password";
            let hideSpanBtn = document.querySelector(`.hide_pass.${field}`);
            hideSpanBtn.style.visibility = "hidden";
            let showSpanBtn = document.querySelector(`.show_pass.${field}`);
            showSpanBtn.style.visibility = "unset";
        }

    }

    return (
        <div className="login_container">
            <div className="login">
                <div className="login_content">
                    <h2>Log In</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="container">
                            <label htmlFor="">User Name / Email</label>
                            <input className="" type="text" name="loginid" value={credentials.loginid} onChange={handleOnChange} placeholder="User Name / Email" autoComplete="off" />
                            <small className="loginid">User Name / Email must start with an alphabet and of 8-10 characters</small>
                        </div>
                        <div className="container">
                            <label htmlFor="">Password</label>
                            <div className="password_field">
                                <input className="" type="password" name="password" value={credentials.password} onChange={handleOnChange} placeholder="Password" autoComplete="off" />
                                <span className="material-icons show_pass password" onClick={() => togglePassField("show", "password")}>visibility_off</span>
                                <span className="material-icons hide_pass password" onClick={() => togglePassField("hide", "password")}>visibility</span>
                            </div>
                            <small className="password">Password must contain atleast one Upper Case, a Lower Case, a digit, a special character and must be 8 characters long</small>
                        </div>

                        <div className="container login_button">
                            <button style={{backgroundColor: isLoading===true ? "#ccc" : ""}} type="submit" disabled={validCred.loginid === "false" || validCred.password === "false"} >Submit</button>
                            {isLoading=== true && <LoadingCircular />}
                        </div>
                    </form>

                    <div className="signUp_container">
                        <span>Don't have an account?</span>
                        <Link to="/user/signup" className="signup_btn" >Create New Account</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login