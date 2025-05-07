import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import apiRequest from "../../lib/apiRequest";
import { Trash2, Edit} from "lucide-react"


function Card({ item }) {

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

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

  const redirectToEditPage = (id) => {
    navigate(`/editPostPage/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8800/api/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include', // for cookie auth
      });
  
      const data = await response.json();
  
      if (response.ok) {

        navigate('/profile'); // Redirect to profile page after deletion
        // optionally refetch posts or remove from state
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Server error');
    }
  };
  
  


  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        {/* Badge to show Rent or Buy */}
        <div className={`badge ${item.type}`}>
          {item.type === "rent" ? "For Rent" : "For Sale"}
        </div>
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">{item.price} PKR</p>
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
            {/* Show only if logged in user is the owner */}
            {currentUser && currentUser.id === item.userId && (
              <>
            <div>
              <button className="edit-btn" onClick={() => redirectToEditPage(item.id)}><Edit size={18} /></button>
            </div>
            <div>
              <button className="delete-btn" onClick={() => handleDelete(item.id)}><Trash2 size={18} /></button>
            </div>
            </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Card;
