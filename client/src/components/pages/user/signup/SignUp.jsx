import React, { useEffect, useState } from 'react';
import "./signup.css";
// import "../../../styles/signup.css";
import formValidator from '../../../utility/form/FormValidator';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '../../../../api/modules/user.api';
import LoadingCircular from '../../../utility/loadingCircle/LoadingCircular';

const SignUp = () => {

    let navigate = useNavigate();
    let authToken = localStorage.getItem('auth-token');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // window.scrollTo(0, 0);
        if(authToken){
            navigate("/user");
        }
        // eslint-disable-next-line
    }, []);

    const [credentials, setCredentials] = useState({ userName: "", email: "", password: "", cpassword: "" });
    const [validCred, setValidCred] = useState({ userName: "false", email: "false", password: "false", cpassword: "false" });

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
            // document.querySelector(`.signup_content small.${name}`).style.visibility = "hidden";
            document.querySelector(`.signup_content small.${name}`).style.display = "none";
        } else {
            // INVALID
            setValidCred({ ...validCred, [name]: "false" });
            event.target.classList.remove("highlight-green");
            event.target.classList.add("highlight-red")
            // document.querySelector(`.signup_content small.${name}`).style.visibility = "unset";
            document.querySelector(`.signup_content small.${name}`).style.display = "block";
        }

        if ((name === "password" && validCred.cpassword === "true") || (name === "password" && validCred.cpassword === "false" && credentials.cpassword.length > 0)) {
            let isCPassValid = formValidator.cpassword(value, credentials.cpassword, validCred.password);
            if (isCPassValid) {
                setValidCred({ ...validCred, "cpassword": "true"});
                document.querySelector("input[name=cpassword]").classList.remove("highlight-red");
                document.querySelector("input[name=cpassword]").classList.add("highlight-green");
                document.querySelector(`.signup_content small.cpassword`).style.display = "none";
            } else {
                setValidCred({ ...validCred, "cpassword": "false" });
                document.querySelector("input[name=cpassword]").classList.remove("highlight-green");
                document.querySelector("input[name=cpassword]").classList.add("highlight-red");
                document.querySelector(`.signup_content small.cpassword`).style.display = "block";
            }
            // console.log(isCPassValid);
        }
    };

    
    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        let creatUser = await userApi.signup(credentials);
        // console.log(creatUser);
        if(creatUser.success) {
            setTimeout(() => {
                localStorage.setItem("auth-token", creatUser.authToken);
                navigate("/user");
                setIsLoading(false);
            }, 2000);
        }else{
            setTimeout(() => {
                // console.log(creatUser.success, creatUser.errors)
                setIsLoading(false);
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
        <div className="signup_container">
            <div className="signup">
                <div className="signup_content">
                    <h2>Sign Up</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="container">
                            <label htmlFor="">User Name</label>
                            <input className="" type="text" name="userName" value={credentials.userName} onChange={handleOnChange} placeholder="User Name" autoComplete="off" />
                            <small className="userName">User Name must start with an alphabet and of 8-10 characters</small>
                        </div>
                        <div className="container">
                            <label htmlFor="">Email</label>
                            <input className="" type="email" name="email" value={credentials.email} onChange={handleOnChange} placeholder="Email" autoComplete="off" />
                            <small className="email">Email must be valid</small>
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
                        <div className="container">
                            <label htmlFor="">Confirm Password</label>
                            <div className="password_field">
                                <input className="" type="password" name="cpassword" value={credentials.cpassword} onChange={handleOnChange} placeholder="Confirm Password" autoComplete="off" />
                                <span className="material-icons show_pass cpassword" onClick={() => togglePassField("show", "cpassword")}>visibility_off</span>
                                <span className="material-icons hide_pass cpassword" onClick={() => togglePassField("hide", "cpassword")}>visibility</span>
                            </div>
                            <small className="cpassword">Both Password doesn't matches</small>
                        </div>

                        <div className="container signup_button">
                            <button style={{backgroundColor: isLoading===true ? "#ccc" : ""}} type="submit" disabled={validCred.userName === "false" || validCred.email === "false" || validCred.password === "false" || validCred.cpassword === "false"} >Submit</button>
                            {isLoading === true && <LoadingCircular />}
                        </div>
                    </form>
                    <div className="logIn_container">
                        <span>Already have an account?</span>
                        <Link to="/user/login" className="logIn_btn" >LogIn</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SignUp