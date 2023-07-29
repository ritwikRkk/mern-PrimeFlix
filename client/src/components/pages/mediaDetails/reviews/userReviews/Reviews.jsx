import React, { useEffect, useState } from 'react';
// import { reviews } from '../../../Data';
import SliderFunctions from '../../../../utility/functions/SliderFunctions';
import ReviewCard from '../reviewCard/ReviewCard';
import EditReviewModal from '../modal/EditReviewModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateReview } from '../../../../../store/slices/mediaDetailsSlice';

const Reviews = (props) => {
    let dispatch = useDispatch();
    const reviews = useSelector(state => state.md.mdReviews);
    let thisUser = useSelector(state => state.user.userInfo.userName);

    // If review is deleted, then reRender the entire reviews
    useEffect(() => {
        setReviewArr(reviews);
    }, [reviews])
    

    let [scrollPos, setScrollPos] = useState(0);
    const [showModal, setShowModal] = useState(false);
    // const [reviewArr, setReviewArr] = useState(reviews);
    const [reviewArr, setReviewArr] = useState(reviews);

    const findThisUserReview = () => {
        // FIND OUT IF THERE IS A Review OF THIS USER reviewsArr
        let thisUserReview = reviews.filter((review) => {
            return review.userName === thisUser;
        })

        if (thisUserReview.length > 0) {
            let otherReview = reviews.filter((review) => {
                return review.userName !== thisUser;
            })
            otherReview.unshift(thisUserReview[0]);
            setReviewArr(otherReview);
        }
    }

    useEffect(() => {
        if(thisUser){
            findThisUserReview();
        }
        // eslint-disable-next-line
    }, [])

    // TO SHOW NUMBER OF Review SLIDES
    let [reviewsCircle, setReviewsCircle] = useState(1); // to find which slide is currently visible
    let [slideNum, setSlideNum] = useState(new Array(1).fill("")); // to find total number of slides

    useEffect(() => {
        // console.log('showHide');
        SliderFunctions.showHideArrow(props.mediaId, scrollPos, "reviews");
        document.querySelector(`.reviews_count_circle:nth-child(${reviewsCircle})`).style.opacity = 1;
        SliderFunctions.getSlideNum(props.mediaId, "reviews", setSlideNum);
        // eslint-disable-next-line
    }, [scrollPos, reviewArr]);

    window.addEventListener('resize', () => {
        SliderFunctions.handleResize("reviews", props.mediaId, setScrollPos, setReviewsCircle, reviewsCircle);
    });

    const handleSlide = (val) => {
        SliderFunctions.handleSlide(props.mediaId, setScrollPos, setReviewsCircle, "reviews", val);
    }

    // To show Edit Modal
    const [revContent, setRevContent] = useState("");
    const viewModal = (data) => {
        setRevContent(data);
        setShowModal(true)
    };
    const hideModal = (data, id) => {
        setShowModal(false);
        dispatch(updateReview({data, id}));
        // const newState = reviewArr.map(obj => {
        //     if (obj._id === id) {
        //         return { ...obj, reviewContent: data };
        //     }
        //     return obj;
        // });
        // setReviewArr(newState);
    };

    // let user = undefined;
    const createReviewsGrid = (reviews) => {
        return (
            <div key={reviews._id}>
                {reviews.userName === thisUser && <ReviewCard key={reviews._id} userData={reviews} thisUser={thisUser} viewModal={viewModal} />}
                {reviews.userName !== thisUser && <ReviewCard key={reviews._id} userData={reviews} />}
            </div>
        )
    }

    return (
        <div className="reviews_container">
            <div className="reviews">
                <div className="reviews_header"> <span className="header_container"> Reviews({props.revLen}) </span> </div>
                <div className="slider_container_reviews">
                    <button className={`left-arr_reviews arrow left-${props.mediaId}`} onClick={() => handleSlide("left")}>&lt;</button>
                    <div className={`slider_wrapper_reviews wrapp-${props.mediaId}`}>
                        {reviewArr.map(createReviewsGrid)}
                    </div>

                    <button className={`right-arr_reviews arrow right-${props.mediaId}`} onClick={() => handleSlide("right")}>&gt;</button>
                    <div className="reviews_count_container">
                        {/* <span className="cast_count_circle"></span> */}
                        {slideNum.map((arr, i) => <span key={i} className="reviews_count_circle"></span>)}
                    </div>

                </div>
            </div>
            {showModal && <EditReviewModal data={revContent} hideModal={hideModal} />}
        </div>
    )
}

export default Reviews