import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Steps from "../../components/steps/Steps";
import { AuthContext } from "../../context/AuthContext";
import "./homePage.scss";
import Features from "../../components/Features/Features";
import Footer from "../../components/footer/Footer";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homePage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Find The Perfect Property and leave detective work for us.</h1>
          <p>
            Experience hassle-free property verification, automated document checking,
            and top-notch fraud prevention.
          </p>
          <SearchBar />
        </div>
        <div className="hero-image">
          <img src="/house.png" alt="Property" />
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* Steps Section */}
      <Steps />

      {/* Footer Section */}
      <Footer />

    </div>
  );
}

export default HomePage;
