import { Link } from "react-router-dom";
import "./card.scss";
import apiRequest from "../../lib/apiRequest";

function Card({ item }) {

  const handleSendMessage = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    try {
      const response = await apiRequest.post("/chats", {
        receiverId: post.user.id,
      });
  
      const chat = response.data;
  
      console.log("Chat received:", chat); // Debugging
  
      navigate(`/profile?chatId=${chat.id}`);
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };


  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="Chat" onClick={handleSendMessage}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
