import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoClient from "./db/mongoClient.js";
import catchError from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import carRoute from "./routes/cartRoutes.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/carts", carRoute);
app.use("/api/products", productRoute);

app.use(catchError);

mongoClient
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`[⚡server] running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`[database] failed to connect to db ${error}`);
    process.exit(0);
  });
