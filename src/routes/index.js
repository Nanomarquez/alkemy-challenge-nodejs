const { Router } = require("express");

const moviesRouter = require("./movies");
const charactersRouter = require("./characters");
const authRouter = require("./auth");

const router = Router();

router.use("/auth", authRouter);
router.use("/characters", charactersRouter);
router.use("/movies", moviesRouter);

router.get("/", (req, res) => {
  res.json({data:"Welcome to my little api"});
});

module.exports = router;
