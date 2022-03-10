import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
//should be used if user part worked properly
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Container, Row, Col } from "reactstrap";


function NavbarFunction() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const {
    isLoggedIn,
    user,
    logOutUser
  } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <button className="to-left">Home: Embrace Your Creativity</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/pictures">
            <button className="to-left">Create Photo Book here</button>
          </Link>
          <button onClick={logOutUser} className="to-right">Logout</button>
          <span className="to-right navText">Be Creative ~ {user && user.name}</span>

          <Link to="/print">
            <button>Admin button - Print</button>
          </Link>
        </>
      )}

      {/* below should be used for the print button which should onlu be for admin */}
      {/* {user.email === "vg3y@hotmail.com" && (
        <>
          <Link to="/print">
            <button>Print</button>
          </Link>        
        </>
      )} */}

      {!isLoggedIn && (
        <>
          <button className="fakeButton">.</button>
          <Link to="/signup"> <button className="to-right">Sign Up</button> </Link>
          <Link to="/login"> <button className="to-right">Login</button> </Link>
        </>
      )}
    </nav>

  );
}

export default NavbarFunction;
