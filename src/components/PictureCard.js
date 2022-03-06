import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function PictureCard ( props ) {
  // console.log("PictureCard")
  // console.log(props)
  // { title, description, _id, imageUrl}
  
  return (
      <div className="card">
        <img src={props.imageUrl} alt="picture" className="img-thumbnail"/>
        <p>Title: {props.title}</p>
        <p style={{ maxWidth: "400px" }}>Description: {props.description} </p>

        <div className="button-box col-lg-12">
          <div className="btn-group mr-2">
            <Link to={`/pictures/edit/${props._id}`}>
              <button type="button" className="btn btn-secondary btn-space">Edit input</button>
            </Link>
          </div>

          <div className="btn-group mr-2">
            <button type="button" className="btn btn-secondary" onClick={() => props.toggleTask(props._id)}>
            {props.isSelected 
            ? <span>Remove Picture</span> 
            : <span>Select Picture</span>
          }
            </button>
          </div>
        </div>  
      </div> 
  );
}

export default PictureCard;