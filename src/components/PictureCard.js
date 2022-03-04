import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function PictureCard ( { title, description, _id, imageUrl} ) {
  
  return (
    <div className="ProjectCard card">
      {/* <Link to={`/pictures/${_id}`}> */}
      <Link to={`/pictures/edit/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{description} </p>
      <img src={imageUrl} alt="picture" width="200" />
    </div>
  );
}

export default PictureCard;