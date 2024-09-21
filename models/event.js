import { Schema, model } from "mongoose";
import { userSchema } from "./registerUser.js";

const eventSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    event_date: {
      type: String,
    },
    organizer: {
      type: String,
    },
    users: [userSchema],
  },
  {
    versionKey: false,
  }
);

export const Event = model("events", eventSchema);
