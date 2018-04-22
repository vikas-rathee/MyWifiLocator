var express = require("express");
var router = express.Router();
var locationController = require("../controllers/locations");
var reviewController = require("../controllers/reviews");
var authController = require("../controllers/authentication");
var jwt = require("express-jwt");

var auth = jwt({
  secret : process.env.JWT_SECRET,
  requestProperty : "payload" //by default the decoded data is attached to req.user as the model name is also user so
                             //to avoid confusion changing it to payload
});
router.get("/locations", locationController.locationsListByDistance);
router.post("/locations", locationController.locationsCreate);
router.get("/locations/:locationid", locationController.locationsReadOne);
router.put("/locations/:locationid", locationController.locationsUpdateOne);
router.delete("/locations/:locationid", locationController.locationsDeleteOne);

router.get("/locations/:locationid/reviews/:reviewid", reviewController.reviewsReadOne);
router.post("/locations/:locationid/reviews", auth, reviewController.reviewsCreate);
router.put("/locations/:locationid/reviews/:reviewid", auth, reviewController.reviewsUpdateOne);
router.delete("/locations/:locationid/reviews/:reviewid", auth, reviewController.reviewsDeleteOne);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
