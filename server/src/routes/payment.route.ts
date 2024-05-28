import { Router } from "express";
import { createAccount, createIntent, getAccount, webhook } from "../controllers/payment.controller";

const router = Router();

router.post("/createAccount", createAccount);
router.post("/getAccount", getAccount);
router.post("/createIntent", createIntent);
router.post("/webhook", webhook);

export const PaymentRoutes = router;
