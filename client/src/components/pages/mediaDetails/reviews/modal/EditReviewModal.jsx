import React, { useEffect, useState } from 'react';
import LoadingCircular from '../../../../utility/loadingCircle/LoadingCircular';
import reviewApi from '../../../../../api/modules/review.api';

const EditReviewModal = ({ data, hideModal }) => {

    const [modalData, setModalData] = useState(data.reviewContent);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";

        }
    }, [])

    const handleOnChange = (event) => {
        const { value } = event.target;
        setModalData(value);
    }

    const handleUpdate = async () => {
        setIsLoading(true);
        let authToken = localStorage.getItem('auth-token');
        let newReview = {
            reviewContent: modalData
        }
        let review = await reviewApi.updateReview(data._id, newReview, authToken);
        if (review.success) {
            setTimeout(() => {
                setIsLoading(false);
                hideModal(modalData, data._id);
            }, 2000);
        }else{
            setTimeout(() => {
                setIsLoading(false);
                hideModal(); 
            }, 2000);
        }
    }


    return (
        <>
            <div className="modal_wrapper" onClick={() => hideModal()}></div>
            <div className="modal_container">
                <textarea name="modalValue" cols="30" rows="5" placeholder="Enter you Review here" value={modalData} onChange={handleOnChange}></textarea>
                <div className="modal_btn_container">
                    <button disabled={isLoading} className="modal_btn_submit" onClick={() => handleUpdate()}> <span style={{ visibility: isLoading ? "hidden" : "" }}> Update </span>  </button>
                    {isLoading && <LoadingCircular />}
                </div>

            </div>
        </>
    )
}

export default EditReviewModal