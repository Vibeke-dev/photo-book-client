import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function AddressCard() {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <br></br>
            <p>Name: {user.name}</p>
            <p>Address: {user.address}</p>
            <p>City: {`${user.postCode} ${user.city}`}</p>
            <p>Country: {user.country}</p>
        </div>
    );
}

export default AddressCard;
