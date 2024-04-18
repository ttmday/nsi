
import { Router } from "express";
import { createAOrder, getAllOrders, getAllProducts, getProduct } from "./controllers";

export const router = Router();



router.get('/products', getAllProducts);
router.get('/product/:id', getProduct);

router.get('/orders', getAllOrders);
router.post('/order', createAOrder);
