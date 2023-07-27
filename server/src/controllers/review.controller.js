import reviewModel from "../models/Review.js";

const addreview = async (req, res) => {
    // console.log(req.body);
    let success = false;
    let {mediaId, mediaType} = req.body;
    try {
        // check if this user already has shared review on this movie/tv
        const review = await reviewModel.find({ mediaType, mediaId, user:req.user.id });
        if(review.length > 0) return res.status(400).json({ success, msg: "Review Already Exists for this movie/tv-series by this user." });

        // const { movieId} = req.params;
        const newReview = await reviewModel.create({
            user: req.user.id,
            ...req.body
        });
        success = true;
        res.json({success, newReview});
    } catch (error) {
        res.json({success, error});
    }
}

const deleteReview = async (req, res) => {
    let success = false;
    try {
        const { reviewId } = req.params;
        // const review = await reviewModel.findOneAndDelete({ _id: reviewId, user: req.user.id });
        const review = await reviewModel.findOneAndDelete({ $and: [{ _id: reviewId }, { user: req.user.id }] });
        if (!review) return res.json({ success, "error": "No Review found" });
        success = true;
        return res.json({ success, "msg": "Review deleted successfully", review });
    } catch (error) {
        return res.json({ "error message": error.message });
    }
}


// FETCH ALL REVIEWS OF A PARTICULAR USER
const getUsersReviews = async (req, res) => {
    let success = false;
    try {
        // console.log(req.user.id);
        const reviews = await reviewModel.find({ user: req.user.id }).sort({ createdAt: 'desc' });
        if (reviews.length === 0) return res.json({ success, "errors": "No reviews found for this user Id." });
        success = true;
        res.json({ success, reviews });
    } catch (error) {
        return res.json({ "error message": error.message });
    }
}

const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.id;
    let newReview = {
        reviewContent: req.body.reviewContent,
        updatedAt: new Date().toGMTString(),
    }
    let success = false;
    try {
        let review = await reviewModel.findById(reviewId);
        if (!review) { return res.status(404).json({ success, error: "No review found for this userId." }) };

        // Allow Updation only if this user owns this review
        if (review.user.toString() !== userId.toString()) { return res.status(401).json({ success, error: "Not Allowed!" }); }

        // Update the review
        let updatedreview = await reviewModel.findByIdAndUpdate(reviewId, { $set: newReview }, { new: true });
        if (updateReview) {
            success = true;
            res.status(200).json({ success, msg: "Review updated successfully", updatedreview })
        }
    } catch (error) {
        return res.json({ "error message": error.message });
    }
}

// FETCH REVIEWS OF A PARTICULAR MEDIA(MOVIE/TV) WITH MEDIAID
const getMediaReviews = async (req, res) => {
    const { mediaType, mediaId } = req.params;
    // res.json({ mediaType, mediaId });
    let success = false;
    try {
        // const reviews = await reviewModel.find({mediaType: mediaType }).sort({ createdAt: 'desc' });
        // const reviews = await reviewModel.find({mediaId: mediaId }).sort({ createdAt: 'desc' });
        const reviews = await reviewModel.find({ mediaType, mediaId }).sort({ createdAt: 'desc' });
        if (reviews.length === 0) return res.json({ success, "errors": "No reviews found for this user Id." });
        success = true;
        res.json({ success, reviews });
    } catch (error) {
        return res.json({ "error message": error.message });
    }
}

export default { addreview, deleteReview, getUsersReviews, getMediaReviews, updateReview };
