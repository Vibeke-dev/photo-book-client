import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import PictureCard from "../components/PictureCard";
import AddPicture from "../components/AddPicture";
import PictureBookCard from "../components/PictureBookCard";

import { AuthContext } from "../context/auth.context";
import { ThemeContext } from '../context/theme.context';
import Blur from 'react-blur'

import book from './../images/bookNeutral.jpg';
import backgroundNeutral from './../images/backgroundNeutral.jpg';

const API_URL = "http://localhost:5005";

//This function is used to get the pictures by userID from DB
function PictureListPage() {
  const { user } = useContext(AuthContext);
  const [pictures, setPictures] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [pictureSelectedNumber, setPictureSelectedNumber] = useState(1)
  const [picturePlace, setPicturePlace] = useState(1)
  const [picturePage, setPicturePage] = useState(1)
  
  //console.log("initial" + pictureSelectedNumber)

  const getAllPictures = () => {
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

 
    // Used to keep track on the selected pictures in PictureCard
    const togglePictureSelected = (id) => {
      
      const picturesCopy = [...pictures];
  
      picturesCopy.forEach((pictures) => {
        // Find the selected picture and update pictures `isSelected` property,
        if (pictures._id === id) {
          pictures.isSelected = pictures.isSelected ? false : true;
  
          // Update number of selected pictures and place in the book
          if (pictures.isSelected) { 
            setPictureSelectedNumber(pictureSelectedNumber + 1);
            setPicturePlace (picturePlace + 1);
            pictures.numberInBook = picturePlace;

            //4 pictures pr page - is it needed?????????
            if (pictureSelectedNumber === 1){
              pictures.pageInBook = picturePage;
            }
            else if (pictureSelectedNumber % 4 === 0) {
              setPicturePage (picturePage + 1);
              pictures.pageInBook = picturePage;
            }
            else {
              pictures.pageInBook = picturePage;
            }
          }
          else if (!pictures.isSelected) { 
            //not part of the book anymore, reset values
            setPictureSelectedNumber(pictureSelectedNumber - 1);
            setPicturePlace(pictures.numberInBook); 
            pictures.numberInBook = 0;
            pictures.pageInBook = 0;
          }
        }
        
        setPictures(picturesCopy);

        // update DB with selected, page and number in Book
        axios
          .put(`${API_URL}/api/pictures/${id}`, pictures,
          { headers: { Authorization: `Bearer ${storedToken}` } }
          )
          .then((response) => {
            navigate("/pictures");
            })
            .catch((err) => console.log(err));
      });
    }
  
  return (
    <div className={'row containerBackground'} style={{ backgroundImage: `url(${backgroundNeutral})` }}>
      <div className="col-5">
        <AddPicture refreshPictures={getAllPictures} />

        {pictures.length >0 &&        
          <div style={{ maxHeight: '90vh', overflow: 'scroll'}}>
            { pictures.map((picture) => <PictureCard key={picture._id} {...picture} toggleTask={togglePictureSelected} />  )}
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
            {/* <img className='img-fluid w-100 h-100' src={book} alt="PhotoBook" /> */}
            
            <div className='img-fluid w-100 h-100' style={{ backgroundImage: `url(${book})`, backgroundRepeat: 'no-repeat' }}>
            </div>

            <div className='text-on-image'>
              <PictureBookCard />  
            </div>
          </div>
      </div>
    </div>
  );  
}

export default PictureListPage;
// export default SelectedPictureList;
