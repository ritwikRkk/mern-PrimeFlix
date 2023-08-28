import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    let success = false;
    const errors = validationResult(req);

    // If there are any errors i.e errors array is not empty
    if(!errors.isEmpty()){
        return res.status(400).json({ success, msg: errors.array()[0].msg });
    }
    
    next();

};

export default {validate};