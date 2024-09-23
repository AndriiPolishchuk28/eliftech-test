import * as events from "../services/eventsServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllEvents = async (req, res) => {
  const { page = 1, limit = 12, field, order } = req.query;
  const skip = (page - 1) * limit;
  const sortOption = {};

  if (field && order) {
    sortOption[field] = order === "desc" ? -1 : 1;
  }
  const totalHits = await events.getTotalHits();

  const result = await events.getAll({ skip, limit, sortOption });
  res.json({
    result,
    totalPages: Math.ceil(totalHits / limit),
  });
};

const userEvent = async (req, res) => {
  const { id } = req.params;
  const user = await events.registerUser(id, { $push: { users: req.body } });
  res.send(user);
};

const getAllParticipants = async (req, res) => {
  const { id } = req.params;
  const result = await events.getParticipants(id);
  res.send(result);
};

export default {
  getAllEvents: ctrlWrapper(getAllEvents),
  userEvent: ctrlWrapper(userEvent),
  getAllParticipants: ctrlWrapper(getAllParticipants),
};
