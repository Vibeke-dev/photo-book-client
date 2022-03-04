import { useState, useEffect } from "react";
import axios from "axios";

import PictureCard from "../components/PictureCard";
import AddPicture from "../components/AddPicture";

const API_URL = "http://localhost:5005";

function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const getAllProjects = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
    .get(
    `${API_URL}/api/pictures`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
  )
    .then((response) => setProjects(response.data))
    //.then((response) => console.log(response.data))
    .catch((error) => console.log(error));
};

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
    console.log(projects)
  }, [] );

  useEffect(() => {
    const pictureData = projects.filter((user) => {
      return user._id === user;
    })
 
    if (pictureData) {
      setFilteredProjects(pictureData);
    }
    
  }, []);

  
  return (
    <div className="ProjectListPage">
      
      <AddPicture refreshProjects={getAllProjects} />
      
      { projects.map((project) => <PictureCard key={project._id} {...project} />  )} 
       
    </div>
  );
}

export default ProjectListPage;

