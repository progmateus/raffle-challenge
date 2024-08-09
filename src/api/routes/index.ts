import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { ordersRoutes } from "./orders.routes";

const router = Router();
router.use("/users", usersRoutes)
router.use("/orders", ordersRoutes)

export { router };