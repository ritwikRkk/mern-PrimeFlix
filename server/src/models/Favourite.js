import mongoose from "mongoose";
const { Schema } = mongoose;

const FavouriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    mediaId: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        required: true
    },
    mediaTitle: {
        type: String,
        required: true
    },
    mediaPoster: {
        type: String,
        required: true
    },
    mediaRating: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

}, { versionKey: false });

const favouriteModel = mongoose.model('Favourite', FavouriteSchema);
export default favouriteModel;