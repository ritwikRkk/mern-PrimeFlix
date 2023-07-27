import mongoose from "mongoose";
// import * as dotenv from 'dotenv';
// dotenv.config();

// const URI = process.env.MONGODB_URL;
// console.log(URI);

const connectToMongodb = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}).then(()=>{
        console.log("Server Connected to MongoDB");
    }).catch(()=>{
        console.log("Failed to connect to MongoDB");
    });
}

export default connectToMongodb;