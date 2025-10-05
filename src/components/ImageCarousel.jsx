import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import image1 from "../assets/telu and governor.jpeg";
import image2 from "../assets/images (2).jpg";
import image3 from "../assets/skdfjdjksldfd.jpg";
import image4 from "../assets/687cb3f3621b80.57544337Processed.jpg";

const ImageCarousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="image-carousel"
    >
      {[image2, image1, image3, image4].map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            style={{ width: "100%", height: "400px", objectFit: "cover",
              touchAction: "auto", }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
