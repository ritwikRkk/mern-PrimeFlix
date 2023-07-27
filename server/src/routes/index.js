import express from "express";
import userRoute from "./user.route.js"
import reviewRoute from "./review.route.js";
import favouriteRoute from "./favourite.route.js";
import mediaRoute from "./media.route.js";



const router = express.Router();
router.use("/user", userRoute);
router.use("/review", reviewRoute);
router.use("/favourite", favouriteRoute);
router.use("/media", mediaRoute);
// router.use("", );


export default router;