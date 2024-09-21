import { Event } from "../models/event.js";

export const getAll = ({ skip, limit }) => Event.find().skip(skip).limit(limit);

export const registerUser = (filter, data) =>
  Event.findByIdAndUpdate(filter, data, { new: true });
