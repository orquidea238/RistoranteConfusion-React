import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Media, 
  Breadcrumb, 
  BreadcrumbItem, 
  Button, 
  Col, 
  Label, Modal, ModalHeader, ModalBody,
} from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

// -----------------------------------------Assigment 3-----------------------------------------------------
//Validation (task3)
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

// CommentForm class (task1)
class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  console.log('Current state is: ' + JSON.stringify(values));
  alert('Current state is: ' + JSON.stringify(values));
}

  render() {
    return(
      <>
        <Button outline onClick={this.toggleCommentsModal}><span className="fa fa-pencil"></span> Submit Comment
        </Button>
        {/* Modal (task2) */}
        <Modal isOpen={this.state.isModalCommentsOpen} toggle={this.toggleCommentsModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
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
                <Label htmlFor="name">Your Name</Label>
                <Col>
                  <Control.text 
                    model=".name"          
                    id="name" 
                    name="name"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      minLength: minLength(3), maxLength: maxLength(15)
                  }} />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                />
                </Col>
              {/* -------------Message------------------- */}
                <Label htmlFor="message">Comment</Label>
                <Col>
                  <Control.textarea 
                    model=".message" 
                    id="message" 
                    name="message"
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
        {/* Task1 */}
          <CommentForm />
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