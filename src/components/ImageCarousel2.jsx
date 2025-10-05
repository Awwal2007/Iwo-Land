import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import image1 from "../assets/skdfjdjksldfd.jpg";
import image2 from "../assets/486508928_1095071739299793_1232738090195917418_n.jpg";
import image3 from "../assets/549832359_1235245971949035_2646702673650426791_n.jpg";
import image4 from "../assets/547194733_1233075732166059_7512918984931517503_n.jpg";

const ImageCarousel2 = () => {
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

export default ImageCarousel2;
