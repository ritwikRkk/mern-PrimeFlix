import React, { useState } from 'react';
import LoadingCircular from '../../../../utility/loadingCircle/LoadingCircular';
import reviewApi from '../../../../../api/modules/review.api';
import { useDispatch } from 'react-redux';
import { removeReview } from '../../../../../store/slices/mediaDetailsSlice';

const ReviewCard = ({ userData, thisUser, viewModal }) => {
    let dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const starCount = Number(userData.rating);
    // console.log(starCount);
    const fullStar = new Array(starCount).fill("");
    const halfStar = new Array(5 - starCount).fill("");

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const handleDelete = async () => {
        setIsLoading(true);
        let authToken = localStorage.getItem('auth-token');
        // const reviewId = userData._id;
        let review = await reviewApi.deleteReviews(userData._id, authToken);
        if (review.success) {
            // console.log(review);
            setTimeout(() => {
                // console.log("card", userData._id);
                dispatch(removeReview(userData._id));
                setIsLoading(false);
            }, 2000);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
        // console.log(authToken, reviewId);
    };

    // console.log(userData);

    return (
        <>
            <div className="reviews_container">
                <div className="reviews_card">
                    <div className="user_details">
                        <p>
                            <span style={{ background: getRandomColor() }} className="user_profile_img"> {userData.userName.slice(0, 1)} </span>
                            <span className="user_profile_name"> {userData.userName} </span>
                        </p>
                        <span className="review_date"> {userData.createdAt.slice(0,10)} </span>
                    </div>
                    <div className="reivew_text" style={{ paddingTop: userData.userName === thisUser ? "20px" : "" }}>

                        <div className="star_rating">
                            {fullStar.map((star, i) => <span key={i} className="material-icons stars">star_rate</span>)}
                            {halfStar.map((star, i) => <span key={i} className="material-icons stars">star_outline</span>)}
                        </div>

                        {/* SHOW ONLY TO LOGGED IN USER WHO HAS POSTED THAT REVIEW */}
                        {userData.userName === thisUser &&
                            <div className="review_edit">
                                <span className="material-icons edit" onClick={() => viewModal(userData)}>edit</span>
                                {isLoading === false && <span className="material-icons delete" onClick={() => handleDelete()}>delete</span>}
                                {isLoading && <LoadingCircular />}
                            </div>
                        }
                        <span className="review"> <span className="inv_comma_top"> &ldquo; </span> {userData.reviewContent.slice(0, 500)}... <span className="inv_comma_bottom"> &rdquo; </span> </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewCard