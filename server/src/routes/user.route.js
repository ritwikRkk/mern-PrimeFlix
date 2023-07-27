import express from "express";
import { body } from "express-validator";
import userModel from "../models/User.js";
import requestHandler from "../handlers/request.handler.js";
import userController from "../controllers/user.controller.js";
import fetchUser from "../middlewares/fetchUser.js";

const router = express.Router();

router.post('/signup', [
    body("username")
        .exists().withMessage("Username can't be empty")
        .isLength({ min: 8 }).withMessage("Username should be at Least 8 characters long")
        .custom(async (value) => {
            let newVal = await (value.replace(/\s*/g, ""));
            const user = await userModel.findOne({ username: newVal });
            if (user) return Promise.reject("User Name not available. Try again with a different username!");
            // if (user) throw new Error("User Name not available. Try again with a different username!");
        }),
    body("email")
        .exists().withMessage("Email can't be empty")
        .isEmail().withMessage("Please enter a valid email Id.")
        .custom(async (value) => {
            const user = await userModel.findOne({ email: value });
            if (user) return Promise.reject("User already exists with this email Id!");
            // if (user) throw new Error("User already exists with this email Id!");
        }),
    body("password")
        .exists().withMessage("Password field can't be empty")
        .isLength({ min: 8 }).withMessage("Password should be at Least 8 characters long"),
    body("confirmPassword")
        .exists().withMessage("Confirm Password field can't be empty")
        .isLength({ min: 8 }).withMessage("ConfirmPassword should be at Least 8 characters long")
        .custom((value, { req }) => {
            if (value !== req.body.password) return Promise.reject("ConfirmPassword doesn't match, Recheck your password");
            // if (value !== req.body.password) throw new Error("ConfirmPassword doesn't match, Recheck your password");
            return true;
        }),
    requestHandler.validate,
    userController.signup

]);
router.post('/login', [
    body("loginid")
        .exists().withMessage("Username/Email can't be empty")
        .isLength({ min: 8 }).withMessage("Username/Email should be at Least 8 characters long"),
    body("password")
        .exists().withMessage("Password field can't be empty")
        .isLength({ min: 8 }).withMessage("Password should be at Least 8 characters long"),
    requestHandler.validate,
    userController.login,

]);

router.get("/getuserinfo", fetchUser, userController.getUser);

router.put("/update-password", fetchUser, [
    body("oldPassword")
        .exists().withMessage("Old Password field can't be empty")
        .isLength({ min: 8 }).withMessage("Old Password should be at Least 8 characters long"),
    body("newPassword")
        .exists().withMessage("New Password field can't be empty")
        .isLength({ min: 8 }).withMessage("New Password should be at Least 8 characters long"),
    body("confirmNewPassword")
        .exists().withMessage("Confirm New Password field can't be empty")
        .isLength({ min: 8 }).withMessage("Confirm New Password should be at Least 8 characters long")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) return Promise.reject("Confirm New Password doesn't match, Recheck your New password");
            // if (value !== req.body.password) throw new Error("ConfirmPassword doesn't match, Recheck your password");
            return true;
        }),
    requestHandler.validate,
    userController.updatePassword,
]);

router.get("/generes/:mediaType/:mediaCategory", (req, res) => {
    const { mediaType } = req.params;
    console.log(mediaType);
    res.json({ "query": req.query, "params": req.params });
});


export default router;