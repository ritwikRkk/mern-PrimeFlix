import apiFunctions from "../apiFunction/api.functions";

const reviewEndPoints = {
    getReviews: ({mediaType, mediaId}) => `review/fetchreviews/${mediaType}/${mediaId}`,
    addReviews: () => `review/addreview`,
    deleteReviews: ( reviewId ) => `review/delete/${reviewId}`,
    updateReview: ( reviewId ) => `review/updatereview/${reviewId}`,
}

const reviewApi = {
    getReviews: async ({mediaType, mediaId}) => {
        try {
            const response = await apiFunctions.get(reviewEndPoints.getReviews({mediaType, mediaId}) );
            return response;
        } catch (error) {
            return error;
        }
    },
    addReviews: async (review, token) => {
        try {
            const response = await apiFunctions.postData(reviewEndPoints.addReviews(), review, token);
            return response;
        } catch (error) {
            return error;
        }
    },
    updateReview: async (reviewId, newReview, token) => {
        try {
            const response = await apiFunctions.putData(reviewEndPoints.updateReview(reviewId), newReview, token);
            return response;
        } catch (error) {
            return error;
        }
    },
    deleteReviews: async (reviewId, token) => {
        try {
            const response = await apiFunctions.delete(reviewEndPoints.deleteReviews(reviewId), token);
            return response;
        } catch (error) {
            return error;
        }
    },

}

export default reviewApi;