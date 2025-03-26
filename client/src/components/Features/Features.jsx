import React, { useState } from "react";
import "./features.scss"; // Import SCSS file

const featuresData = [
  {
    title: "Property Verification",
    description: "Verify property details to ensure accuracy and authenticity.",
    image: "/feature1.jpg", // Replace with actual image path
  },
  {
    title: "Automated Document Checking",
    description: "Automate the verification of property documents with AI.",
    image: "/feature2.jpg",
  },
  {
    title: "Fraud Prevention",
    description: "Protect buyers from fraudulent listings and scams.",
    image: "/feature3.jpg",
  },
];

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(featuresData[0]); // Default first feature

  return (
    <div className="features">
      {/* Left Side - Dynamic Image */}
      <div className="features-image">
        <img src={selectedFeature.image} alt="Feature" />
      </div>

      {/* Right Side - Feature List */}
      <div className="features-list">
        <h2>Our Features</h2>
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className={`feature ${selectedFeature.title === feature.title ? "active" : ""}`}
            onClick={() => setSelectedFeature(feature)}
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
