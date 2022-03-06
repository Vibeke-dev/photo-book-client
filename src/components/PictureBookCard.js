
import book2 from './../images/book2.jpg';

// We are deconstructing the props object directly in the parentheses of the function
function PictureBookCard({ title, description }) {
  return (
    <div>
      <h1 className="responsive-font-example"> Title </h1>
        <img className='w-15' src={book2} alt="PhotoBook" />
              
        <p> Description </p>
    </div>
  );
}

export default PictureBookCard;

