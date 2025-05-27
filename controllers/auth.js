// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const { statusCodes } = require("../utils/config");

// const JWT_SECRET = "your_secret_key";

// const signup = (req, res) => {
//   const { name, avatar, email, password } = req.body;

//   bcrypt.hash(password, 10).then((hash) =>
//     User.create({ name, avatar, email, password: hash })
//       .then((user) => {
//         const userData = user.toObject();
//         delete userData.password;
//         res.status(statusCodes.CREATED).send(userData);
//       })
//       .catch((err) => {
//         if (err.code === 11000) {
//           return res
//             .status(statusCodes.BAD_REQUEST)
//             .send({ message: "Email already exists" });
//         }
//         return res
//           .status(statusCodes.INTERNAL_SERVER_ERROR)
//           .send({ message: "An error has occured on the server" });
//       })
//   );
// };

// const signin = (req, res) => {
//   const { email, password } = req.body;

//   return User.findOne({ email })
//     .select("+password")
//     .then((user) => {
//       if (!user) {
//         return res
//           .status(statusCodes.BAD_REQUEST)
//           .send({ message: "Incorrect email or password" });
//       }

//       return bcrypt.compare(password, user.password).then((matched) => {
//         if (!matched) {
//           return res
//             .status(statusCodes.BAD_REQUEST)
//             .send({ message: "Incorrect email or password" });
//         }
//         const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
//           expiresIn: "7d",
//         });
//         return res.send({ token });
//       });
//     })
//     .catch(() =>
//       res
//         .status(statusCodes.INTERNAL_SERVER_ERROR)
//         .send({ message: "An error has occured on the server" })
//     );
// };

// module.exports = { signup, signin };
