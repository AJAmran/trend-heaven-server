import { Router } from "express";
import { getUser } from "../controllers/userController.js";


const router = new Router();


router.get('/', getUser)

export default router;
