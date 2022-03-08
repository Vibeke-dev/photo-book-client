/* eslint-disable jsx-a11y/img-redundant-alt */
import { Container, Row, Col } from "reactstrap";

import book2 from './../images/book2.jpg';

// We are deconstructing the props object directly in the parentheses of the function
function PictureBookCard(props) {
  console.log(props)


  return (
    // <div className="container">
    //   <div class="row text-center mb-5">
    //   <Col xs="4">
    //     <div class="col-md-3">
    //       <img src={props.imageUrl} alt="picture" className="imgBook" />
    //     </div>
    //     <div class="col-md-3">
    //       <p> {props.title}</p>
    //       <p> {props.description} </p>
    //     </div>
    //     </Col>
    //   </div>
    // </div>

    // <div>
    //   <Container>
    //     <Row>
    //       {[0].map(i => (
    //         <Col xs="6">
    //         <div class="col-md-6 how-img">
    //           <img src={props.imageUrl} alt="picture" className="img-fluid" />
    //           </div>
    //           <div class="col-md-6">
    //           <p> {props.title}</p>
    //        <p> {props.description} </p>
    //        </div>
    //         </Col>
    //       ))}
    //     </Row>
    //   </Container>
    // </div>

    // <div class="row mb-5">
    //   <div class="col-md-3 how-img">
    //     <img src={props.imageUrl} class="img-fluid" alt="" />
    //   </div>
    //   <div class="col-md-3">
    //     <h4 class="subheading">{props.title}</h4>
    //     <p class="text-muted">{props.description}</p>
    //   </div>
    // </div>

    <Container>

      <Row>
        <Col><img src={props.imageUrl} className="img-fluid" alt="" /></Col>
        <Col>
          <h4 class="subheading">{props.title}</h4>
          <p class="text-muted">{props.description}</p>
        </Col>
        
        {props.numberInBook === 3 && (<Col><img src={props.imageUrl} className="img-fluid" alt="" /></Col>)}
        {props.numberInBook === 3 && (<Col>
          <h4 class="subheading">{props.title}</h4>
          <p class="text-muted">{props.description}</p>
        </Col>
        )}
      </Row>
    </Container>

  );
}

export default PictureBookCard;

