const express = require("express");
const User = require("../model/users.model");
const router = express.Router();

/* users profile
	POST /users/profile
	{
		"email": ...
	}
*/
router.post("/profile", function (req, res, next) {
  const email = req.body.email;
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(500).json({ message: "Cannot found user." });
      return res.json({ message: "Found user successfully.", user });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

/**
 * POST /users/change-status
 * {
 * 	"id"
 * }
 */
router.post("/change-status", function (req, res, next) {
  const id = req.body.id;
  User.findById(id)
    .then(async (user) => {
      if (!user) return res.status(500).json({ message: "Cannot found user." });
      user.active = !user.active;
      const savedUser = await user.save();
      return res.json({
        message: "User status changed successfully.",
        user: savedUser,
      });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});

/**
 * GET /users/all
 */
router.get("/all", function (req, res, next) {
  User.find({}, (err, users) => {
    if (err) res.status(500).json({ message: err.message });
    else {
      res.json({ message: "Fetch all users.", count: users.length, users });
    }
  });
});

module.exports = router;
