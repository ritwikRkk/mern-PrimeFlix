import React, { useState, useEffect } from 'react';
import "./writeReview.css";
import LoadingCircular from '../../../../utility/loadingCircle/LoadingCircular';
import { useDispatch } from 'react-redux';
import { addReview } from '../../../../../store/slices/mediaDetailsSlice';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import reviewApi from '../../../../../api/modules/review.api';


const WriteReview = () => {

    let thisUser = useSelector(state => state.user.userInfo.userName);
    // console.log(thisUser);
    const reviews = useSelector(state => state.md.mdReviews);
    let location = useLocation();
    let path = location.pathname.split("/")[1];

    const params = useParams();
    const mediaId = params.id;
    // console.log((path), mediaId);

    let initialReview = {
        mediaId: mediaId,
        reviewContent: "",
        mediaType: path,
        userName: thisUser,
        rating: "0",
    }
    const [reviewObj, setReviewObj] = useState(initialReview);

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const [fullStar, setFullStar] = useState(new Array(0).fill(""));
    const [halfStar, setHalfStar] = useState(new Array(5).fill(""));

    // Check if this user has already reviewed this media
    const [hasReview, setHasReview] = useState(false);

    const findThisUserReview = () => {
        // FIND OUT IF THERE IS A Review OF THIS USER reviewsArr
        let thisUserReview = reviews.filter((review) => {
            return review.userName === thisUser;
        })
        // console.log(thisUserReview);
        if (thisUserReview.length > 0) {
            setHasReview(true);
        } else {
            setHasReview(false);
        }
    }

    useEffect(() => {
        // console.log(thisUser);
        if (thisUser) {
            findThisUserReview();
        }
        // eslint-disable-next-line
    }, [reviews])

    const handleOnChange = (event) => {
        // setText(event.target.value);
        setReviewObj((prevVal) => {
            return {
                ...prevVal,
                reviewContent: event.target.value
            }
        })
    };

    const handlePost = async () => {
        // console.log("handlePost");
        setIsLoading(true);
        let authToken = localStorage.getItem('auth-token');
        let response = await reviewApi.addReviews(reviewObj, authToken);
        if (response.success) {
            setTimeout(() => {
                dispatch(addReview(response.newReview));
                setReviewObj(initialReview);
                setIsLoading(false);
            }, 2000);

        } else {
            setIsLoading(false);
        }
        // console.log(response);
    };

    const handleClick = (e) => {
        // console.log(e.target.value);
        let star = Number(e.target.value);
        // console.log(star);
        setReviewObj((prevVal) => {
            return {
                ...prevVal,
                rating: String(star)
            }
        })
        setFullStar(new Array(star).fill(""));
        setHalfStar(new Array(5 - star).fill(""));
    }

    return (
        <>

            <div className="review_writer_container">
                {(thisUser !== undefined && !hasReview) &&
                    <div className="review_writer">
                        <div className="user_info">
                            <span className="user_icon">{thisUser.slice(0, 1)}</span>
                            <span className="user_id"> {thisUser} </span>
                        </div>
                        <div className="review_details">
                            <div className="review_rating">
                                <div className="rating_list">
                                    <p>Select Rating</p>
                                    <select onClick={handleClick}>
                                        <option value="0">0 - Poor</option>
                                        <option value="1">1 - Fair</option>
                                        <option value="2">2 - Good</option>
                                        <option value="3">3 - Very Good</option>
                                        <option value="4">4 - Excellent</option>
                                        <option value="5">5 - Fantastic</option>
                                    </select>

                                </div>
                                <div className="star_rating">
                                    {fullStar.map((star, i) => <span key={i} className="material-icons stars">star_rate</span>)}
                                    {halfStar.map((star, i) => <span key={i} className="material-icons stars">star_outline</span>)}
                                </div>
                            </div>
                            <div className="review_writing">
                                <textarea className="write_review" name="" id="" value={reviewObj.reviewContent} cols="30" rows="10" onChange={handleOnChange}></textarea>
                                <button disabled={reviewObj.reviewContent.length < 5 || isLoading} className="post_review" onClick={() => handlePost()}>
                                    {!isLoading &&
                                        <p>
                                            <span className="material-icons">send</span>
                                            <span> POST </span>
                                        </p>
                                    }
                                    {isLoading && <LoadingCircular />}
                                </button>

                            </div>

                        </div>
                    </div>
                }
                {(thisUser !== undefined && hasReview) &&
                    <div className="hasreview_disclaimer"> <span> You have already shared your review. You can edit it above. </span> </div>
                }
                {(thisUser === undefined) &&
                    <div className="nouser_disclaimer"> <span> Sign Up/Log In first to edit/add your comment! </span> </div>
                }
            </div>


        </>
    )
}

export default WriteReview