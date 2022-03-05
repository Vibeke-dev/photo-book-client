import { useState, useEffect, useContext } from "react";
import axios from "axios";

import PictureCard from "../components/PictureCard";
import AddPicture from "../components/AddPicture";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from '../context/theme.context';
import Blur from 'react-blur'

import book from './../images/bookNeutral.jpg';
import book2 from './../images/book2.jpg';
import backgroundNeutral from './../images/backgroundNeutral.jpg';

const API_URL = "http://localhost:5005";

//This function is used to get the pictures by userID from DB
function PictureListPage() {
  const { user } = useContext(AuthContext);
  const [pictures, setPictures] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
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
    <div className={'row containerBackground'} style={{ backgroundImage: `url(${backgroundNeutral})` }}>
      <div className="col-5">
        <AddPicture refreshPictures={getAllPictures} />

        {pictures.length >0 &&        
          <div style={{ maxHeight: '90vh', overflow: 'scroll'}}>
            { pictures.map((picture) => <PictureCard key={picture._id} {...picture} />  )}
          </div>
        }
      </div>
      
      <div className="col-7">
        <div>
          <h3>Choose theme of your Photo Book</h3>
          <form className="form-inline">
            <input
              id="flexRadioDefault1"
              type="radio"
              name="switchToggle"
              value="Summer"
              onChange={toggleTheme}
            />
            <label className="radio-inline col-xs-6" for="Summer">Summer theme</label>
        
          
            <input
              type="radio"
              name="switchToggle"
              value="Neutral"
              onChange={toggleTheme}	
            />
            <label for="Neutral">Neutral theme</label>
        
          </form>
        </div>

          {/* new col/line */}
        <div className="w-100"></div>
        
          <div className={'row h-50 d-inline-block w-75 p-3 ' + theme}>
            
            <img className='img-fluid w-100 h-100' src={book} alt="PhotoBook" />
        
            <div className='text-on-image'>
            <h1 className="responsive-font-example"> Title </h1>
              <img className='w-15' src={book2} alt="PhotoBook" />
              
              <p> Description </p>
            </div>
        
          </div>

      </div>
    </div>
  );  
}

export default PictureListPage;

