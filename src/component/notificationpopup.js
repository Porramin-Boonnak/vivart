import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../pagescss/notification.css";

const NotificationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('post');
  const hasFetched = useRef(false); // Prevent duplicate execution
  const storedUser = localStorage.getItem("user_login");
  const [loginUser, setLoginUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  
  const [notifications, setNotifications] = useState({
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
  });

  const databaseData = [
    {
      post_id: "123123",
      sender: "NongSoii",
      receiver: "Nonthakan",
      stage_noti: "25",
      post_msg: "Your bid post time out in 1 hour",
      descript: "Your bid post time out in 1 hour"
    },
  ];

  const categoryMap = {
    "1": "post",
    "2": "buy",
    "3": "sell"
  };

  const messageFromEachStage = (data , stage_noti) =>{
    if(stage_noti == "11"){
      return data.sender + "Like Your Post" + data.post_msg
    }
    if(stage_noti == "12"){
      return data.sender+"comment on your post"+data.post_msg+"\n\""+data.descript
    }
    if(stage_noti == "21"){
      return data.descript + "Your payment for order " + data.post_msg + "is complete."
    }
    if(stage_noti == "22"){
      return data.descript + "Your artist is packing your order " + data.post_msg + "."
    }
    if(stage_noti == "23"){
      return data.descript + "Your order " + data.post_msg + "is shipping."
    }
    if(stage_noti == "24"){
      return data.descript + "Your shipment for order " + data.post_msg + "has arrived." + "\n\"" + "at" + data.time
    }
    if(stage_noti == "25"){
      return data.descript + "Please pay your order" + data.post_msg + "within 24 hours or it will be canceled."
    }
    if(stage_noti == "26"){
      return data.descript + "Your order" + data.post_msg + "has been canceled." + "\n\"" + "due to your late payment."
    }
    if(stage_noti == "27"){
      return data.descript + "Congratulation! you won the bid." + "\n\"" + "Please check your cart to continue payment."
    }
    if(stage_noti == "31"){
      return data.descript + "Your product has been sold."
    }
    if(stage_noti == "32"){
      return data.sender + "bid your post to" + data.descript + "Baht." //descript = ราคา
    }
    if(stage_noti == "33"){
      return data.descript + "Your bid post timeout in 1 hour."
    }
    if(stage_noti == "34"){
      return data.descript + "Your bid post is timeout." + "\n\"" + "Please select the person to sell."
    }
    if(stage_noti == "35"){
      return data.descript + "The buyer has succesfully paid."
    }
  }


  useEffect(() => {
    if (hasFetched.current) return; // Prevent re-execution
    hasFetched.current = true;

    setNotifications((prevNotifications) => {
      const updatedNotifications = { ...prevNotifications };

      databaseData.forEach(data => {
        const stageCategory = categoryMap[data.stage_noti[0]]; // Get category from first digit
        if (stageCategory) {
          updatedNotifications[stageCategory] = [
            ...updatedNotifications[stageCategory],
            {
              icon: "🔔",
              // label: data.post_msg,
              label:messageFromEachStage(data , data.stage_noti),
              path: `/notification/${data.post_id}`,
              time: new Date().toLocaleTimeString(),
              date: new Date().toISOString().split("T")[0]
            }
          ];
        }
      });

      return updatedNotifications;
    });
  }, []); // Run only once on mount

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
                {notifications[activeTab]?.length > 0 ? (
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
