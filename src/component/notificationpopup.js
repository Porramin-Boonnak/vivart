import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../pagescss/notification.css";
import { messageFromEachStage, PathFromEachStage, IconFromEachStage } from './notificate_func';
import axios from 'axios';

const NotificationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('post');
  const storedUser = localStorage.getItem("user_login");
  const [loginUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [database, setDatabase] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const categoryMap = { "1": "post", "2": "buy", "3": "sell" };

  useEffect(() => {
    if (!loginUser) return;

    const fetchData = async () => {
      try {
        const [bidsRes, notiRes] = await Promise.all([
          axios.get(`${API_URL}/check_bid_end/${loginUser}`),
          axios.get(`${API_URL}/notificate/${loginUser}`)
        ]);

        const bidNotifications = bidsRes.data
          .filter(bid => new Date(bid.endbid).getTime() < Date.now())
          .map(bid => ({
            sender: bid.artist,
            receiver: bid.user,
            stage_noti: "27",
            time: bid.endbid
          }));

        setDatabase(prev => {
          const existingIds = new Set(prev.map(item => item.id));
          const newData = [...notiRes.data, ...bidNotifications].filter(item => !existingIds.has(item.id));
          return [...prev, ...newData];
        });

        for (const bid of bidNotifications) {
          await axios.post(`${API_URL}/wonbid/adtocart`, {
            _id_post: bid._id_post,
            _id_customer: loginUser,
            price: bid.price
          });
        }
      } catch (error) {
        console.error("Error fetching notifications/bids:", error);
      }
    };

    fetchData();
  }, [loginUser, API_URL]);

  const notifications = database.reduce((acc, data) => {
    const category = categoryMap[data.stage_noti[0]];
    if (!category) return acc;

    if (!acc[category]) acc[category] = [];
    acc[category].push({
      icon: IconFromEachStage(data, data.stage_noti),
      label: messageFromEachStage(data, data.stage_noti),
      path: PathFromEachStage(data, data.stage_noti),
      time: data.time
    });

    return acc;
  }, { post: [], buy: [], sell: [] });

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header className="modal-title-custom flex-column">
        <Modal.Title className="modal-title-custom">Notifications</Modal.Title>
        <Button variant="close" onClick={onClose} aria-label="Close" className="fixed-button position-absolute top-0 end-0 m-2" />
        <Tabs defaultActiveKey="post" className="custom-tab-colors notifications-nav" fill onSelect={setActiveTab}>
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
                {notifications[activeTab]?.length > 0 ? (
                  notifications[activeTab].map(({ icon, label, path, time }, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center cursor-pointer" onClick={() => navigate(path)}>
                      <span>{icon} {label}</span>
                      <small>{time}</small>
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
