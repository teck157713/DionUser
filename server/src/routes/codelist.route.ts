import { Router } from "express";
import { getCodeList } from "../controllers/codelist.controller";

const router = Router();

router.post("/getCodeList", getCodeList);

export const CodeListRoutes = router;
