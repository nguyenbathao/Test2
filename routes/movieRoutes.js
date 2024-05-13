import express from 'express';
import formidable from 'express-formidable';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
  createMovieController,
  deleteMovieController,
  getMovieController,
  getSingleMoviesController,
  moviePhotoController,
  realtedMovieController,
  searchMovieController,
  updateMovieController,
} from '../controllers/movieController.js';

const router = express.Router();

//routes
router.post('/create-movie', requireSignIn, isAdmin, formidable(), createMovieController);

//get movies
router.get('/get-movie', getMovieController);

//single movies
router.get('/get-movie/:slug', getSingleMoviesController);

//get photo
router.get('/movie-photo/:pid', moviePhotoController);

//delete movie
router.delete('/delete-movie/:pid', deleteMovieController);

//update movie
router.put('/update-movie/:pid', requireSignIn, isAdmin, formidable(), updateMovieController);

//get similar movie
router.get('/related-movie/:pid/:cid', realtedMovieController);

//search movie
router.get('/search/:keyword', searchMovieController);

export default router;
