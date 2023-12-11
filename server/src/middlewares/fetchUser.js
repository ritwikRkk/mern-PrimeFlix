import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const fetchUser = (req, res, next) => {
    // Get the user from the JWT Token and add it to req object
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({error: "Please authenticate using a valid token."})
    }
    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token!"})
    }

}

export default fetchUser;