import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function PictureCard ( { title, description, _id, imageUrl} ) {
  
  return (
      <div className="card">
        <img src={imageUrl} alt="picture" className="img-thumbnail"/>
        <p>Title: {title}</p>
        <p style={{ maxWidth: "400px" }}>Description: {description} </p>

        <div class="button-box col-lg-12">
          <div class="btn-group mr-2">
            <Link to={`/pictures/edit/${_id}`}>
              <button type="button" class="btn btn-secondary btn-space">Edit input</button>
            </Link>
          </div>

          <div class="btn-group mr-2">
            <button type="button" class="btn btn-secondary">Select picture</button>
          </div>
        </div>  
      </div> 
  );
}

export default PictureCard;