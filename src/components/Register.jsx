import React from "react";
import {Form, Button} from 'react-bootstrap'

function Register() {
  return (
    <Form>
    <Form.Group className="mb-3" controlId="formBasicLanguage">
      <Form.Label>Language</Form.Label>
      <Form.Control type="language" placeholder="Enter language" />
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formBasicInterests">
      <Form.Label>Interests</Form.Label>
      <Form.Control type="interest" placeholder="Enter interests" />
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formBasicGoals">
      <Form.Label>Tranining Goals</Form.Label>
      <Form.Control type="traininggoal" placeholder="Enter training goals" />
    </Form.Group>
  
  
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  ); 
}

export default Register; 
