import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import PictureBookCard from "../components/PictureBookCard";
import AddressCard from "../components/AddressCard";
import PrintBookCard from "../components/PrintBookCard";

const API_URL = "https://photo-book2.herokuapp.com";

function PrintPage() {
  const { user } = useContext(AuthContext);
  const [printList, setPrintList] = useState([]);
  const [toBePrinted, setToBePrinted] = useState([]);
  const [idOption, setIdOption] = useState();

  // Get the token from the localStorage
  const storedToken = localStorage.getItem('authToken');

  const getAllBooks = () => {
    axios
      .get(
        `${API_URL}/api/book`,
        { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => { setPrintList(response.data) })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllBooks();
    //console.log(printList)
  }, []);

  return (
    <div>
      <h3>Needs to be printed</h3>

      {printList.map(item => {
        return (
          <PrintBookCard key={item._id} refreshPictures={getAllBooks} bookId={item._id} pictureData={item.picture} />

        );
      })}

    </div>
  );
}

export default PrintPage;