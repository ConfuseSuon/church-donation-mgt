import { Router } from "express";
import { login, register } from "../controllers/auth";
// import { loginUser } from "../controllers/auth";

const router: Router = Router();

// auth
router.post("/login", login);
router.post("/register", register);

export default router;
