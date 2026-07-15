import express from "express";
import type { Router } from "express";
import { userRegister,userLogin,linkedinRedirect,linkedinCallback } from "../controllers/authController.js";
import { isLogedIn } from "../middleware/authMiddleware.js";
import "../types/requestInterface.js";

export const authRouter :Router = express.Router();

authRouter.post ('/register',userRegister);
authRouter.post ('/login',userLogin);
authRouter.get('/linkedin',linkedinRedirect);
authRouter.get('/linkedin/callback',linkedinCallback);
