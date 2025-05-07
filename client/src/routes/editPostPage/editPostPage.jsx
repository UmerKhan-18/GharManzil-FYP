import { useState, useEffect } from "react";
import "./editPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import apiRequest from "../../lib/apiRequest";

function EditPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
        console.log("Fetched Post Data:", res.data);  // Debugging line
        setPost(res.data);
        setDesc(res.data.postDetail?.desc || "");
        setImages(res.data.images || []);
      } catch (err) {
        console.error("Error fetching post:", err);  // Debugging line
      }
    };
    fetchPost();
  }, [postId]);

  // Check if post is null or undefined before rendering
  if (!post) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting...");
    const formData = new FormData(e.target);
    console.log("Form Data:", formData);  // Debugging line
    const inputs = Object.fromEntries(formData.entries());
    console.log("inputs:", inputs);  // Debugging line
  
    const updatedPostData = {
      ...post,
      title: inputs.title,
      price: parseInt(inputs.price, 10),
      address: inputs.address || post.address,
      city: inputs.city || post.city,
      bedroom: parseInt(inputs.bedroom, 10) || post.bedroom,
      bathroom: parseInt(inputs.bathroom, 10) || post.bathroom,
      type: inputs.type || post.type,
      property: inputs.property || post.property,
      latitude: inputs.latitude || post.latitude,
      longitude: inputs.longitude || post.longitude,
      images,
    };
  
    const updatedPostDetail = {
      desc: desc,
      size: inputs.size ? parseInt(inputs.size, 10) : undefined,  // Handle NaN case
      utilities: inputs.utilities || undefined,
      pet: inputs.pet || undefined,
      income: inputs.income || undefined,
      school: inputs.school ? parseInt(inputs.school, 10) : undefined,
      bus: inputs.bus ? parseInt(inputs.bus, 10) : undefined,
      restaurant: inputs.restaurant ? parseInt(inputs.restaurant, 10) : undefined,
    };
  
    console.log("Updated Post Data:", updatedPostData);  // Debugging line
    console.log("Updated Post Detail:", updatedPostDetail);  // Debugging line
    try {
      console.log('about to hit axios.put')
      await apiRequest.put(`/posts/${postId}`, {
        postData: updatedPostData,
        postDetail: updatedPostDetail,
      }, {
        withCredentials: true,  // Ensures cookies are sent with requests
      });
  
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Update failed");
    }
  };
  
  

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Edit Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label>Title</label>
              <input name="title" defaultValue={post.title} required />
            </div>
            <div className="item">
              <label>Price</label>
              <input name="price" type="number" defaultValue={post.price} required />
            </div>
            <div className="item">
              <label>Address</label>
              <input name="address" defaultValue={post.address} disabled />
            </div>
            <div className="item description">
              <label>Description</label>
              <ReactQuill value={desc} onChange={setDesc} />
            </div>
            <div className="item">
              <label>City</label>
              <input name="city" defaultValue={post.city} disabled />
            </div>
            <div className="item">
              <label>Bedroom Number</label>
              <input name="bedroom" type="number" defaultValue={post.bedroom} disabled />
            </div>
            <div className="item">
              <label>Bathroom Number</label>
              <input name="bathroom" type="number" defaultValue={post.bathroom} disabled />
            </div>
            <div className="item">
              <label>Latitude</label>
              <input name="latitude" defaultValue={post.latitude} />
            </div>
            <div className="item">
              <label>Longitude</label>
              <input name="longitude" defaultValue={post.longitude} />
            </div>
            <div className="item">
              <label>Type</label>
              <select name="type" defaultValue={post.type}>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label>Property</label>
              <select name="property" defaultValue={post.property}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label>Utilities Policy</label>
              <select name="utilities" defaultValue={post.postDetail?.utilities}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label>Pet Policy</label>
              <select name="pet" defaultValue={post.postDetail?.pet}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label>Income Policy</label>
              <input name="income" defaultValue={post.postDetail?.income} />
            </div>
            <div className="item">
              <label>Total Size (sqft)</label>
              <input name="size" type="number" defaultValue={post.postDetail?.size} disabled />
            </div>
            <div className="item">
              <label>School</label>
              <input name="school" type="number" defaultValue={post.postDetail?.school} />
            </div>
            <div className="item">
              <label>Bus</label>
              <input name="bus" type="number" defaultValue={post.postDetail?.bus} />
            </div>
            <div className="item">
              <label>Restaurant</label>
              <input name="restaurant" type="number" defaultValue={post.postDetail?.restaurant} />
            </div>
            <button className="sendButton" type="submit">Update</button>
            {error && <span className="error-msg">{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((img, idx) => (
          <img src={img} key={idx} alt="preview" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default EditPostPage;
