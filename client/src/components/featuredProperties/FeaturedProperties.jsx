import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featuredProperties.scss";

export const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/api/posts")
      .then((response) => response.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <section className="featured-properties">
      <div className="container">
        {/* Heading */}
        <h2>Featured Properties</h2>

        {/* Properties Grid */}
        <div className="properties-grid">
          {properties.slice(0, 6).map((property) => (
            <div key={property.id} className="property-card">
              {/* Property Image */}
              <div className="image-container">
                <img
                  src={property.images?.length > 0 ? property.images[0] : "/placeholder.jpg"}
                  alt={property.title}
                />
              </div>

              {/* Property Details */}
              <div className="property-details">
                <h3>{property.city}, {property.address}</h3>
                <p>Size: {property.size} sqft</p>
                <p>Rooms: {property.bedroom} Rooms</p>
                <p className="price">PKR {property.price.toLocaleString()}</p>
                <Link to={`/${property.id}`} className="view-details">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;