import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/dashboard/VideoCard.css";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ videos }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState({});

  const handleMenuClick = (videoId) => {
    setShowMenu((prevState) => ({
      ...prevState,
      [videoId]: !prevState[videoId],
    }));
  };

  useEffect(() => {
    const handleOutsideClick = (event, videoId) => {
      if (!event.target.closest(`#video-card-${videoId}`)) {
        setShowMenu((prevState) => ({
          ...prevState,
          [videoId]: false,
        }));
      }
    };

    for (const video of videos) {
      if (showMenu[video.id]) {
        document.addEventListener("click", (event) =>
          handleOutsideClick(event, video.id)
        );
      }
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showMenu, videos]);

  return (
    <>
      <div className="video-list-main-container">
        <div className="video-list-scroll-container">
          <div className="video-list">
            {/* <div className="video-list-main-class text-black ">
              {workspaceName}
              <p className="text-black">
                Here you'll see all the videos uploaded in {workspaceName}
              </p>
            </div> */}
            {videos.map((video) => (
              <div
                className="video-card"
                key={video.id}
                id={`video-card-${video.id}`}
              >
                <div
                  className="menu-icon"
                  onClick={() => handleMenuClick(video.id)}
                >
                  <svg
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                    <circle cx="5" cy="12" r="1.5" />
                  </svg>
                </div>
                {showMenu[video.id] && (
                  <>
                    <div className="menu-options">
                      <ul>
                        <li>Copy Link</li>
                        <li>Download</li>
                        {/* <li>Option 3</li> */}
                      </ul>
                    </div>
                  </>
                )}
                <div className="thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                </div>
                <div className="details">
                  <h4 className="">
                    <b>{video.workspaceName}</b>
                  </h4>
                  <h4 className="video-title-mainClass">{video.title}</h4>
                  <p className="video-desc-mainClass ">{video.description}</p>
                </div>
                <div className="actions">
                  <button
                    onClick={() =>
                      navigate(`/video-page/${video.id}`, {
                        state: { data: video },
                      })
                    }
                    className="view-more-button mb-3"
                  >
                    <p className="">Open</p>
                    <svg
                      strokeWidth="4"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
