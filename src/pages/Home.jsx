import React from 'react';
import './css/Home.css'
import { Link } from 'react-router-dom'
import CustomMarquee from '../components/CustomMarquee'
import ImageCarousel from '../components/ImageCarousel'
import LatestNews from '../components/LatestNews'
import SideBar from '../components/SideBar'
import { SlPeople } from 'react-icons/sl'
import MissedArticles from '../components/MissedArticles'
import { Button } from '@mui/joy'
import ButtonBar from '../components/BottomBar'
import Map from '../components/Map';
import ImageCarousel2 from '../components/ImageCarousel2';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Iwo Land",
    "url": "https://iwoland.com",
    "logo": "https://iwoland.com/favicon.png",
    "sameAs": [
      "https://facebook.com/iwoland",
      "https://instagram.com/iwoland",
      "https://twitter.com/iwoland"
    ],
    // "contactPoint": {
    //   "@type": "ContactPoint",
    //   "telephone": "+2348000000000",
    //   "contactType": "Customer Service"
    // }
  };
  return (
    <>
      <Helmet>
        <title>Iwo Land - Officila Website</title>
        <meta name="google-site-verification" content="Z8KOXq8ILNK0QJxU6ib1jyh24h7Of2VEKZlagRE35JA" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://iwoland.com" />
        <meta name="keywords" content="Iwo Land, Iwo news, Iwo Land news, Oluwo, Iwo, iwoland, Iwo Osun State, Osun State, History of Iwo, Odidere, Raven, Yoruba Land, Osun Oshogo, Oshogo, Telu 1" />
        <meta
          name="description"
          content="Discover Iwo Land — a rich Yoruba cultural land in Osun State, Nigeria. Learn about its people, heritage, and historical significance."
        />
        <meta property="og:title" content="Iwo Land - Yoruba Heritage and Culture" />
        <meta
          property="og:description"
          content="Explore the people, culture, and beauty of Iwo Land. A proud Yoruba kingdom with deep historical roots."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://iwoland.com" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="KhQmoAaCNzLIakdahzlZyw" async></script>
      </Helmet>

      <div className="home-wrapper">
        <div className='marquee-container'>
          <div className='latest-news'>Latest News</div>
          <div className="marquee-wrapper">
            <CustomMarquee />
          </div>
        </div>
        
        <div className="hero-section">
          <div className='carousel'>
            <ImageCarousel />
          </div>
          <div className='latest-section'>
            <LatestNews />
          </div>
        </div>
        
        <div className='home-container'>
          <h2 className="home-title">Home</h2>
        </div>
        
        <div className="home-content">
          <div className='first-side'>
            <p>Iwo is a prominent Yoruba town in Osun State, southwestern Nigeria. Rich in cultural, spiritual, and historical heritage, Iwo has long been an important center of Yoruba civilization, It is founded by Adekola Telu, the son of Luwo Gbagida, a female Ooni of Ife — one of the few female traditional rulers in Yoruba history.</p>
            
            <h4>Discover the Iwo People</h4>
            <p>Iwo People are predominantly Yoruba-speaking, culturally rich, religiously diverse, and proud of their deep-rooted heritage. They are widely respected for their resilience, hospitality, and contributions to religion, education, and culture in Nigeria.</p>
            
            <h4>Explore Our Land</h4>
            <p>Iwo is the ancestral home of the Oluwo of Iwo, one of the most revered monarchs in Yorubaland. The royal palace, a striking symbol of authority and tradition, welcomes visitors eager to witness age-old customs, ceremonies, and the enduring pride of Yoruba royalty. Iwo is famous for its deep-rooted Islamic heritage, vibrant Christian institutions, and enduring traditional beliefs. The skyline is dotted with majestic mosques and historic churches, including Bowen University, one of Nigeria's leading faith-based academic institutions. Pilgrims, scholars, and tourists alike are drawn to Iwo's serene atmosphere, sacred sites, and rich spiritual history.</p>
            
            <section className="values-container" aria-label="Core values of Iwo Land">
                {[
                  { title: "ONE PEOPLE", desc: "We are one people united by love for our land." },
                  { title: "ONE LOVE", desc: "Bound by shared culture and unity across faiths." },
                  { title: "ONE PRIDE", desc: "Proud of our history, culture, and resilience." },
                ].map((val, index) => (
                  <div className="people-container" key={index}>
                    <SlPeople className="people-icon" color="#ab833b" size={50} />
                    <h3>{val.title}</h3>
                    <p style={{textAlign: "center"}}>{val.desc}</p>
                  </div>
                ))}
            </section>

            
            <div className="secondary-carousel-section">
              <h2 className="secondary-carousel-title">The Iwo People</h2>
              <div className='image-carousel-container'>
                <ImageCarousel2 />
              </div>
            </div>

            <div className='map'>
                <h2 className="secondary-carousel-title">Map</h2>
              <Map />
            </div>
          </div>
          
          <div className='second-side'>
            <SideBar />
          </div>
        </div>
      </div>
      <div>
        <MissedArticles />
      </div>
    </>
    
  )
}

export default Home