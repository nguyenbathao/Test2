import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';

const { Option } = Select;

const CreateMovie = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [time, setTime] = useState('');
  const [isSeries, setIsSeries] = useState('');
  const [photo, setPhoto] = useState('');

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

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const movieData = new FormData();
      movieData.append('name', name);
      movieData.append('description', description);
      movieData.append('year', year);
      movieData.append('time', time);
      movieData.append('photo', photo);
      movieData.append('genre', genre);
      const { data } = axios.post('/api/v1/movie/create-movie', movieData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success('Movies Created Successfully');
        navigate('/dashboard/admin/movies');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllGenre();
  }, []);

  return (
    <Layout title={'Movie'}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Movie</h1>
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
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product Photo"
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
                placeholder="Select Series "
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setIsSeries(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateMovie;
