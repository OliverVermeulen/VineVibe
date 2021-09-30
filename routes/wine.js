var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const Wine = require("../models/Wine.model");
const Service = require("../services/service");

router.get("/all-wine", (req, res) => {
  Wine.find().limit(100).then((wines) => res.json({ wines }));
});

router.post("/create-wine", (req, res) => {
  const {
    points,
    title,
    description,
    taster_name,
    taster_twitter_handle,
    price,
    designation,
    variety,
    region_1,
    region_2,
    province,
    country,
    winery,
  } = req.body;

  Wine.create({
    points,
    title,
    description,
    taster_name,
    taster_twitter_handle,
    price,
    designation,
    variety,
    region_1,
    region_2,
    province,
    country,
    winery,
  })
    .then((newWine) => res.json({ newWine }))
    .catch((error) => console.log(error));
});

//Get wine by specific id
router.get("/wine/:wineId", (req, res, next) => {
  console.log("line 51 wine.js", req.params);
  const { wineId } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(wineId)) {
  //   res.status(400).json({ message: 'Specified id is not valid' });
  //   return;
  // }
  Wine.findById(wineId)
    .then((wine) => res.status(200).json(wine))
    .catch((error) => res.json(error));
});

//Put route to update a specific user
router.put("/wine/:wineId", (req, res, next) => {
  const { wineId } = req.params;
  const {
    points,
    title,
    description,
    taster_name,
    taster_twitter_handle,
    price,
    designation,
    variety,
    region_1,
    region_2,
    province,
    country,
    winery,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(wineId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Wine.findByIdAndUpdate(
    wineId,
    {
      points,
      title,
      description,
      taster_name,
      taster_twitter_handle,
      price,
      designation,
      variety,
      region_1,
      region_2,
      province,
      country,
      winery,
    },
    { new: true }
  )
    .then((updatedWine) => res.status(200).json(updatedWine))
    .catch((error) => res.json(error));
});

//Deletes a specified user by id
router.delete("/wine/:wineId", (req, res, next) => {
  const { wineId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(wineId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Wine.findByIdAndRemove(wineId)
    .then(() =>
      res.json({ message: `Wine with ${wineId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});

module.exports = router;