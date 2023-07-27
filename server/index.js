import express from "express";
// import connectToMongodb from "./db.js";
// import * as dotenv from 'dotenv';
// dotenv.config();
import "dotenv/config";
import http from "http";
import mongoose from 'mongoose';
// import userModel from "./src/models/User.js";
import routes from "./src/routes/index.js";
import cors from "cors";


const app = express();
// app.use(cors());
app.use(cors({
  origin: "https://primeflix-sage.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1', routes);

const PORT = process.env.PORT;

const server = http.createServer(app);
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("server connected to Mongodb");
    server.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  }).catch((err) => {
    console.log({ err });
    process.exit(1);
  });

// app.listen(PORT, function (err) {
//     if (!err) {
//         console.log("Server listening on PORT", PORT);
//         connectToMongodb();
//     }else{
//         console.log(err)
//     }
// });

// app.post('/', async function (req, res) {
//     let user = await userModel.create({
//         username: req.body.username,
//         displayname: req.body.displayname,
//         password: req.body.password
//     })
//     res.json(user);
// })
// app.get('/', async function (req, res) {
//     // let user = await userModel.findOne({ username: req.body.username });
//     let user = await userModel.find();
//     if(user){
//         res.json({user});
//     }else{
//         res.json({"user": "no user found"});
//     }
// })
