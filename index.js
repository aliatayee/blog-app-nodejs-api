const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");
const multer = require("multer");

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("Connected to mongo"))
    .catch((err) => console.log(err));
    
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoriesRoute);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})