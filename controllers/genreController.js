import genreModel from '../models/genreModel.js';
import slugify from 'slugify';

//create genre
export const createGenerController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: 'Name is require' });
    }
    const existingCategory = await genreModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: 'Genre is already exist',
      });
    }
    const category = await new genreModel({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: 'New Genre Created',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in created Genre',
    });
  }
};

//update genre
export const updateGenreController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await genreModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true },
    );
    res.status(200).send({
      success: true,
      messsage: 'Genre Updated Successfully',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while updating genre',
    });
  }
};

//get all genre
export const genreController = async (req, res) => {
  try {
    const genre = await genreModel.find({});
    res.status(200).send({
      success: true,
      message: 'All Genre List',
      genre,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while getting all genres',
    });
  }
};

//get single genre
export const singleGenreController = async (req, res) => {
  try {
    const category = await genreModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: 'Get Single Genre Successfully',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while getting one genre',
    });
  }
};

// delete genre
export const deleteGenreController = async (req, res) => {
  try {
    const { id } = req.params;
    await genreModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: 'Genre Deleted Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while deleting genre',
      error,
    });
  }
};
