import express from "express";
import mediaController from "../controllers/media.controller.js";

const router = express.Router();
// const router = express.Router({mergeParams: true});

router.get("/search/:mediaType", mediaController.search);
router.get("/search/query/:mediaType", mediaController.querySearch);
router.get("/genres/:mediaType", mediaController.fetchGenres);
router.get("/search/:mediaType/:mediaId", mediaController.mediaDetails);
router.get("/search/:mediaType/:mediaId/credits", mediaController.mediaCredits);
router.get("/search/:mediaType/:mediaId/videos", mediaController.mediaVideos);
router.get("/search/:mediaType/:mediaId/images", mediaController.mediaImages);
router.get("/search/:mediaType/:mediaId/recommendations", mediaController.mediaRecommendations);
router.get("/search/person/:personId", mediaController.personDetail);
router.get("/search/person/query/qs", mediaController.personQuery);
router.get("/search/person/:personId/combined_credits", mediaController.combinedCredits);
// router.get();
// router.get();
// router.get();
// router.get();
// router.get();

export default router;
