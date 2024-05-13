import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
  createGenerController,
  deleteGenreController,
  genreController,
  singleGenreController,
  updateGenreController,
} from '../controllers/genreController.js';

const router = express.Router();

//routes
router.post('/create-genre', requireSignIn, isAdmin, createGenerController);

//update genre
router.put('/update-genre/:id', requireSignIn, isAdmin, updateGenreController);

//get all genre
router.get('/get-genre', genreController);

//get single genre
router.get('/single-genre/:slug', singleGenreController);

//delete genre
router.delete('/delete-genre/:id', requireSignIn, isAdmin, deleteGenreController);

export default router;
