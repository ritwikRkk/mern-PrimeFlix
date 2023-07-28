import React, { useEffect } from 'react';
import "./styles/terms.css";

const Terms = () => {

    useEffect(() => {
      // window.scrollTo(0, 0);
    }, [])
    

  return (
    <div className="terms_container">
            <div className="terms">
                <div className="terms_content">
                    <h2>About & Conditions</h2>
                    <p><b> Welcome to our website. </b>  Below are the Terms and Conditions for use of this Website. Please read these carefully. If you need to contact us regarding any of the following terms of use of our website, please contact us on the following email address – our Email. </p>
                    <p> If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, together with our privacy policy, govern our Website relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website. </p>
                    <p> The terms <b>‘our Website’</b> or <b>‘us’</b> or <b>‘we’</b> refer to the owner/s of the website. The use of this website is subject to the following terms of use: </p>
                    <p> The content of the pages of this website is for your general information and use only. It is subject to change without prior notice. </p>
                    <p> Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law. </p>
                    <p> Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements. </p>
                    <p> This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions. </p>
                    <p> All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence. </p>
                    <p> Our Website reserves the right to make changes to the website or materials related to the website without notice.</p>

                </div>
            </div>
        </div>
  )
}

export default Terms