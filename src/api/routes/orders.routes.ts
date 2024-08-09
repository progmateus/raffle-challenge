import { Router } from "express";
import { CreateOrderController } from "../controllers/CreateOrderController";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const ordersRoutes = Router();
const createOrderController = new CreateOrderController();


ordersRoutes.post("/", ensureAuthenticated, createOrderController.handle);

export { ordersRoutes };
