const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: false,
        },
        photo: {
            type: String,
            default: ""
        },
        username: {
            type: String,
            required: true,
        },
        categories: {
            type: Array,
            required: false
        }
    },
    {
        timestamps
    }
);
module.exports = mongoose.model("Post", PostSchema);