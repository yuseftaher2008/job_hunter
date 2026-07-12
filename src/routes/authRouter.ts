import express from "express";
import type { Router } from "express";
import { userRegister,userLogin } from "../controllers/authController.js";

export const authRouter :Router = express.Router()

authRouter.post ('/register',userRegister)
authRouter.post ('/login',userLogin)

