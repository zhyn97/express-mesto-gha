const router = require("express").Router();

const {
  getOneUser,
  getUsers,
  createUser,
  updateUserProfile,
  deleteUser,
  updateAvatar,
} = require("../controllers/users.js");

router.get("/users", getUsers);

router.get("/users/:id", getOneUser);

router.post("/users", createUser);

router.delete("/users/:id", deleteUser);

router.patch("/users/me", updateUserProfile);

router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
