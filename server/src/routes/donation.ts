import { Router } from "express";
import {
  addDonation,
  deleteDonation,
  getDonationById,
  getDonations,
  updateDonation,
} from "../controllers/donation";

const router: Router = Router();

// donor
router.post("/donation/add", addDonation);
router.get("/donation/all", getDonations);
router.get("/donation/get-by-id/:id", getDonationById);
router.put("/donation/update/:id", updateDonation);
router.delete("/donation/delete/:id", deleteDonation);

export default router;
