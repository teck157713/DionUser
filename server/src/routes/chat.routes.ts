import { Router } from "express";
import { getChatUsers, getMessages, sendMessage } from "../controllers/chat.controller";

const router = Router();

router.post("/getChatUsers", getChatUsers);
router.post("/getMessages", getMessages);
router.post("/sendMessage", sendMessage);

export const ChatRoutes = router;
