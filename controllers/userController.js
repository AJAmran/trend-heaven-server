import mongoClient from "../db/mongoClient.js";

const usersCollection = mongoClient.db("mern-e-commerce").collection("users");

export const getUser = async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch users" });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const foundUser = await usersCollection.findOne({ email });

    if (foundUser) {
      return res.status(200).json(foundUser);
    }

    res.status(404).json({ message: "User not found" });
  } catch (error) {
    next(error);
  }
};
