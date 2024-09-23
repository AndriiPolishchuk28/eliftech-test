import { Schema } from "mongoose";
import Joi from "joi";
import { handleSaveError } from "./hooks.js";

const emailPattern =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    birthDate: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    event: {
      type: String,
      enum: ["Social Media", "Friends", "Found myself"],
      required: [true, "Event source is required"],
    },
  },
  {
    versionKey: false,
  }
);

userSchema.post("save", handleSaveError);

export const registerSchema = Joi.object({
  fullName: Joi.string().min(6).required(),
  email: Joi.string().required().pattern(emailPattern),
  birthDate: Joi.date().required(),
  event: Joi.string()
    .valid("Social Media", "Friends", "Found myself")
    .required(),
});
