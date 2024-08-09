import { Router } from "express";
import { CreateOrderController } from "../controllers/CreateOrderController";

const ordersRoutes = Router();
const createOrderController = new CreateOrderController();


ordersRoutes.post("/", createOrderController.handle);

export { ordersRoutes };
