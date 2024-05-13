import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    genre: {
      type: mongoose.ObjectId,
      ref: 'Genre',
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    isSeries: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Movies', movieSchema);
