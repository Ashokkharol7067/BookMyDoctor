import express from "express";
import { sendContactMessage } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/send-message", sendContactMessage);

export default contactRouter;