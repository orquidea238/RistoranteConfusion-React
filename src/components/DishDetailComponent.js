import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Media, 
  Breadcrumb, 
  BreadcrumbItem
} from "reactstrap";
import { Link } from 'react-router-dom';


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
        <div>
          <h4> Comments </h4>
          {commentsList}
        </div>
      );
    
  }

function RenderDish({dish}) {
      return (
        <div key={dish.id}>
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
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
        </div>
    )
    } 
    else {
      return <div></div>;
    }
}

export default DishDetail;