import { ObjectId } from "mongodb";
import mongoClient from "../db/mongoClient.js";

const productsCollection = mongoClient
  .db("mern-e-commerce")
  .collection("products");

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await productsCollection.find({}).toArray();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Get a product by its ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };

    const product = await productsCollection.findOne(query);

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { body } = req;

    if (!body) {
      return res.status(400).json({ message: "Invalid body" });
    }

    const newProduct = await productsCollection.insertOne(body);

    if (newProduct) {
      return res
        .status(201)
        .json({ message: "Product created successfully", newProduct });
    }

    res.status(400).json({ message: "Failed to create product" });
  } catch (error) {
    next(error);
  }
};

// Update a product by its ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;

    const query = { _id: new ObjectId(id) };
    const update = { $set: updatedProduct };

    const result = await productsCollection.updateOne(query, update);

    if (result.modifiedCount > 0) {
      return res.status(200).json({ message: "Product updated successfully" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a product by its ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };

    const result = await productsCollection.deleteOne(query);

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};
