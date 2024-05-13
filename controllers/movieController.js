import movieModel from '../models/movieModel.js';
import slugify from 'slugify';
import fs from 'fs';

export const createMovieController = async (req, res) => {
  try {
    const { name, slug, description, year, genre, time } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is require' });
      case !description:
        return res.status(500).send({ error: 'Description is require' });
      case !year:
        return res.status(500).send({ error: 'Year is require' });
      case !genre:
        return res.status(500).send({ error: 'Genre is require' });
      case !time:
        return res.status(500).send({ error: 'Time is require' });
      case !photo && photo.size > 1000000:
        return res.status(500).send({ error: 'Photo is require and should be less than 1mb ' });
    }
    const movies = new movieModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      movies.photo.data = fs.readFileSync(photo.path);
      movies.photo.contentType = photo.type;
    }
    await movies.save();
    res.status(201).send({
      success: true,
      message: 'Movie create successfully',
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in creating movie',
    });
  }
};

//get all movies
export const getMovieController = async (req, res) => {
  try {
    const movies = await movieModel
      .find({})
      .populate('genre')
      .select('-photo')
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: movies.length,
      message: 'All Movies ',
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      send({
        success: false,
        message: 'Error in getting all movie',
        error,
      });
  }
};

// get single movies
export const getSingleMoviesController = async (req, res) => {
  try {
    const movie = await movieModel
      .findOne({ slug: req.params.slug })
      .select('-photo')
      .populate('genre');
    res.status(200).send({
      success: true,
      message: 'Single Movie Fetched',
      movie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getting one movie',
      error,
    });
  }
};

// get photo
export const moviePhotoController = async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.pid).select('photo');
    if (movie.photo.data) {
      res.set('Content-type', movie.photo.contentType);
      return res.status(200).send(movie.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getting movie photo',
      error,
    });
  }
};

//delete movie
export const deleteMovieController = async (req, res) => {
  try {
    await movieModel.findByIdAndDelete(req.params.pid).select('-photo');
    res.status(200).send({
      success: true,
      message: 'Movie Deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while deleting movie',
      error,
    });
  }
};

//update movie
export const updateMovieController = async (req, res) => {
  try {
    const { name, description, year, genre, time, isSeries } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Name is Required' });
      case !description:
        return res.status(500).send({ error: 'Description is Required' });
      case !year:
        return res.status(500).send({ error: 'Year is Required' });
      case !genre:
        return res.status(500).send({ error: 'Genre is Required' });
      case !time:
        return res.status(500).send({ error: 'Time is Required' });
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: 'Photo is required and should be less then 1mb' });
    }

    const movies = await movieModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true },
    );
    if (photo) {
      movies.photo.data = fs.readFileSync(photo.path);
      movies.photo.contentType = photo.type;
    }
    await movies.save();
    res.status(201).send({
      success: true,
      message: 'Movie updated successfully',
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in update movie',
    });
  }
};

//similar Movie
export const realtedMovieController = async (req, res) => {
  try {
    const { mid, gid } = req.params;
    const movies = await movieModel
      .find({
        genre: gid,
        _id: { $ne: mid },
      })
      .select('-photo')
      .limit(3)
      .populate('genre');
    res.status(200).send({
      success: true,
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error to get similar production',
    });
  }
};

//search
export const searchMovieController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await movieModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      })
      .select('-photo');
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error in search product API',
      error,
    });
  }
};
