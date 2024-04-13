import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware/auth";
import authRouter from "./routes/auth";
import certificateRouter from "./routes/certificate";
import donationRouter from "./routes/donation";
import donorRouter from "./routes/donor";
import sendReceiptRouter from "./routes/sendReceipt";

const app: Express = express();
const uri: string = process.env.MONGODB_URI as string;
const PORT: string | number = process.env.PORT || 5555;
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:4444",
    allowedHeaders: ["Content-Type", "x-auth-token"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use(authMiddleware);
app.get("/api/auth/credentials/validity", (_req: Request, res: Response) => {
  res.status(200).send("User credentials is valid!");
});
app.use("/api", donorRouter);
app.use("/api", donationRouter);
app.use("/api", sendReceiptRouter);
app.use("/api", certificateRouter);

console.log("Loading...");
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    console.log("Error connecting DB");
    throw error;
  });

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is running");
});
