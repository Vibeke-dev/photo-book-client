import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import PictureCard from "../components/PictureCard";
import AddPicture from "../components/AddPicture";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from '../context/theme.context';

const API_URL = "https://photo-book2.herokuapp.com";

function PictureListPage() {
  const { user } = useContext(AuthContext);
  const [pictures, setPictures] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [pictureSelectedNumber, setPictureSelectedNumber] = useState(1)
  const [picturePlace, setPicturePlace] = useState(1)

  //Get the pictures by userID from DB
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
  }, [user]);

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
          setPictureSelectedNumber(pictureSelectedNumber + 1);

          if (pictureSelectedNumber === 1) {
            pictures.numberInBook = 1;
          } else {
            picturesCopySort.forEach((picturesCopyList) => {
              if (picturesCopyList.isSelected === true) {
                count = count + 1;
                if (picturesCopyList.numberInBook !== count) {
                  pictures.numberInBook = count;
                  return
                }
                else if (count === picturesCopySort.length) {
                  pictures.numberInBook = count;
                  return
                }
              }
            })
          }
        }
        else if (!pictures.isSelected) {
          //not part of the book anymore, reset values
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
    <div className={'row containerBackground'}>
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
          <h3>Choose theme of your Photo Book - add 4 pictures</h3>
          <form className="form-inline">
            <input
              id="flexRadioDefault1"
              type="radio"
              name="switchToggle"
              value="Summer"
              onChange={toggleTheme}
              checked={theme === '/static/media/bookSummer2.806b8156.png'}
            />
            <label className="radio-inline col-xs-6" htmlFor="Summer">Summer theme</label>

            <input
              type="radio"
              name="switchToggle"
              value="Neutral"
              onChange={toggleTheme}
              checked={theme === '/static/media/bookNature.8063108d.png'}
            />
            <label htmlFor="Neutral">Nature theme</label>
          </form>
        </div>

        {/* new col/line */}
        <div className="w-100"></div>

        <div className={'row h-50 d-inline-block w-75 p-3'}>
          <div className='bg-image .d-flex w-100 h-100 photoBookImage' style={{ backgroundImage: `url(${theme})` }}>
            {result.map((result, index) => {
              return (
                <h6 className="text-left" key={index}>
                  {result.map(item =>
                    <label className="foto" key={item._id}>
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
