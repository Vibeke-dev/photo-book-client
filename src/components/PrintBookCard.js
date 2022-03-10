import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://photo-book2.herokuapp.com";

function PrintBookCard(props) {
  const [userId, setUserId] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");

  const [allPictures, setAllPictures] = useState([]);

  // Get the token from the localStorage
  const storedToken = localStorage.getItem('authToken');
  console.log("props data:")
console.log(props)
  const { bookId, pictureData } = props
  const pictureId = pictureData[0];  

  //get the userId from the DB/Picture model
  useEffect(() => {
    axios
      .get(`${API_URL}/api/pictures/${pictureId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const pictureData = response.data;
        setUserId(pictureData.user);
      })
      .catch((error) => console.log(error));
  }, [pictureId]);

  //get the user data from the DB/User model
  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/${userId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const userData = response.data;
        
        setName(userData.name);
        setAddress(userData.address);
        setCity(userData.city);
        setPostCode(userData.postCode);
        setCountry(userData.country);
      })
      .catch((error) => console.log(error));

  }, [userId]);

  //get the picture data from the DB/picture model
  // useEffect(() => {
    
  //   axios
  //     .get(`${API_URL}/api/pictures/${pictureId}`,
  //       { headers: { Authorization: `Bearer ${storedToken}` } }
  //     )
  //     .then((response) => {
  //       // const userData = response.data;
        
  //       setAllPictures(response.data);
        
  //     })
  //     .catch((error) => console.log(error));

  // }, []);

 
  //console.log("vibekes picture")
  //console.log(allPictures)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Delete book when it has been send to print
    axios
      .delete(
        `${API_URL}/api/book/${bookId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => props.refreshPictures())
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddPicture">
      <h3>BOOK</h3>



      <form onSubmit={handleSubmit}>
        <p>Ship to:</p>

        <label>{name} </label>
        <label>{address} </label>
        <label>{postCode} {city}</label>
        <label>{country} </label>
        
        <button type="submit">Print</button>
      </form>
    </div>
  );
}

export default PrintBookCard;
