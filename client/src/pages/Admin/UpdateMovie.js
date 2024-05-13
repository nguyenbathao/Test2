import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import { Select } from 'antd';

const { Option } = Select;

const UpdateMovie = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [time, setTime] = useState('');
  const [isSeries, setIsSeries] = useState('');
  const [photo, setPhoto] = useState('');
  const [id, setId] = useState('');

  //get single movie
  const getSingleMovie = async () => {
    try {
      const { data } = await axios.get(`/api/v1/movie/get-movie/${params.slug}`);
      setName(data.movie.name);
      setId(data.movie._id);
      setDescription(data.movie.description);
      setYear(data.movie.price);
      setTime(data.movie.quantity);
      setIsSeries(data.movie.shipping);
      setGenre(data.movie.genre._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleMovie();
  }, []);

  //get all genre
  const getAllGenre = async () => {
    try {
      const { data } = await axios.get('/api/v1/genre/get-genre');
      if (data.success) {
        setGenres(data.genre);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting genre');
    }
  };

  useEffect(() => {
    getAllGenre();
  }, []);

  //create movie function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const movieData = new FormData();
      movieData.append('name', name);
      movieData.append('description', description);
      movieData.append('year', year);
      movieData.append('time', time);
      photo && movieData.append('photo', photo);
      movieData.append('genre', genre);
      const { data } = axios.put(`/api/v1/movie/update-movie/${id}`, movieData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success('Movie Updated Successfully');
        navigate('/dashboard/admin/movies');
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };

  //delete a movie
  const handleDelete = async () => {
    try {
      let answer = window.prompt('Are you sure to delete this movie ? ');
      if (!answer) return;
      const { data } = await axios.delete(`/api/v1/movie/delete-movie/${id}`);
      toast.success('Movie Deleted Succfully');
      navigate('/dashboard/admin/movies');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Dashboard - Update movie'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update movie</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a genre"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setGenre(value);
                }}
                value={genre}
              >
                {genres?.map((g) => (
                  <Option key={g._id} value={g._id}>
                    {g.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : 'Upload Photo'}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Movie Photo"
                      height={'200px'}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/movie/movie-photo/${id}`}
                      alt="Movie Photo"
                      height={'200px'}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a movie name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={year}
                  placeholder="Year"
                  className="form-control"
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={time}
                  placeholder="Time"
                  className="form-control"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Is Series "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setIsSeries(value);
                  }}
                  value={isSeries ? 'yes' : 'no'}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE MOVIE
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE MOVIE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateMovie;
