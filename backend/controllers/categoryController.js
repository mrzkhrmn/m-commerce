import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required!" });

    const isCategoryExist = await Category.findOne({ name });
    if (isCategoryExist)
      return res.status(400).json({ error: "Category is already exists!" });

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({ name: newCategory.name, _id: newCategory._id });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findOne({ _id: id });

    if (!category)
      return res.status(404).json({ error: "Category not found!" });

    category.name = name || category.name;

    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category)
      return res.status(404).json({ error: "Category not found!" });

    await Category.deleteOne({ _id: id });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({});

    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category)
      return res.status(404).json({ error: "Category not found!" });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};
