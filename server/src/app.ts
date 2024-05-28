import express from "express";
import cors from "cors";
import "./utils/stripe.utils";
import { token } from "./middlewares/token.middleware";
import { UserRoutes } from "./routes/user.route";
import { CodeListRoutes } from "./routes/codelist.route";
import { CaseRoutes } from "./routes/case.route";
import { ChatRoutes } from "./routes/chat.routes";
import { ScheduleRoutes } from "./routes/schedule.route";
import { InvoiceRoutes } from "./routes/invoice.route";
import { PaymentRoutes } from "./routes/payment.route";

const app = express();

// Middlewares
app.use(cors());
app.use(token);
app.use(express.json({
    limit: 1024*1024*10
}));

// Routes
app.use("/", CodeListRoutes);
app.use("/users", UserRoutes);
app.use("/cases", CaseRoutes);
app.use("/chats", ChatRoutes);
app.use("/schedules", ScheduleRoutes);
app.use("/invoices", InvoiceRoutes);
app.use("/payments", PaymentRoutes);

export const server = app;

// Create a WebSocket server completely detached
// export const server = http.createServer(app);
// initWebSocket(server);
