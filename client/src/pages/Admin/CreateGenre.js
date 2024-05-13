import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Modal } from 'antd';
import GenreForm from '../../components/Form/GenreForm';

const CreateGenre = () => {
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState();
  const [visible, setVisible] = useState(false);
  const [selected, setSeclected] = useState(null);
  const [updateName, setUpdateName] = useState('');

  //handle form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/genre/create-genre', {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllGenre();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in input form');
    }
  };

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

  //update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/genre/update-genre/${selected._id}`, {
        name: updateName,
      });
      if (data.success) {
        toast.success(`${updateName} is updated`);
        setSeclected(null);
        setUpdateName('');
        setVisible(false);
        getAllGenre();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  //delete
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/v1/genre/delete-genre/${pId}`);
      if (data.success) {
        toast.success(`Category is delete`);
        getAllGenre();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Genre'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Genre</h1>
            <div className="p-3 w-50">
              <GenreForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {genres?.map((g) => (
                    <>
                      <tr>
                        <td key={g._id}>{g.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(g.name);
                              setSeclected(g);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDelete(g._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
              <GenreForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateGenre;
