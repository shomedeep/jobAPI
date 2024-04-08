const express = require("express");

const authMiddleware = require("../middlewares/auth");
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

const router = express.Router();

// router.get("/", getAllJobs);
// router.get("/:id", getJob);
// router.post("/createJob", createJob);
// router.put("/updateJob", updateJob);
// router.delete("/deleteJob", deleteJob);

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
