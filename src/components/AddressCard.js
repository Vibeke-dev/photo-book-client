import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

// We are deconstructing the props object directly in the parentheses of the function
function AddressCard() {
    const { user } = useContext(AuthContext);
    return (
        <div>
        <h1 className="responsive-font-example"> Send book to address: </h1>
            <p>Name: {user.name}</p>
            <p>Address: {user.address}</p>
            <p>City: {`${user.postCode} ${user.city}`}</p>
            <p>Country: {user.country}</p>
        </div>
    );
}

export default AddressCard;
