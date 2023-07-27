import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import fetchUser from "../middlewares/fetchUser.js";
import reviewController from "../controllers/review.controller.js";

const router = express.Router();

// FETCH ALL REVIEWS OF A PARTICULAR USER
router.get("/fetchallreviews", fetchUser, reviewController.getUsersReviews);

// FETCH REVIEWS OF A PARTICULAR MEDIA(MOVIE/TV) WITH MEDIAID
router.get("/fetchreviews/:mediaType/:mediaId", reviewController.getMediaReviews);

router.post("/addreview", fetchUser, [
    body("mediaId")
        .exists().withMessage("Media Id field can't be empty")
        .isLength({ min: 1 }).withMessage("Media Id should be at Least 1 characters long"),
    body("reviewContent").exists().withMessage("Review Content field can't be empty")
        .isLength({ min: 3 }).withMessage("Review Content should be at Least 3 characters long"),
    body("mediaType")
        .exists().withMessage("media Type field can't be empty")
        .custom((value) => ["movie", "tv"].includes(value)).withMessage("Media Type is invalid."),
    body("userName")
        .exists().withMessage("user Name field can't be empty")
        .isLength({ min: 3 }).withMessage("user Name should be at Least 3 characters long"),
    body("rating")
        .exists().withMessage("Rating field can't be empty")
        .isLength({ max: 1, min: 1 }).withMessage("Rating should be 1 characters long"),
    requestHandler.validate,
    reviewController.addreview

]);
router.put("/updatereview/:reviewId", fetchUser, [
    body("reviewContent").exists().withMessage("Review Content field can't be empty")
        .isLength({ min: 3 }).withMessage("Review Content should be at Least 3 characters long"),
    requestHandler.validate,
    reviewController.updateReview

]);

router.delete("/delete/:reviewId", fetchUser, reviewController.deleteReview);

export default router;