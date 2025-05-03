import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "./studentform.css"

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", dob: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/addStudent", formData);
      console.log("Response from server:", response.data);
      setFormData({ name: "", email: "", mobile: "", dob: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label >Mobile Number</Form.Label>
          <Form.Control type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required pattern="[0-9]{10}" placeholder="Enter 10-digit mobile number" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </Form.Group>
        <Button variant="success" type="submit">Submit</Button>
        <Button variant="primary" className="mt-3" onClick={() => navigate("/table")}>
        View Submissions
      </Button>
      </Form>
    </Container>
  );
}

export default RegistrationForm;
