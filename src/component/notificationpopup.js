import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../pagescss/notification.css";
import { post_notificate, messageFromEachStage } from './notificate_func';
import axios from 'axios';

const NotificationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('post');
  const hasFetched = useRef(false);
  const hasFetched2 = useRef(false);
  const storedUser = localStorage.getItem("user_login");
  const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [bids, setBids] = useState([]);
  const [database, setDataBase] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchNotifications = async () => {
      const response = await axios.get(`${API_URL}/notificate/${loginUser}`);
      setDataBase((prev) => [...prev, ...response.data]);
      console.log(response.data)
  };

  const [notifications, setNotifications] = useState({
    post: [],
    buy: [],
    sell: [],
  });

  const categoryMap = {
    "1": "post",
    "2": "buy",
    "3": "sell",
  };

  useEffect(() => {
    if (!loginUser) return;
    if (hasFetched2.current) return;
    hasFetched2.current = true;
    fetchNotifications()
    const fetchBids = async () => {
      try {
        console.log("Fetching bids...");
        const response = await axios.get(`${API_URL}/check_bid_end/${loginUser}`);
        setBids(response.data);
        console.log("Fetched bids:", response.data);

        const now = Date.now();
        let newNotifications = [];

        for (const bid of response.data) {
          const endBidTime = new Date(bid.endbid).getTime();
          if (endBidTime < now) {
            console.log(bid.endbid)
            newNotifications.push({
              sender: bid.artist,
              receiver: bid.user,
              stage_noti: "27",
              time: bid.endbid,
            });

            await axios.post(`${API_URL}/wonbid/adtocart`, {
              _id_post: bid._id_post,
              _id_customer: loginUser,
              price: bid.price,
            });
          }
        }

        if (newNotifications.length > 0) {
          setDataBase((prev) => [...prev, ...newNotifications]);
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    
    fetchBids();
    console.log(database)
  }, [loginUser]);

  useEffect(() => {
    if (!database.length) return;
  
    setNotifications((prevNotifications) => {
      const updatedNotifications = { ...prevNotifications };
      
      database.forEach(data => {
        console.log(data.sender)
        const stageCategory = categoryMap[data.stage_noti[0]];
        if (stageCategory) {
          updatedNotifications[stageCategory] = [
            ...updatedNotifications[stageCategory],
            {
              icon: "🔔",
              label: messageFromEachStage(data, data.stage_noti),
              path: `/notification/${data.post_id}`,
              time: data.time,
              // date: data.time.toISOString().split("T")[0],
            }
          ];
        }
      });
      
      return updatedNotifications;
    });
  }, [database]);
  
  // New useEffect to log the updated state
  useEffect(() => {
    console.log("Updated Notifications:", notifications);
  }, [notifications]);
  

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header className="modal-title-custom flex-column">
        <Modal.Title className="modal-title-custom">Notifications</Modal.Title>
        <Button
          variant="close"
          onClick={onClose}
          aria-label="Close"
          className="fixed-button position-absolute top-0 end-0 m-2"
        />
        <Tabs
          defaultActiveKey="post"
          id="notification-custom-tabs"
          className="custom-tab-colors notifications-nav"
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
                {Array.isArray(notifications[activeTab]) && notifications[activeTab].length > 0 ? (
                  notifications[activeTab].map(({ icon, label, path, time, date }, index) => (
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
