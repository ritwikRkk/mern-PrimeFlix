import express from "express";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import fetchUser from "../middlewares/fetchUser.js";
import favouriteController from "../controllers/favourite.controller.js";

const router = express.Router();


router.get("/fetchallfavourites", fetchUser, favouriteController.getFavourites);

router.post("/addfavourite", fetchUser, [
    body("mediaId")
        .exists().withMessage("Media Id field can't be empty")
        .isLength({ min: 1 }).withMessage("Media Id should be at Least 1 characters long"),
    body("mediaType")
        .exists().withMessage("media Type field can't be empty")
        .custom((value)=> ["movie", "tv"].includes(value)).withMessage("Media Type is invalid."),
    body("mediaTitle")
        .exists().withMessage("media Title field can't be empty")
        .isLength({ min: 3 }).withMessage("media Title should be at Least 3 characters long"),
    body("mediaPoster")
        .exists().withMessage("media Poster field can't be empty")
        .isLength({ min: 3 }).withMessage("media Poster should be at Least 3 characters long"),
    body("mediaRating")
        .exists().withMessage("media Rating field can't be empty")
        .isLength({ min: 1 }).withMessage("media Rating should be at Least 1 characters long"),
    body("release_date")
        .exists().withMessage("Release Date field can't be empty")
        .isLength({ min: 4 }).withMessage("Release Date should be at Least 4 characters long"),
    requestHandler.validate,
    favouriteController.addfavourite
    
]);

router.delete("/delete/:favouriteId", fetchUser, favouriteController.deleteFavourite);

export default router;