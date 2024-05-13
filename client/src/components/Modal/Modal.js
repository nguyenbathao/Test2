import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import toast from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [movie, setMovie] = useState([]);

  //get all movie
  const getAMovie = async () => {
    try {
      const { data } = await axios.get('/api/v1/movie/get-movie/:slug');
      if (data.success) {
        setMovie(data.movie);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting genre');
    }
  };

  useEffect(() => {
    getAMovie();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen}>More Details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {movie?.map((m) => (
              <div>
                <img
                  src={`/api/v1/movie/movie-photo/${m._id}`}
                  className="card-img-top"
                  alt={m.name}
                />
                <h5 className="card-title">{m.name}</h5>
                <p className="card-title">{m.time} mins</p>
                <p className="card-title">{m.year}</p>
                <p className="card-title">{m.description}</p>
              </div>
            ))}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
