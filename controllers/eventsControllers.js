import * as events from "../services/eventsServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllEvents = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const result = await events.getAll({ skip, limit });
  res.json(result);
};

const userEvent = async (req, res) => {
  const { id } = req.params;
  const user = await events.registerUser(id, { $push: { users: req.body } });
  res.send(user);
};

export default {
  getAllEvents: ctrlWrapper(getAllEvents),
  userEvent: ctrlWrapper(userEvent),
};
