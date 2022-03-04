import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";


function ProjectDetailsPage (props) {
  const [picture, setPicture] = useState(null);
  const { id } = useParams();
  
  const getPicture = () => {
    const storedToken = localStorage.getItem("authToken");
    
    axios
    .get(
      `${API_URL}/api/pictures/${id}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    .then((response) => {
      const oneProject = response.data;
      
      setPicture(oneProject);
    })
    .catch((error) => console.log(error));
};
  
  useEffect(()=> {
    getPicture();
  }, [] );

  
  return (
    <div className="ProjectDetails">
    
      {picture && (
        <>
          <h1>{picture.title}</h1>
          <p>{picture.description}</p>
          
        </>
      )}

      
      {/* <AddTask refreshProject={getPicture} projectId={id} />           */}

      {/* { picture && picture.tasks.map((task) => <TaskCard key={task._id} {...task} /> )}  */}

      <Link to="/pictures">
        <button>Back to pictures</button>
      </Link>
          
      <Link to={`/pictures/edit/${id}`}>
        <button>Edit Picture</button>
      </Link>
      
    </div>
  );
}

export default ProjectDetailsPage;