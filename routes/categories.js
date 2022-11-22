const router = require("express").Router();
const Category = require("../models/Category");
const auth = require("../middleware/auth")
//GET CATEGORIES
router.get("/", auth, async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error)
    }
});

//CREATE CATEGORY
router.post("/", auth, async (req, res) => {
    const category = new Category(req.body);
    try {
        const savedCategory = await category.save();
        res.status(200).json(savedCategory);
    } catch (error) {
        res.status(500).json(error)
    }
});

//UPDATE CATEGORY
router.put("/:id", auth, async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE CATEGORY
router.delete("/:id", auth, async (req, res) => {
    try {
        try {
            const category = await Category.findById(req.params.id);
            await category.delete();
            res.status(200).json("Category has been deleted!");
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (error) {
        res.status(404).json("Category not found!")
    }
});

module.exports = router; 