const Users = require("../model/User");

const getAllusers = async (req, res) => {
  const users = await Users.find();
  if (!users) return res.status(204).json({ "message": "No user Found" });
};

const DeleteUsers = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ "message": "User ID is required" });
  const users = await Users.findOne({ __id: req.body.id }).exec();
  if (!users) {
    return res
      .status(204)
      .json({ "message": `No Users Matches  ID ${req.body.id} ` });
  }
  const result = await Users.deleteOne({ __id: req.body.id });
  res.json(result);
};

const GetUsers = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ "message": " User's ID required." });

  const users = await Users.findOne({ _id: req.params.id }).exec();
  if (!users) {
    return res
      .status(204)
      .json({ "message": `No user's matches ID ${req.params.id}.` });
  }
  res.json(users);
};
module.exports = {
  getAllusers,
  DeleteUsers,
  GetUsers,
};
