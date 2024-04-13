import { Router } from "express";
import {
  addDonor,
  deleteDonor,
  getDonorById,
  getDonors,
  updateDonor,
} from "../controllers/donor";

const router: Router = Router();

// donor
router.post("/donor/add", addDonor);
router.get("/donor/all", getDonors);
router.get("/donor/get-by-id/:id", getDonorById);
router.put("/donor/update/:id", updateDonor);
router.delete("/donor/delete/:id", deleteDonor);

export default router;
