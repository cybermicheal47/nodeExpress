const User = require("../model/User");

const handleLogout = async (req, res) => {
  //on Client, also delete the backend token

  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204).json({ message: "NO CONTENT" }); // No content
  }

  const refreshToken = cookies.jwt;
  //is refresh token in db
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  //DELETE REFRESHTOKEN  IN DB

  foundUser.refreshToken = " ";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true : only serves on http

  res.sendStatus(204);
};

module.exports = { handleLogout };
