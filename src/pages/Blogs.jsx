import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomMarquee from "../components/CustomMarquee";
import ImageCarousel from "../components/ImageCarousel";
import SideBar from "../components/SideBar";
import LatestNews from "../components/LatestNews";
import "./css/Blogs.css";
import EventBannerSlider from "../components/EventBannerSlider";
import { useNews } from "../hooks/useNews";
import { Helmet } from "react-helmet-async";

const Blogs = () => {
  const { news, loading, error } = useNews();

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 8;

  // Calculate pagination
  const totalPages = Math.ceil(news.length / newsPerPage);
  const startIndex = (currentPage - 1) * newsPerPage;
  const currentNews = news.slice(startIndex, startIndex + newsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Blogs | Iwo Land</title>
        <meta
          name="description"
          content="Read the latest news, stories, and cultural insights from Iwo Land."
        />
        <meta property="og:title" content="Iwo Land Blogs" />
        <meta
          property="og:description"
          content="Stay updated with news, events, and stories from Iwo Land."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div>
        {/* Top section with marquee + carousel */}
        <div className="marquee-container">
          <div className="latest-news">Latest News</div>
          <div className="marquee-wrapper">
            <CustomMarquee />
          </div>
        </div>

        <div className="hero-section">
          <div className="carousel">
            <EventBannerSlider />
          </div>
          <div className="latest-section">
            <LatestNews />
          </div>
        </div>

        {/* Main Content */}
        <div className="home-content">
          <div className="first-side no-padding">
            {/* Skeleton Loader */}
            {loading && (
              <div className="skeleton-carousel">
                {[...Array(1)].map((_, index) => (
                  <div key={index} className="skeleton-slide">
                    <div className="skeleton-img" />
                    <div className="skeleton-text">
                      <div className="skeleton-line title" />
                      <div className="skeleton-line" />
                      <div className="skeleton-line short" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error / Empty States */}
            {error && <p className="error-text">Failed to load news.</p>}
            {!loading && !error && news.length === 0 && (
              <p className="no-news-text">No news available yet.</p>
            )}

            {/* Render News */}
            {!loading &&
              currentNews.map((item) => {
                const truncatedHead =
                  item.title.length > 40
                    ? item.title.slice(0, 40) + "..."
                    : item.title;
                const truncatedSubHead =
                  item.description.length > 100
                    ? item.description.slice(0, 100) + "..."
                    : item.description;

                return (
                  <Link
                    aria-label={`Read more about ${item.title}`}
                    to={`/singleblog/${item?._id}`}
                    key={item?._id}
                    className="event-card-container"
                  >
                    <article className="event-card">
                      <div className="event-image-container">
                        <img
                          loading="lazy"
                          src={item.mainImage}
                          alt={truncatedHead}
                          className="event-image"
                        />
                      </div>
                      <div className="event-content">
                        <h2 className="event-title">{truncatedHead}</h2>
                        <div className="event-meta">
                          <span className="meta-item">
                            🗓{" "}
                            {new Date(item.date).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="event-description">{truncatedSubHead}</p>
                      </div>
                    </article>
                  </Link>
                );
              })}

            {/* Pagination Controls */}
            {!loading && news.length > 0 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  role="link"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  ⬅ Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="page-btn"
                  onClick={handleNextPage}
                  role="link"
                  disabled={currentPage === totalPages}
                >
                  Next ➡
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="second-side">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
