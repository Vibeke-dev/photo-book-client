import { useState, useEffect } from "react";
import axios from "axios";
import PrintBookCard from "../components/PrintBookCard";

const API_URL = "https://photo-book2.herokuapp.com";

function PrintPage() {
  const [printList, setPrintList] = useState([]);

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
  }, []);

  return (
    <div className="backgroundPrintColor">
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