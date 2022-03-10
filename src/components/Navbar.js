import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
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
            <span className="to-right">Be Creative ~ {user && user.name}</span>

            <Link to="/print">
              <button>Print</button>
            </Link>
          </>
        )}

        {/* {user.email === "vg3y@hotmail.com" && (
        <>
          <Link to="/print">
            <button>Print</button>
          </Link>        
        </>
      )} */}

        {!isLoggedIn && (
          <div className="to-right">
            <Link to="/signup"> <button>Sign Up</button> </Link>
            <Link to="/login"> <button>Login</button> </Link>
          </div>
        )}
      </nav>
    
  );
}

export default NavbarFunction;
