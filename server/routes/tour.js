import express from "express";
import {
  createTour,
  deleteTour,
  getTour,
  getToursBySearch,
  getTours,
  getToursByUser,
  updateTour,
  getToursByTag,
  getRelatedTours,
  likeDislikeTour,
} from "../controllers/tour.js";
import auth from "../middlewares/auth.js";
import checkObjectId from "../middlewares/checkIsMongoId.js";

const router = express.Router();

// @route   POST api/tour
// @desc    Create new tour
// @access  Private ie with token
router.post("/", auth, createTour);

// @route   GET api/tour
// @desc    Get all tour list
// @access  Public ie without token
router.get("/", getTours);

// @dynamic route   GET api/tour/:id
// @desc    Get particular tour item
// @access  Public
router.get("/:id", getTour);

// @route   GET api/tour/userTours/:id
// @desc    Get tours of particular user
// @access  Private
router.get("/userTours/:id", auth, checkObjectId("id"), getToursByUser);

// @route   DELETE api/tour
// @desc    Delete own tour
// @access  Private
router.delete("/userTours/:id", auth, checkObjectId("id"), deleteTour);

// @route   PATCH api/tour
// @desc    Update own tour
// @access  Private
router.patch("/userTours/:id", auth, checkObjectId("id"), updateTour);

// @route   GET api/tour/searchByTitle/search?searchQuery=_____
// @desc    Get all tours on basis of title meeting search query input
// @access  Public
router.get("/searchByTitle/search", getToursBySearch);

// @route   GET api/tour/searchByTag/:tag
// @desc    Get all tours on basis of tag
// @access  Public
router.get("/searchByTag/:tag", getToursByTag);

// @route   POST api/tour/relatedTours
// @desc    Get related tours on basis of body of tag
// @access  Public
router.post("/relatedTours", getRelatedTours);

// @route   PATCH api/tour/likeDislike/:id
// @desc    Like/Dislike tour
// @access  Private
router.patch("/likeDislike/:id", auth, checkObjectId("id"), likeDislikeTour);

export default router;
