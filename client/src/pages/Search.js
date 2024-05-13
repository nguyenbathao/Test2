import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title={'Search Results'}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1 ? 'No Movie Found' : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap">
            {values?.results.map((m) => (
              <div className="card m-2" style={{ width: '18rem' }}>
                <img
                  src={`/api/v1/movie/movie-photo/${m._id}`}
                  className="card-img-top"
                  alt={m.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{m.name}</h5>
                  <p className="card-context">{m.description.substring(0, 30)}...</p>
                  <p className="card-context">{m.time} min</p>
                  <button
                    className="btn btn-primary ms-1"
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

export default Search;
