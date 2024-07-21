import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHeart as faHeartSolid, faShare } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';

const ProfileCard = () => {
  const [profileData, setProfileData] = useState({
    avatar_url: '',
    login: 'Loading...',
    html_url: '',
    public_repos: 0,
    following: 0,
    followers: 0,
  });

  const [isHeartActive, setIsHeartActive] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/animeredits')
      .then((response) => response.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.error('Failed to fetch GitHub user data:', error));
  }, []);

  const handleFollowClick = () => {
    window.open(profileData.html_url, '_blank');
    handleFollowerChange(1);
  };

  const handleDownloadClick = () => {
    // Trigger download from backend
    window.location.href = 'http://localhost:3000/download';
  };

  const handleHeartClick = () => {
    fetch('http://localhost:3000/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'An error occurred');
          });
        }
        return response.json();
      })
      .then((data) => {
        setIsHeartActive(!isHeartActive);
        handleFollowerChange(isHeartActive ? -1 : 1);
      })
      .catch((error) => {
        console.error('Failed to like:', error);
        alert('An error occurred: ' + error.message);
      });
  };  

  const handleFollowerChange = (change) => {
    setProfileData((prevData) => ({
      ...prevData,
      followers: prevData.followers + change,
    }));
  };

  return (
    <div className="wrapper profile-card">
      <div className="img-area" id="profile">
        <div className="inner-area">
          <img src={profileData.avatar_url} alt="Profile" crossOrigin="anonymous" />
        </div>
      </div>
      <div className="name" id="userName">{profileData.login}</div>
      <div className="about">Developer & Designer</div>
      <div className="social-icons">
        <a href="https://github.com/animeredits" className="github" target="_blank" rel="noopener noreferrer">
         <i><FontAwesomeIcon icon={faGithub} /></i>
        </a>
        <a href="https://www.facebook.com/profile.php?id=100090634765664&mibextid=9R9pXO" target="_blank" className="fb" rel="noopener noreferrer">
          <i><FontAwesomeIcon icon={faFacebookF} /></i>
        </a>
        <a href="https://www.instagram.com/anime_redits/" target="_blank" className="insta" rel="noopener noreferrer">
          <i> <FontAwesomeIcon icon={faInstagram} /></i>
        </a>
        <a href="https://www.youtube.com/@animeObsesse?sub_confirmation=1" target="_blank" className="yt" rel="noopener noreferrer">
          <i><FontAwesomeIcon icon={faYoutube} /></i>
        </a>
      </div>
      <div className="buttons">
        <button onClick={handleFollowClick}>Follow</button>
        <button onClick={handleDownloadClick}>Download</button>
      </div>
      <div className="social-share">
        <div className="row">
          <FontAwesomeIcon
            icon={isHeartActive ? faHeartSolid : faHeartOutline}
            className="heartIcon"
            onClick={handleHeartClick}
            style={{ color: isHeartActive ? 'red' : 'gray' }}
          />
          <span id="Followers">{profileData.followers}</span>
        </div>
        <div className="row">
          <a href="https://github.com/animeredits?tab=repositories" target="_blank" rel="noopener noreferrer">
            <svg
              aria-hidden="true"
              height="16"
              viewBox="0 0 18 18"
              version="1.1"
              width="16"
              data-view-component="true"
              className="octicon octicon-repo UnderlineNav-octicon"
              style={{ height: '20px', width: '20px', fill: '#ffffff' }}
            >
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>
          </a>
          <span id="repo">{profileData.public_repos}</span>
        </div>
        <div className="row">
          <FontAwesomeIcon icon={faShare} style={{ padding: '5px' }} />
          <span id="following">{profileData.following}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
