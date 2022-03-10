import frontPage from './../images/frontPage.JPG';
import frontPage2 from './../images/frontPage2.JPG';
import frontPage3 from './../images/frontPage3.JPG';
import frontPage4 from './../images/frontPage4.JPG';
import frontPage5 from './../images/frontPage5.JPG';
import frontPage6 from './../images/frontPage6.JPG';

import backgroundNeutral from './../images/bookNature.png';
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="backgroundFrontColor">
     <div className="backgroundFront" style={{ backgroundImage: `url(${backgroundNeutral})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
    {/* <div> */}
      <Container>
        <Row>
        <Col><img src={frontPage3} alt="picture" className="pictureNoRotate" /></Col>
          <Col><h1 className="fontPageText">Create your own photo book easily</h1></Col>
          <Col></Col>
          <Col><h1 className="fontPageText">Just sign up and get started</h1></Col>
          <Col><img src={frontPage2} alt="picture" className="pictureRotate" /></Col>
        </Row>
        
        
        <Row>
          <Col><img src={frontPage4} alt="picture" className="pictureRotate2" /></Col>
          <Col></Col>
          <Col><img src={frontPage6} alt="picture" className="pictureRotate2" /></Col>
        </Row>
        <Row>
        <Col><img src={frontPage} alt="picture" className="pictureRotate" /></Col>
          
          <Col></Col>
          <Col><img src={frontPage5} alt="picture" className="pictureRotate" /></Col>

        </Row>
      </Container>
    </div>
    </div>
  );
}

export default HomePage;