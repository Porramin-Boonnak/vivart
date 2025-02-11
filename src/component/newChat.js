import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ChatModal = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">New Chat</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label className="fw-bold">To:</Form.Label>
            <span className="badge bg-danger text-light ms-2">Searching..</span>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Control as="textarea" rows={3} placeholder="Type something..." />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={onClose}>
          Chat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
