import { Router } from "express";
import { sendReceipt } from "../controllers/sendReceipt";

const router: Router = Router();

// receipt
router.post("/receipt/send", sendReceipt);

export default router;
