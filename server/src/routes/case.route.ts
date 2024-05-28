import { Router } from "express";
import {
    add, 
    getUserCase, 
    getUserCreatedHistory, 
    getUserCreatedPending, 
    setPaymentPending
} from "../controllers/case.controller";

const router = Router();

router.post("/add", add);
router.post("/getUserCase", getUserCase);
router.post("/getUserCreatedPending", getUserCreatedPending)
router.post("/getUserCreatedHistory", getUserCreatedHistory);
router.post("/setPaymentPending", setPaymentPending);

export const CaseRoutes = router;
