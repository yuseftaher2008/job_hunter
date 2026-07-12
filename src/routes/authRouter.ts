import express from "express";
import type { Router } from "express";
import { userRegister } from "../controllers/authController.js";

export const authRouter :Router = express.Router()

authRouter.post ('/register',userRegister)

