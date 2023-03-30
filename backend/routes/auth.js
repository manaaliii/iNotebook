const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

//JWT CLIENT SERVER BICH SECURE COMMUNICATION

const JWT_SECRET = "thisisasecret";
//ROUTE 1: create a user using : POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [ 
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    
    try {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ success, eerror: "sorry, user with this email already exists" });
      }

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      //   res.json(user);
      res.json({success ,authToken });
    } catch (error) {
      success = false;
      console.error(error.message);
      res.status(500).send(success, "internal server error");
    }
  }
);

//ROUTE 2: create a user using : POST "/api/auth/login". Doesn't require Auth
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password can't be black").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      let success = false;
      if (!user) {
        return res
          .status(400)
          .json({success, error: "please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success,  error: "please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("internal server error");}
  }
);


// ROUTE 3: Get logged in user details using, POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser,async (req, res) => {
  //middleware is called whenever routes requires login
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);z
    res.status(500).send("internal server error");
  }
});

module.exports = router;




