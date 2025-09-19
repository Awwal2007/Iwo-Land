import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import image3 from "../assets/687cb3f3621b80.57544337Processed.jpg";
import image2 from "../assets/images (2).jpg";
import image1 from "../assets/telu and governor.jpeg";

const ImageCarousel = () => {
  return (
    <Carousel
      className="image-carousel"
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={4000}
      transitionTime={700}
      aria-label="Image carousel of events"
    >
      {[image1, image2, image3].map((img, index) => (
        <div key={index}>
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            style={{ width: "100%", height: "500px", objectFit: "cover" }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
