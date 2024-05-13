import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [relatedMovies, setRelatedMovies] = useState([]);

  //inital details
  useEffect(() => {
    if (params?.slug) getMovie();
  }, [params?.slug]);

  //get Movie
  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/api/v1/movie/get-movie/${params.slug}`);
      setMovie(data?.movie);
      getSimilarMovie(data?.movie._id, data?.movie.genre._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar movie
  const getSimilarMovie = async (mid, gid) => {
    try {
      const { data } = await axios.get(`/api/v1/movie/related-movie/${mid}/${gid}`);
      setRelatedMovies(data?.movies);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container movie-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/movie/movie-photo/${movie._id}`}
            className="card-img-top"
            alt={movie.name}
            height="400"
            width={'400px'}
          />
        </div>
        <div className="col-md-6 movie-details-info">
          <h1 className="text-center">Movie Details</h1>
          <hr />
          <h6>Name : {movie.name}</h6>
          <h6>Description : {movie.description}</h6>
          <h6>Year : {movie.year}</h6>
          <h6>Genre : {movie?.genre?.name}</h6>
        </div>
      </div>
      <hr />
      <div className="row container similar-movies">
        <h4>Similar Products ➡️</h4>
        {relatedMovies.length < 1 && <p className="text-center">No Similar Movie found</p>}
        <div className="d-flex flex-wrap">
          {relatedMovies?.map((m) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/movie/movie-photo/${m._id}`}
                className="card-img-top"
                alt={m.name}
              />
              <div className="card-body">
                <div className="card-name">
                  <h5 className="card-title">{m.name}</h5>
                  <h5 className="card-title">{m.year}</h5>
                </div>
                <p className="card-text ">{m.description.substring(0, 60)}...</p>
                <div className="card-name">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/movie/${m.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetails;
