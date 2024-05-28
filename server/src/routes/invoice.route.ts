import { Router } from "express";
import {
    draftInvoice, 
    getDraftInvoice 
} from "../controllers/invoice.controller";

const router = Router();

router.post("/getDraftInvoice", getDraftInvoice);
router.post("/draftInvoice", draftInvoice);

export const InvoiceRoutes = router;
