const router = require("express").Router();
const Post = require("../models/Post");

//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.username;
    const categories = req.query.categories;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (categories) {
            posts = await Post.find({ categories });
        } else {
            posts = await Post.find();
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
});

//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error)
    }
});

//UPDATE POST
router.put("/:user/:id", async (req, res) => {
    if (req.body.username === req.params.user) {
        try {
            const updatePost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatePost);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("Wrong id provided!")
    }
});

//DELETE POST
router.delete("/:user/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
        if (post.username === req.params.user) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted!");
            } catch (err) {
                res.status(500).json(err);
            }

        } else {
            res.status(401).json("You are not the owner of this post")
        }
    } catch (error) {
        res.status(404).json("Post not found!")
    }
});

module.exports = router; 