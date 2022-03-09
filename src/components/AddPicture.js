import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import service from "../api/service";
import { useNavigate } from 'react-router-dom';



// const API_URL = "http://localhost:5005";
const API_URL = "https://photo-book2.herokuapp.com/";

function AddPicture(props) {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    service
      .uploadImage(uploadData)
      .then(response => {
        //console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description, imageUrl, user: user._id };
    //console.log("test")
    //console.log(requestBody)
   
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');
   
    // Send the token through the request "Authorization" Headers
    axios
      .post(
      `${API_URL}/api/pictures`,
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
      // Reset the state
      setTitle("");
      setDescription("");
      setImageUrl("");
      
      props.refreshPictures();
      navigate("/pictures");
    })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddPicture">
      <h3>Add Picture for your new picture book</h3>
      <p>When you fill out title and description then it will be added to the book automatically</p>

      <form onSubmit={handleSubmit}>
        <label>Title for the picture:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description for the picture:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input 
        type="file"
        onChange={(e) => handleFileUpload(e)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddPicture;