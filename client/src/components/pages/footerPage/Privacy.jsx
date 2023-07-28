import React, { useEffect } from 'react';
import "./styles/privacy.css";
// import "../../styles/privacy.css";

const Privacy = () => {

    useEffect(() => {
        // window.scrollTo(0, 0);
    }, [])

    return (
        <div className="privacy_container">
            <div className="privacy">
                <div className="privacy_content">
                    <h2>Privacy Policy</h2>
                    <p> At our Website, <span className="highlight"> the privacy of our visitors is of most valuable to us. This privacy policy document describes the types of personal information received, collected </span> by our Website and how our Website uses and protects any information that you provide when you visit/use this website.  </p>
                    <p> Our Website is committed to ensure that your privacy is protected. Should we ask/request you to provide certain information through which you can be identified when using/visiting this website, then you can be assured that it will only be used in accordance with this privacy statement. Our Website may change this policy time to time by updating/altering this page. You should check this page from time to time to ensure that you are happy with any changes.</p>
                    <h3>This policy is effective from 02/06/2023:-</h3>
                    <h4>What we collect:</h4>
                    <p> We may collect the following information: name and job title, Your IP Address, contact information including email address, demographic information such as postcode, preferences and interests, other information relevant to customer surveys and/or offers.</p>
                    <h4>What we do with the information we gather :</h4>
                    <p> We collect this information for understanding your needs and provide you with better services, particularly for the following reasons: Internal record keeping, we may use the information to improve our products and services. We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting, using the email address which you have provided. </p>
                    <p> From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone or mail. We may use the information to customize the website according to your interests. </p>
                    <h4>Security:</h4>
                    <p> We are committed to ensure that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online. </p>
                    <h4>Cookies:</h4>
                    <p> Once you agreed and allowed our website to use cookies, it means you also allowed to use the data it collects.</p>
                    <p> We use technologies, such as cookies to customize content and advertising, to provide social media features and to analyze traffic to the site. </p>
                    <p> A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering.</p>


                </div>
            </div>
        </div>
    )
}

export default Privacy