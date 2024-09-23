import express from "express";
import ctrl from "../controllers/eventsControllers.js";
import * as schemas from "../models/registerUser.js";
import validateBody from "../helpers/validateBody.js";

const eventsRouter = express.Router();

eventsRouter.get("/", ctrl.getAllEvents);
eventsRouter.post(
  "/register/:id",
  validateBody(schemas.registerSchema),
  ctrl.userEvent
);
eventsRouter.get("/participants/:id", ctrl.getAllParticipants);

export default eventsRouter;
