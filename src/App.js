import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PictureListPage from "./pages/PictureListPage";
import EditPicturePage from "./pages/EditPicturePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route exact path="/" element={<HomePage />} />
        <Route
          path="/pictures"
          element={ <IsPrivate> <PictureListPage /> </IsPrivate> } 
        />
 
 
        <Route
          path="/pictures/edit/:id"
          element={ <IsPrivate> <EditPicturePage /> </IsPrivate> } 
        />
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />     
      </Routes>
    </div>
  );
}

export default App;
