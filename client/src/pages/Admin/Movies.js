import { Layout } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  //get all product
  const getAllMovies = async () => {
    try {
      const { data } = await axios.get('/api/v1/movie/get-movie');
      setMovies(data.movies);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Movies List</h1>
          <div className="d-flex flex-wrap">
            {movies?.map((m) => (
              <Link key={m._id} to={`/dashboard/admin/movie/${m.slug}`} className="product-link">
                <div className="card m-2" style={{ width: '18rem' }} key={m._id}>
                  <img
                    src={`/api/v1/movie/movie-photo/${m._id}`}
                    className="card-img-top"
                    alt={m.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{m.name}</h5>
                    <p className="card-text">{m.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Movies;
