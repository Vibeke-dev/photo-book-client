import { useState, useEffect, useContext } from "react";
import axios from "axios";

import PictureCard from "../components/PictureCard";
import AddPicture from "../components/AddPicture";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

//This function is used to get the pictures by userID from DB
function PictureListPage() {
  const { user } = useContext(AuthContext);
  const [pictures, setPictures] = useState([]);
  
  const getAllPictures = () => {
    const storedToken = localStorage.getItem("authToken");
    
    axios
    .get(
    `${API_URL}/api/pictures/?userID=${user._id}`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
  )
    .then((response) => setPictures(response.data))

    .catch((error) => console.log(error));
};

  useEffect(() => {
    getAllPictures();
  }, [] );
  
  return (
    <div className="col-4">
      <AddPicture refreshPictures={getAllPictures} />

      {pictures.length >0 &&        
        <div style={{ maxHeight: '90vh', overflow: 'scroll'}}>
          { pictures.map((picture) => <PictureCard key={picture._id} {...picture} />  )}
        </div>
      }
    </div>
  );  
}

export default PictureListPage;

