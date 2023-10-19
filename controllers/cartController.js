import { ObjectId } from "mongodb";
import mongoClient from "../db/mongoClient.js";

const cartsCollection = mongoClient.db("mern-e-commerce").collection("carts");
const productsCollection = mongoClient
  .db("mern-e-commerce")
  .collection("products");

//get cart by email
export const getCartsByEmail = async (req, res, next) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.send([]);
    }
    const condition = { userEmail: email };
    const result = await cartsCollection.find(condition).toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

//get cart by id
export const getCartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`Searching for cart with ID: ${id}`);
    const cart = await cartsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Create a new cart
export const createCart = async (req, res, next) => {
  try {
    const { productId, quantity, userEmail } = req.body;
    const product = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!product) {
      return res.status(401).json({ message: "Product not Found" });
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      images: product.imageUrl,
      stock: product.stock,
      quantity: parseInt(quantity),
      userEmail: userEmail,
    };
    const result = await cartsCollection.insertOne(cartItem);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

// Update a cart by its ID
export const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedCartItem = await cartsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { quantity: parseInt(quantity) } },
      { returnOriginal: false }
    );
    res.send(updatedCartItem);
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await cartsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};
