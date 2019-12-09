import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Media
} from "reactstrap";


function RenderComments({ comments }) {
    
      const commentsList = comments.map((comment) => {
        return (
          <div key={comment.id}>
            <Media tag="li" className="list-unstyled">
              <Media body>
                <p>{comment.comment}</p>
                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </p>
              </Media>
            </Media>
          </div>
        );
      })

      return (
        <div className="col-12 col-md-5 m-1">
          <h4> Comments </h4>
          {commentsList}
        </div>
      );
    
  }

function RenderDish({dish}) {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card>
            <CardImg
              src={dish.image}
              alt={dish.name}
            />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
}

  
const DishDetail = (props) =>{
    if(props.dish != null) {
    return (
        <div className="container">
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.dish.comments} />
            </div>
        </div>
    )
    } 
    else {
      return <div></div>;
    }
}

export default DishDetail;