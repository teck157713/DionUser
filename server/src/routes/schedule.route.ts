import { Router } from "express";
import { addSchedule, getAvailableUsers, getUserSchedule } from "../controllers/schedule.controller";

const router = Router();

router.post("/addSchedule", addSchedule);
router.post("/getUserSchedule", getUserSchedule);
router.post("/getAvailableUsers", getAvailableUsers);

export const ScheduleRoutes = router;
