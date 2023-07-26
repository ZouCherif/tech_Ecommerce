const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    pwd,
    pwdC,
    phoneNumber,
    address,
  } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "email and password are required." });
  if (pwd !== pwdC)
    return res.status(400).json({ message: "password does not match" });
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //create and store the new user
    const result = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPwd,
      phoneNumber,
      address,
    });
    console.log(result);
    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
