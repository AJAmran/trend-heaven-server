import { Router } from "express";
import { createCart, deleteCart, getCartById, getCartsByEmail, updateCart } from "../controllers/cartController.js";


const router = new Router();


router.get('/', getCartsByEmail)
router.get('/:id', getCartById)
router.post('/', createCart)
router.put('/', updateCart)
router.delete('/:id', deleteCart )

export default router;
