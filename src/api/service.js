import axios from "axios";
const storedToken = localStorage.getItem('authToken');
const api = axios.create({
    
  baseURL: "https://photo-book2.herokuapp.com",
  headers: { Authorization: `Bearer ${storedToken}` }
});

const errorHandler = (err) => {
  throw err;
};

const getMovies = () => {
  return api.get("/movies")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return api.post("/api/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

const createMovie = (newMovie) => {
  return api.post("/movies", newMovie)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  getMovies,
  uploadImage,
  createMovie
};
