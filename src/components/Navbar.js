import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { 
    isLoggedIn,
    user,                   
    logOutUser              
  } = useContext(AuthContext);
console.log(user)
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/pictures">
            <button>Pictures</button>
          </Link>        
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>

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
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
