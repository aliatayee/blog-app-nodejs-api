const router = require("express").Router();
const Category = require("../models/Category");

//GET CATEGORIES
router.get("/", async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error)
    }
});

//CREATE CATEGORY
router.post("/", async (req, res) => {
    const category = new Category(req.body);
    try {
        const savedCategory = await category.save();
        res.status(200).json(savedCategory);
    } catch (error) {
        res.status(500).json(error)
    }
});

//UPDATE CATEGORY
router.put("/:id", async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE CATEGORY
router.delete("/:id", async (req, res) => {
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