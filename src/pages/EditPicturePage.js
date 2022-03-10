import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const API_URL = "https://photo-book2.herokuapp.com";

function EditPicturePage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Get the token from the localStorage
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/pictures/${id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const onePicture = response.data;

        setTitle(onePicture.title);
        setDescription(onePicture.description);
        setImageUrl(onePicture.imageUrl);
      })
      .catch((error) => console.log(error));

  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description };

    axios
      .put(`${API_URL}/api/pictures/${id}`, requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate("/pictures")
      });
  };

  const deletePicture = () => {
    axios
      .delete(`${API_URL}/api/pictures/${id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        navigate("/pictures");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="backgroundEditColor">
      <div className="EditPicturePage">
        <h3>Edit the picture details</h3>

        <form onSubmit={handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br></br>
          <img src={imageUrl} alt="picture" width="200" />
          <br></br>
          <button type="submit">Update Picture</button>
        </form>

        <button onClick={deletePicture}>Delete Picture</button>
      </div>

      <Link to="/pictures">
        <button>Back to Photo Book</button>
      </Link>
    </div>
  );
}

export default EditPicturePage;
