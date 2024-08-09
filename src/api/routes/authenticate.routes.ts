import { Router } from "express";
import { AuthenticareUserController } from "../controllers/AuthenticateUserController";
import { RefreshTokenController } from "../controllers/RefreshTokenController";

const authRoutes = Router();
const authenticareUserController = new AuthenticareUserController();
const refreshTokenController = new RefreshTokenController();


authRoutes.post("/login", authenticareUserController.handle);
authRoutes.post("/refresh-token", refreshTokenController.handle);

export { authRoutes };
