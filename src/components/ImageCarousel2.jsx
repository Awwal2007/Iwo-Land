// src/components/ImageCarousel.jsx
import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel styles
import { Carousel } from "react-responsive-carousel";
import image1 from "../assets/687cb3f3621b80.57544337Processed.jpg";
import image2 from "../assets/images (2).jpeg";
import image3 from "../assets/images (3).jpeg";

const ImageCarousel2 = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={4000}
      transitionTime={700}
    >
      <div>
        <img loading="lazy" src={image1} alt="Slide 1" />
        <p className="legend">Slide One</p>
      </div>
      <div>
        <img loading="lazy" src={image2} alt="Slide 2" />
        <p className="legend">Slide Two</p>
      </div>
      <div>
        <img loading="lazy" src={image3} alt="Slide 3" />
        <p className="legend">Slide Three</p>
      </div>
    </Carousel>
  );
};

export default ImageCarousel2;

