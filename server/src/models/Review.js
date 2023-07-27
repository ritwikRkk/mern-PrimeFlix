import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviewContent: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        required: true
    },
    mediaId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date().toGMTString(),
        // default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    },
}, { versionKey: false });

const reviewModel = mongoose.model('Review', ReviewSchema);
export default reviewModel;