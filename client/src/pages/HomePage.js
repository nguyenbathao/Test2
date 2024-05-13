import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../styles/HomePagePopup.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  //get all movie
  const getAllMovies = async () => {
    try {
      const { data } = await axios.get('/api/v1/movie/get-movie');
      if (data.success) {
        setMovies(data.movies);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting genre');
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <Layout title={'All Movies'}>
      <div className="row">
        <div className="col-md-9">
          <h1 className="text-center">All Movies</h1>
          <div className="d-flex flex-wrap">
            {movies?.map((m) => (
              <div className="card m-2" style={{ width: '18rem' }} key={m._id}>
                <img
                  src={`/api/v1/movie/movie-photo/${m._id}`}
                  className="card-img-top"
                  alt={m.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{m.name}</h5>
                  <p className="card-title">{m.time} mins</p>
                  <p className="card-title">{m.year}</p>
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/movie/${m.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
