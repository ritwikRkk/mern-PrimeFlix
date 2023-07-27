import userModel from "../models/User.js";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const signup = async (req, res) => {
    let success = false;
    const { username, email, password } = req.body;

    try {
        const newUser = new userModel();
        // removing the whitespaces form the username
        newUser.username = username.replace(/\s*/g, "");
        newUser.email = email;
        await newUser.setPassword(password);
        await newUser.save();

        const data = {
            user: {
                id: newUser.id
            }
        }
        const authToken = jwt.sign(data, process.env.TOKEN_SECRET);
        success = true;
        // res.json({ success, newUser, authToken });
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }

}

const login = async (req, res) => {
    let success = false;
    let { loginid } = req.body;

    // Remove the whitespaces form the loginid
    loginid = loginid.replace(/\s*/g, "");
    req.body.loginid = loginid;

    try {
        // Check if the loginid is username or email
        if (loginid.indexOf("@") === -1) {
            req.body.username = loginid;
        } else {
            req.body.email = loginid;
        }
        const { username, password } = req.body;
        let user = await userModel.findOne({ [username ? "username" : "email"]: loginid }).select("username password email");
        if (!user) return res.status(401).json({ success, "error": "No User Found" });

        // Match entered password against the signup password
        let checkPass = await user.checkPassword(password);

        if (!checkPass) {
            return res.status(400).json({ success, error: "Please login using correct credentials." });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.TOKEN_SECRET);
        success = true;
        // res.json({ success, user, authToken });
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }

};

const getUser = async (req, res) => {
    let success = false;
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);
        if (!user) return res.status(401).json({success, "error": "No User Found" });
        success = true;
        res.json({success, user});
    } catch (error) {
        res.status(500).send("Internal Server error.");
    }
    // res.json(userId);
};

const updatePassword = async (req, res) => {
    let success = false;
    try {
        const {oldPassword, newPassword} = req.body;
        const userId = req.user.id;
        const user = await userModel.findById(userId).select("password");
        // console.log(user);
        if (!user) return res.status(401).json({ "error": "No User Found" });

        // check if User stored password matches with provided password(old password field)
        let checkPass = await user.checkPassword(oldPassword);
        if (!checkPass) {
            return res.status(400).json({ success, error: "Please login using correct credentials." });
        }

        // If above validation passes, update password
        await user.setPassword(newPassword);
        await user.save();
        success = true;
        res.status(200).json({ success, user });
        
    } catch (error) {
        res.status(500).json({success, "error-log": error, "error-msg": "Password updation failed."});
    }
};

export default { signup, login, getUser, updatePassword };