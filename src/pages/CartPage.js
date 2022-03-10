import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import AddressCard from "../components/AddressCard";

const API_URL = "https://photo-book2.herokuapp.com";

function CartPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedPictures, setSelectedPictures] = useState([]);
  const [price, setPrice] = useState(50)

  const storedToken = localStorage.getItem('authToken');

  const getAllPictures = () => {
    axios
      .get(
        `${API_URL}/api/pictures?userID=${user._id}&isSelected=true`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => setSelectedPictures(response.data))

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPictures();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { selectedPictures, price };

    //create book in the DB
    axios
      .post(
        `${API_URL}/api/book`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => navigate("/pictures"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="backgroundCartColor">
      <h3 className="cartBuy">Press buy and the book will be send to your address</h3>

      <AddressCard />
      <form onSubmit={handleSubmit}>

        <button type="submit" className="btn btn-secondary btn-space">Buy</button>
        <input readOnly
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <span>$</span>
      </form>
    </div>
  );
}

export default CartPage;