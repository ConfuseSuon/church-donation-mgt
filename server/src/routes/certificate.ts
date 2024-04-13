import { Router } from "express";

import { emailCertificate } from "../controllers/certificate";
import upload from "../middleware/upload";

const router: Router = Router();

router.post("/certificate/email", upload.single("file"), emailCertificate);

export default router;
