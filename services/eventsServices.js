import { Event } from "../models/event.js";

export const getAll = ({ skip, limit, sortOption }) =>
  Event.find().skip(skip).limit(limit).sort(sortOption);

export const getTotalHits = () => Event.countDocuments();

export const registerUser = (filter, data) =>
  Event.findByIdAndUpdate(filter, data, { new: true });

export const getParticipants = (id) => Event.findById(id).select("users");
