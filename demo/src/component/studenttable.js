import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./studenttable.css"

const RegistrationTable = () => {
  const [registrants, setRegistrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegistrant, setSelectedRegistrant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRegistrants();
  }, []);

  const fetchRegistrants = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getStudent");
      setRegistrants(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (registrant) => {
    setSelectedRegistrant(registrant);
    setShowModal(true);
  };

  const handleEdit = (registrant) => {
    setEditId(registrant._id);
    setEditName(registrant.name);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/deleteStudent/${id}`);
      setRegistrants(registrants.filter((registrant) => registrant._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/updateStudent/${editId}`, { name: editName });
      setRegistrants(registrants.map((registrant) => (registrant._id === editId ? { ...registrant, name: editName } : registrant)));
      setShowModal(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  if (loading) return <p className="text-center mt-3">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-3">Error: {error.message}</p>;

  return (
    <div className="table-container">
      <h2 className="text-center" style={{ marginTop: "-10px" }}>Registered Candidates</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrants.map((registrant, index) => (
            <tr key={registrant._id}>
              <td>{index + 1}</td>
              <td>{registrant.name}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleView(registrant)}>View</Button>{' '}
                <Button variant="warning" size="sm" onClick={() => handleEdit(registrant)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(registrant._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for View/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRegistrant ? "Student Details" : "Edit Name"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRegistrant ? (
            <>
              <p><strong>Name:</strong> {selectedRegistrant.name}</p>
              <p><strong>Email:</strong> {selectedRegistrant.email}</p>
              <p><strong>Mobile:</strong> {selectedRegistrant.mobile}</p>
              <p><strong>Date of Birth:</strong> {selectedRegistrant.dob}</p>
            </>
          ) : (
            <>
              <label>Edit Name:</label>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="form-control" />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedRegistrant ? (
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          ) : (
            <Button variant="success" onClick={handleUpdate}>Update</Button>
          )}
        </Modal.Footer>
      </Modal>
      <Button className="back-to-form-btn" style={{marginLeft:"45%"}} onClick={() => window.location.href = "/"}>
  Back to Form
</Button>
    </div>
    
  );
};

export default RegistrationTable;
