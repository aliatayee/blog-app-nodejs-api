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
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required:true
            },
            username: String,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        categories: {
            type: Array,
            required: false
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Post", PostSchema);