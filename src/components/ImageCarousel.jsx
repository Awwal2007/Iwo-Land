// src/components/ImageCarousel.jsx
import "react-responsive-carousel/lib/styles/carousel.min.css"; // carousel styles
import { Carousel } from "react-responsive-carousel";
import image3 from "../assets/687cb3f3621b80.57544337Processed.jpg";
import image2 from "../assets/images (2).jpg";
import image1 from "../assets/telu and governor.jpeg";

const ImageCarousel = () => {
  return (
    <Carousel className="image-carousel"
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={4000}
      transitionTime={700}
    >
      <div>
        <img src={image1} alt="Slide 1" />
        {/* <p className="legend">Slide One</p> */}
      </div>
      <div>
        <img src={image2} alt="Slide 2" />
        {/* <p className="legend">Slide Two</p> */}
      </div>
      <div>
        <img src={image3} alt="Slide 3" />
        {/* <p className="legend">Slide Three</p> */}
      </div>
    </Carousel>
  );
};

export default ImageCarousel;

