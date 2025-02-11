import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../pagescss/ChatModal.css";

const ChatModal = ({ isOpen, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      {/* Header - New Chat Centered */}
      <Modal.Header closeButton className="modal-header-custom justify-content-center">
        <Modal.Title className="modal-title-custom fs-4 text-center w-100">
          New Chat
        </Modal.Title>
      </Modal.Header>

      {/* To Section with Pink Background */}
      <div className="to-section">
        <Form.Label>To:</Form.Label>
        <span className="ms-2">Searching..</span>
      </div>

      {/* Body */}
      <Modal.Body className="modal-custom">
        <Form>
          <Form.Group className="mt-3">
            <Form.Control as="textarea" rows={3} placeholder="Type something..." />
          </Form.Group>
        </Form>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer className="modal-custom justify-content-center">
        <Button variant="success" onClick={onClose}>
          Chat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
