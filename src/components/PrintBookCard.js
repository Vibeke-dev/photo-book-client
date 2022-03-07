import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from 'react-router-dom';


const API_URL = "http://localhost:5005";

// We are deconstructing the props object directly in the parentheses of the function
function PrintBookCard(props) {
    const { user } = useContext(AuthContext);

    const [userId, setUserId] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

  // Get the token from the localStorage
  const storedToken = localStorage.getItem('authToken');

  //console.log("vibekes props")
  
  const {bookId} = props
  const {pictureData} = props
  const pictureId = pictureData[0]; 
  //console.log(pictureData[0])

  useEffect(() => {
    axios
      .get(`${API_URL}/api/pictures/${pictureId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const pictureData = response.data;
        console.log(pictureData)

        setUserId(pictureData.user);
        setDescription(pictureData.description);
        setImageUrl(pictureData.imageUrl);
      })
      .catch((error) => console.log(error));
    
  }, [pictureId]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/${userId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const userData = response.data;
        console.log(userData)

        setAddress(userData.address);
        //setDescription(pictureData.description);
        //setImageUrl(pictureData.imageUrl);
      })
      .catch((error) => console.log(error));
    
  }, [userId]);



    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Delete book when it has been send to print
        axios
          .delete(
          `${API_URL}/api/book/${bookId}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
          .then((response) => {
          
          props.refreshPictures();
          //navigate("/print");
        })
          .catch((error) => console.log(error));
      };

    return (
        <div className="AddPicture">
          <h3>Add Picture for your new picture book</h3>
          <p>When you fill out title and description then it will be added to the book automatically</p>
    
          <form onSubmit={handleSubmit}>
            <label>This is the userId {userId}:</label>
        
            <label>Address to send to: {address} </label>
            
    
            <button type="submit">Print</button>
          </form>
        </div>
      );
    }

export default PrintBookCard;
