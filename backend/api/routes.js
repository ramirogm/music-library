const express = require("express");
const libraryService = require("../services/libraryService");

const router = express.Router();

const BASE_PATH = "/music-library/v1";

router.get(`${BASE_PATH}/users/:userId/library`, async (req, res, next) => {
  try {
    let params = req.params;
    console.log("params... ", params);
    let userId = req.params.userId;

    if (!userId) {
      returnError(400, "No userId specified!", res, next);
    }

    let userLibrary = await libraryService.getUserLibrary(userId);
    if (!userLibrary) {
      returnError(404, { error: "User not found" }, res, next);
    }
    makeJsonResponse(res, 200, userLibrary);
    next();
  } catch (err) {
    makeJsonResponse(res, 500, err.message || err);
    return next(err);
  }
});

router.get(`${BASE_PATH}/tracks/:trackId`, async (req, res, next) => {
  try {
    let params = req.params;
    console.log("params... ", params);
    let trackId = req.params.trackId;

    if (!trackId) {
      returnError(400, "No trackId specified!", res, next);
    }

    let track = await libraryService.getTrack(trackId);
    if (!track) {
      returnError(404, { error: "Track not found" }, res, next);
    }
    makeJsonResponse(res, 200, track);
    next();
  } catch (err) {
    makeJsonResponse(res, 500, err.message || err);
    return next(err);
  }
});

const returnError = (statusCode, message, res, next) => {
  makeJsonResponse(res, statusCode, message);
  console.error(statusCode, message);
  return next();
};

function makeJsonResponse(res, statusCode, body) {
  res.status(statusCode).json(body);
}

module.exports = router;
