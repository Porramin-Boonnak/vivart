import React, { useState } from 'react';
import { Modal, Button, Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../pagescss/notification.css";

const NotificationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('post');

  const tabContent = {
    post: [
      { icon: "❤️", label: "New Post #1", path: "/post/67aae35268ef2216e0e7b808", time: "10:00 AM", date: "2024-07-26" },
      { icon: "😽", label: "New Post #2", path: "/post/67ac9cacef18b5230eb8afe6", time: "11:30 AM", date: "2024-07-26" },
      { icon: "👽", label: "New Post #3", path: "/post/67ac9f08ea6eb3e5fb682e2a", time: "02:15 PM", date: "2024-07-27" }
    ],
    buy: [
      { icon: "🎉", label: "Buy Offer #1", path: "/buy/1", time: "09:45 AM", date: "2024-07-25" },
      { icon: "🚀", label: "Buy Offer #2", path: "/buy/2", time: "04:20 PM", date: "2024-07-27" }
    ],
    sell: [
      { icon: "💰", label: "Sell Item #1", path: "/sell/1", time: "12:00 PM", date: "2024-07-26" },
      { icon: "✅", label: "Sell Item #2", path: "/sell/2", time: "05:55 PM", date: "2024-07-28" },
      { icon: "✨", label: "Sell Item #3", path: "/sell/3", time: "08:10 AM", date: "2024-07-29" }
    ]
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header className="modal-title-custom  flex-column ">
        <Modal.Title className="modal-title-custom">Notifications</Modal.Title>
        <Button
          variant="close"
          onClick={onClose}
          aria-label="Close"
          className="fixed-button position-absolute top-0 end-0 m-2"
        />
        <Tabs
          defaultActiveKey="post"
          id="notification-tabs"
          className="custom-tab-color"
          fill
          onSelect={(k) => setActiveTab(k)}
        >
          <Tab eventKey="post" title="Post"></Tab>
          <Tab eventKey="buy" title="Buy"></Tab>
          <Tab eventKey="sell" title="Sell"></Tab>
        </Tabs>
      </Modal.Header>

      <Modal.Body className="modal-body-scrollable">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12}>
              <ul className="list-group">
                {tabContent[activeTab]?.length > 0 ? (
                  tabContent[activeTab].map(({ icon, label, path, time, date }, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center cursor-pointer"
                      onClick={() => navigate(path)}
                    >
                      <span>{icon} {label}</span>
                      <small>{time} - {date}</small>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center">No content available</li>
                )}
              </ul>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default NotificationModal;