import React, { useEffect, useState } from 'react';
import "./changePassword.css";
// import "../../../styles/changePassword.css";
import formValidator from '../../../utility/form/FormValidator';
import { useNavigate } from 'react-router-dom';
import userApi from '../../../../api/modules/user.api';
import LoadingCircular from '../../../utility/loadingCircle/LoadingCircular';
import { useDispatch } from 'react-redux';
import { deleteMsg, msgDetails } from '../../../../store/slices/MsgSlice';

const ChangePassword = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    let authToken = localStorage.getItem('auth-token');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // window.scrollTo(0, 0);
        if (!authToken) {
            navigate("/user/login");
        }
        // eslint-disable-next-line
    }, []);

    const [credentials, setCredentials] = useState({ oldpassword: "", password: "", cpassword: "" });
    const [validCred, setValidCred] = useState({ oldpassword: "false", password: "false", cpassword: "false" });

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
            // document.querySelector(`.changepassword_content small.${name}`).style.visibility = "hidden";
            document.querySelector(`.changepassword_content small.${name}`).style.display = "none";
        } else {
            // INVALID
            setValidCred({ ...validCred, [name]: "false" });
            event.target.classList.remove("highlight-green");
            event.target.classList.add("highlight-red")
            // document.querySelector(`.changepassword_content small.${name}`).style.visibility = "unset";
            document.querySelector(`.changepassword_content small.${name}`).style.display = "block";
        }

        // CHECK IF PASSWORD AND CONFIRM PASSWORD ARE SAME, BUT THEN PASSWORD IS CHANGED
        if ((name === "password" && validCred.cpassword === "true") || (name === "password" && validCred.cpassword === "false" && credentials.cpassword.length > 0)) {
            let isCPassValid = formValidator.cpassword(value, credentials.cpassword, validCred.password);
            if (isCPassValid) {
                setValidCred({ ...validCred, "cpassword": "true" });
                document.querySelector("input[name=cpassword]").classList.remove("highlight-red");
                document.querySelector("input[name=cpassword]").classList.add("highlight-green");
                document.querySelector(`.changepassword_content small.cpassword`).style.display = "none";
            } else {
                setValidCred({ ...validCred, "cpassword": "false" });
                document.querySelector("input[name=cpassword]").classList.remove("highlight-green");
                document.querySelector("input[name=cpassword]").classList.add("highlight-red");
                document.querySelector(`.changepassword_content small.cpassword`).style.display = "block";
            }
            // console.log(isCPassValid);
        }

        // if (name === "password") {
        //     if (credentials.oldpassword === value) {
        //         setValidCred({ ...validCred, "samePass": "false" });
        //         document.querySelector(`.changepassword_content small.samePass`).style.display = "block";
        //         console.log("new and old password are same");
        //     } else {
        //         setValidCred({ ...validCred, "samePass": "true" });
        //         document.querySelector(`.changepassword_content small.samePass`).style.display = "none";
        //     }
        // }
    };

    const changePassword = async (credentials, authToken) => {
        setIsLoading(true);
        let update = await userApi.updatePassword(credentials, authToken);
        if (update.success) {
            // console.log(getUser);
            setTimeout(() => {
                setIsLoading(false);
                dispatch(msgDetails({ msgType: "success", msgContent: update.msg }))
                setTimeout(() => dispatch(deleteMsg()), 3000);
                localStorage.removeItem('auth-token');
                navigate("/user/login");
            }, 2000);
        } else {
            // console.log(update.success, update.error)
            setTimeout(() => {
                setIsLoading(false);
                dispatch(msgDetails({ msgType: "failed", msgContent: update.msg }))
                setTimeout(() => dispatch(deleteMsg()), 3000);
            }, 2000);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // CHECK IF OLD AND NEW PASSWORD ARE SAME
        if (credentials.oldpassword === credentials.password) {
            document.querySelector(`.changepassword_content small.samePass`).style.display = "block";
            // console.log("new and old password are same");
        } else {
            document.querySelector(`.changepassword_content small.samePass`).style.display = "none";
            // console.log(credentials);
            changePassword(credentials, authToken);
        }
        // console.log(formValidator.name(credentials.name));
        // localStorage.setItem("auth-token", `user-${Math.random() * 10}`);
        // navigate("/");
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
        <div className="changepassword_container">
            <div className="changepassword">
                <div className="changepassword_content">
                    <h2>Change Password</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="container">
                            <label htmlFor="">Old Password</label>
                            <div className="password_field">
                                <input className="" type="password" name="oldpassword" value={credentials.oldpassword} onChange={handleOnChange} placeholder="Old Password" autoComplete="off" />
                                <span className="material-icons show_pass oldpassword" onClick={() => togglePassField("show", "oldpassword")}>visibility_off</span>
                                <span className="material-icons hide_pass oldpassword" onClick={() => togglePassField("hide", "oldpassword")}>visibility</span>
                            </div>
                            <small className="oldpassword">Password must contain atleast one Upper Case, a Lower Case, a digit, a special character and must be 8 characters long</small>
                        </div>
                        <div className="container">
                            <label htmlFor="">New Password</label>
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
                        <div className="container">
                            <small className="samePass">New and Old Password can't be same</small>
                        </div>

                        <div className="container changepassword_button">
                            <button style={{ backgroundColor: isLoading === true ? "#ccc" : "" }} type="submit" disabled={validCred.oldpassword === "false" || validCred.password === "false" || validCred.cpassword === "false"} >Submit</button>
                            {isLoading === true && <LoadingCircular />}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ChangePassword;