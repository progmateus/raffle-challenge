import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { ordersRoutes } from "./orders.routes";
import { authRoutes } from "./authenticate.routes";

const router = Router();
router.use("/users", usersRoutes)
router.use("/orders", ordersRoutes)
router.use("/auth", authRoutes)

export { router };