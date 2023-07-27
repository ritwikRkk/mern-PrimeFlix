import React, { useEffect, useState } from 'react';
import "./styles/contact.css";
// import "../../styles/contact.css";
import formValidator from '../../utility/form/FormValidator';

const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [credentials, setCredentials] = useState({ name: "", phone: "", email: "", message: "" });
    const [validCred, setValidCred] = useState({ name: "false", phone: "false", email: "false", message: "false" });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setCredentials((prevValue) => {
            return {
                ...prevValue,
                [name]: value.replace(/\s+/g, " ") // removing exptra spaces
            };
        });
        // console.log(formValidator[name](value));
        let isValid = formValidator[name](value);
        if (isValid) {
            // VALID
            setValidCred({...validCred, [name]: "true"});
            event.target.classList.remove("highlight-red");
            event.target.classList.add("highlight-green");
            document.querySelector(`.contact_content small.${name}`).style.visibility = "hidden";
        }else{
            // INVALID
            setValidCred({...validCred, [name]: "false"});
            event.target.classList.remove("highlight-green");
            event.target.classList.add("highlight-red")
            document.querySelector(`.contact_content small.${name}`).style.visibility = "unset";
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(credentials);
        console.log(formValidator.name(credentials.name));
    };

    return (
        <div className="contact_container">
            <div className="contact">
                <div className="contact_content">
                    <h2>Contact Us</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="container">
                            <label htmlFor="">Name</label>
                            <input className="" type="text" name="name" value={credentials.name} onChange={handleOnChange} id="" placeholder="Name" autoComplete="off" />
                            <small className="name">Name must be of 3 or more characters</small>
                        </div>
                        <div className="container">
                            <label htmlFor="">Phone Number</label>
                            <input className="" type="number" name="phone" value={credentials.phone} onChange={handleOnChange} id="" placeholder="Phone Number" autoComplete="off" />
                            <small className="phone">Phone Number must be 10 characters long</small>
                        </div>
                        <div className="container">
                            <label htmlFor="">Email</label>
                            <input className="" type="email" name="email" value={credentials.email} onChange={handleOnChange} id="" placeholder="Email" autoComplete="off" />
                            <small className="email">Email must be valid</small>
                        </div>
                        <div className="container">
                            <label htmlFor="">Message</label>
                            <textarea className="" name="message" value={credentials.message} onChange={handleOnChange} id="" cols="30" rows="5" placeholder="Enter you message here"></textarea>
                            <small className="message">Message must be of 5 or more characters</small>
                        </div>
                        <div className="container contact_button">
                            <button type="submit" disabled={validCred.name==="false" || validCred.phone==="false" || validCred.email==="false" || validCred.message==="false" } >Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Contact