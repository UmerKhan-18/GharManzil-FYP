import React from "react";
import "./About.scss"; // Use SCSS for styling
import Footer from "../../components/footer/Footer";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="title">About Us</h1>
      <div className="about-text">
        <p>
          We are a group of final-year Software Engineering students from FAST,
          working on our Final Year Project <strong>"Ghar Manzil"</strong>.
          Our mission is to revolutionize the real estate experience by seamlessly integrating
          blockchain technology, intuitive user interfaces, and robust backend systems.
          This platform aims to streamline property transactions, ensure data integrity,
          and empower both buyers and sellers. We believe in transparency, security, and innovation
          as the cornerstones of modern real estate solutions.
        </p>
      </div>

      <div className="team-container">
        <div className="team-member">
          <img src="/profile-placeholder.png" alt="Samad Amir" className="profile-pic" />
          <h2>Samad Amir</h2>
          <p className="role">Frontend Developer</p>
          <p className="description">
            Samad specializes in crafting visually appealing and responsive user interfaces,
            ensuring that every interaction on Ghar Manzil is seamless and intuitive.
          </p>
        </div>

        <div className="team-member">
          <img src="/profile-placeholder.png" alt="Umer Khan" className="profile-pic" />
          <h2>Umer Khan</h2>
          <p className="role">Backend Developer</p>
          <p className="description">
            Umer focuses on building robust APIs,
            ensuring secure and efficient data handling, and maintaining the server-side
            logic that powers Ghar Manzil.
          </p>
        </div>

        <div className="team-member">
          <img src="/profile-placeholder.png" alt="Sandesh Goindani" className="profile-pic" />
          <h2>Sandesh Goindani</h2>
          <p className="role">Blockchain Developer</p>
          <p className="description">
            Sandesh integrates cutting-edge blockchain solutions to ensure transparency,
            immutability, and trust in every property transaction on Ghar Manzil.
          </p>
        </div>

        <div className="team-member">
          <img src="/profile-placeholder.png" alt="Dr. Shahbaz Siddiqui" className="profile-pic" />
          <h2>Dr. Shahbaz Siddiqui</h2>
          <p className="role">Supervisor</p>
          <p className="description">
            With extensive industry and academic experience, Dr. Shahbaz guides our team,
            providing insights and ensuring the project remains aligned with best practices
            and innovative strategies.
          </p>
        </div>
      </div>

      <div className="back-home">
        <a href="/">Back to Home</a>
      </div>
      <Footer />
    </div>
  );
};

export default About;