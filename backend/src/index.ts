import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route.ts";

const app = express();
const BACKEND_PORT = process.env.PORT ?? 3001;
const BACKEND_URL =
    process.env.BACKEND_URL ?? `http://localhost:${BACKEND_PORT}`;
const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

app.use(cors({ origin: FRONTEND_URL })); // permite requests cross-origin com o frontend
app.use(express.json());
app.use("/users", userRouter);

app.listen(BACKEND_PORT, () => {
    console.log(`Server running on ${BACKEND_URL}`);
});
