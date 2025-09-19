import React from 'react';
import Slider from 'react-slick';
import './css/EventBannerSlider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import image from '../assets/IMG-20250722-WA0089.jpg'

import { useNews } from '../hooks/useNews';

// const sliderData = [
//   {
//     image: image,
//     tags: ['Iwo People', 'Oluwo of Iwo'],
//     title: "Iwo ongoing road Dualization...",
//     date: '20 June 2025',
//     author: 'Ayekooto',
//   },
//   {
//     image: '/images/ghigho-14.jpg',
//     tags: ['Itsekiri People'],
//     title: "14th Ghigho Aghofen: A Kaleidoscope of Culture at the Aghofen",
//     date: '21 June 2025',
//     author: 'Akorede',
//   },
// ];

const EventBannerSlider = () => {
  const {news} = useNews();

  const settings = {
    dots: true,
    infinite: news.length > 1,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings} className="event-slider">
      {news.map((slide, index) => (
        <div className="event-banner" key={index}>
          <img loading='lazy' src={slide.mainImage} alt={slide.title} className="banner-image" />
          <div className="banner-overlay">
            {/* <div className="tag-row">
              {slide.tags.map((tag, i) => (
                <span className="tag" key={i}>{tag}</span>
              ))}
            </div> */}
            <h1 className="banner-title">{slide.title}</h1>
            <div className="banner-meta">
              <span>🗓 {new Date(slide.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              {/* <span>👤 {slide.author}</span> */}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default EventBannerSlider;
