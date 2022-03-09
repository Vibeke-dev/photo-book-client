import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";

import PictureCard from "../components/PictureCard";
import AddPicture from "../components/AddPicture";
import PictureBookCard from "../components/PictureBookCard";

import { AuthContext } from "../context/auth.context";
import { ThemeContext } from '../context/theme.context';
import Blur from 'react-blur'

//import book from './../images/bookNeutral.jpg';
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
  const [themeBackground, setThemeBackground] = useState();

  console.log("vibek")
console.log(theme)

console.log("vibekeLigefoer")
  console.log(theme.book)
  
  // if (theme==='dark'){
  //   setThemeBackground("test")
  // }
  // console.log(themeBackground)



  const getAllPictures = () => {
    axios
      .get(
        `${API_URL}/api/pictures?userID=${user._id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => setPictures(response.data))

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPictures();
  }, []);

  // Used to keep track on the selected pictures in PictureCard
  const togglePictureSelected = (id) => {
    let picturesCopy = [...pictures];
    let picturesCopySort = [...pictures];
    let count = 0;
    picturesCopySort.sort(function (a, b) {
      return a.numberInBook - b.numberInBook
    })

    picturesCopy.forEach((pictures) => {
      // Find the selected picture and update pictures `isSelected` property,
      if (pictures._id === id) {
        pictures.isSelected = pictures.isSelected ? false : true;

        // Update number of selected pictures and place in the book
        if (pictures.isSelected) {
          //console.log("selected" + pictureSelectedNumber)
          setPictureSelectedNumber(pictureSelectedNumber + 1);

          //pictures.numberInBook = picturePlace;
          //console.log("book to be added:" + pictureSelectedNumber)
          if (pictureSelectedNumber === 1) {
            pictures.numberInBook = 1;
          } else {
            picturesCopySort.forEach((picturesCopyList) => {
              if (picturesCopyList.isSelected === true) {
                count = count + 1;
                console.log(count)
                if (picturesCopyList.numberInBook !== count) {
                  console.log("her1: " + picturesCopyList.numberInBook)
                  console.log("count1: " + count)
                  pictures.numberInBook = count;
                  return
                }
                else if (count === picturesCopySort.length) {
                  console.log("her: " + picturesCopyList.numberInBook)
                  pictures.numberInBook = count;
                  return
                }
              }
            })
          }
        }
        else if (!pictures.isSelected) {
          //not part of the book anymore, reset values
          console.log("deselected" + pictureSelectedNumber)
          setPictureSelectedNumber(pictureSelectedNumber - 1);
          setPicturePlace(pictures.numberInBook);
          pictures.numberInBook = 0;
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

  //defining the pictures that should be shown in the photo book based on isSelected = true
  let picturesCopySort2 = [...pictures];

  picturesCopySort2 = pictures.filter(function (value) {
    return value.isSelected === true;
  });

  picturesCopySort2.sort(function (a, b) {
    return a.numberInBook - b.numberInBook
  });

  const result = picturesCopySort2.map((x, i) => {
    return i % 2 === 0 ? picturesCopySort2.slice(i, i + 2) : null;
  }).filter(x => x != null);

  

  return (
    <div className={'row containerBackground'} style={{ backgroundImage: `url(${backgroundNeutral})` }}>
      <div className="col-5">
        <AddPicture refreshPictures={getAllPictures} />

        {pictures.length > 0 &&
          <div style={{ maxHeight: '90vh', overflow: 'scroll' }}>
            {pictures.map((picture) => <PictureCard key={picture._id} {...picture} toggleTask={togglePictureSelected} />)}
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
            <label className="radio-inline col-xs-6" htmlFor="Summer">Summer theme</label>

            <input
              type="radio"
              name="switchToggle"
              value="Neutral"
              onChange={toggleTheme}
            />
            <label htmlFor="Neutral">Neutral theme</label>
          </form>
        </div>

        {/* new col/line */}
        <div className="w-100"></div>

        {/* <div className={'row h-50 d-inline-block w-75 p-3 ' + theme}> */}
        <div className={'row h-50 d-inline-block w-75 p-3 ' + theme}>
          
        {/* <div className='bg-image .d-flex w-100 h-100' style={{ backgroundImage: `url(${book})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}> */}
        <div className='bg-image .d-flex w-100 h-100' style={{ backgroundImage: `url(${theme.book})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div>
              {/* <div card-body></div> */}
              {/* {pictures.filter(pictureTrue => pictureTrue.numberInBook >= 1).sort((a, b) => a.numberInBook - b.numberInBook).map((picture) => <PictureBookCard key={picture._id} {...picture} />)} */}

            </div>

            {result.map((result, index) => {
              return (
                <h6 className="text-left" key={index}>
                  {result.map(item =>

                    <label className="foto">

                      <img src={item.imageUrl} alt="picture" className="bookSize" />
                      {item.title}
                      {item.description}

                    </label>

                  )}
                </h6>);
            })}
          </div>
          <Link to={`/basket`}>
            <button type="button" className="btn btn-secondary btn-space">Add to basket</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PictureListPage;
