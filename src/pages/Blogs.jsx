import React from 'react'
import { Link } from 'react-router-dom'
import CustomMarquee from '../components/CustomMarquee'
import ImageCarousel from '../components/ImageCarousel'
import SideBar from '../components/SideBar'
import LatestNews from '../components/LatestNews'
import './css/Blogs.css'
// import image from '../assets/IMG-20250722-WA0088.jpg'
import EventBannerSlider from '../components/EventBannerSlider'
import { useNews } from '../hooks/useNews'



const Blogs = () => {
    const {news} = useNews();
  return (
    <div>
        <div className='marquee-container'>
            <div className='latest-news'>Latest News</div>
            <div>
                <CustomMarquee />
            </div>
        </div>
        <div className="hero-section">
            <div className='carousel'>
                {/* <ImageCarousel /> */}
                <EventBannerSlider/>
            </div>
            <div className='latest-section'>
                <LatestNews />
            </div>
        </div>
        <div className="home-content">
            <div style={{background: "none", padding: "0px"}} className='first-side'>
                {/* Event */}
                {news.map((item, i)=>{
                    const truncatedHead = item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title;
                    const truncatedSubHead = item.description.length > 100 ? item.description.slice(0, 100) + "..." : item.description;
                    // const truncatedDescription = item.description.length > 30 ? item.description.slice(0, 30) + "..." : item.description;
                    return (<Link to={`/singleblog/${item?._id}`} key={i} className='event-card-container' >
                        <div className="event-card">
                            {/* Left: Image */}
                            <div className="event-image-container">
                                <img
                                src={item.mainImage}
                                alt={truncatedHead}
                                className="event-image"
                                />
                                
                            </div>

                            {/* Right: Content */}
                            <div className="event-content">
                                {/* <span className="event-category">Iwo People</span> */}
                                <h2 className="event-title">
                                    {truncatedHead}
                                </h2>
                                <div className="event-meta">
                                <span className="meta-item">🗓 {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                {/* <span className="meta-item">👤 Ayekooto</span> */}
                                </div>
                                <p className="event-description">
                                {truncatedSubHead}
                                </p>
                            </div>
                        </div>
                    </Link>)
                    })}
                </div>
                <div className='second-side'>
                    <SideBar />
                </div>
        </div>
    </div>
  )
}

export default Blogs