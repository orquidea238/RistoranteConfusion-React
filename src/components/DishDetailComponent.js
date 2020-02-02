import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb, 
  BreadcrumbItem, 
  Button, 
  Col, 
  Label, Modal, ModalHeader, ModalBody,
} from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";


//Validation (task3)
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

// render Dish------------------------------
function RenderDish({dish}) {
  if(dish != null) {
      return (
        <div key={dish.id} className="col-12 col-md-5 m1">
          <Card>
            <CardImg
              src={baseUrl + dish.image}
              alt={dish.name}
            />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
} else {
  return <div></div>;
}
}

// Render Comments function----------------
function RenderComments({ comments, addComment, dishId }) {
  if(comments != null) 
    return (
      <div className="col-12 col-md-5 m1" >
        <h4>Comments</h4>
            <ul className="list-unstyled" >
              {comments.map((comment, key) => {
                return (
                  <li key={key}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </p>
                  </li> 
                  );
                })}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
          </div>
      );
    
 else {
  return (
    <div></div>
  )
}
}

// -----------------------------------------Assigment 3-----------------------------------------------------

// CommentForm class (task1)
class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalCommentsOpen: false
    }

    this.toggleCommentsModal = this.toggleCommentsModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


toggleCommentsModal() {
    this.setState({
      isModalCommentsOpen: !this.state.isModalCommentsOpen
    });
}

handleSubmit(values) {
  this.toggleCommentsModal();
  // console.log('Current state is: ' + JSON.stringify(values));
  // alert('Current state is: ' + JSON.stringify(values));
  this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
}

  render() {
    return(
      <>
        <Button outline onClick={this.toggleCommentsModal}><span className="fa fa-pencil"></span> Submit Comment
        </Button>
        {/* Modal (task2) */}
        <Modal isOpen={this.state.isModalCommentsOpen} toggle={this.toggleCommentsModal}>
          <ModalHeader toggle={this.toggleCommentsModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            {/* ----------Rating------------------- */}
                <Label htmlFor="rating">Rating</Label>
                <Col>
                  <Control.select 
                    model=".rating" 
                    id="rating"
                    name="rating"
                    className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                  </Control.select>
                </Col>
          {/* --------------Name ---------------------*/}
                <Label htmlFor="author">Your Name</Label>
                <Col>
                  <Control.text 
                    model=".author"          
                    id="author" 
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      minLength: minLength(3), maxLength: maxLength(15)
                  }} />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                />
                </Col>
              {/* -------------Message------------------- */}
                <Label htmlFor="comment">Comment</Label>
                <Col>
                  <Control.textarea 
                    model=".comment" 
                    id="comment" 
                    name="comment"
                    rows="6"
                    className="form-control" />
                </Col>
              {/* --------------Button-------------------- */}
                <Col className="mt-2">
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>

            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

// ----------------------------------------------------------------------------------------
 
const DishDetail = (props) =>{
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">            
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
else if (props.dish != null) {
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
              <RenderDish dish={props.dish} />
              <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id} />
            </div>
        </div>
    )
    } 
    else {
      return <div></div>;
    }
}

export default DishDetail;