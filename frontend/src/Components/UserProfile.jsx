import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './UserProfile.css';

const UserProfile = (props) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        import(/* @vite-ignore */ `../assets/${data.image}`).then((image) => {
          setUserImage(image.default);
        }).catch((err) => {
          console.error("Error loading image:", err);
        });
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [id]);

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-picture">
          {userImage && <img src={userImage} alt="Profile Picture" />}
        </div>
        <h2 className="name">{user.name}</h2>
        <p className="designation">{user.designation}</p>
        <p className="accounts">{user.email}</p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-link ${activeTab === "about" ? "active" : ""}`}
            onClick={() => openTab("about")}
          >
            About Me
          </button>
          <button
            className={`tab-link ${activeTab === "education" ? "active" : ""}`}
            onClick={() => openTab("education")}
          >
            Education
          </button>
          <button
            className={`tab-link ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => openTab("skills")}
          >
            Skills
          </button>
          <button
            className={`tab-link ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => openTab("projects")}
          >
            Projects
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "about" && (
            <div className="active">
              <h3>About Me</h3>
              <p>{user.about}</p>
            </div>
          )}
          {activeTab === "education" && (
            <div className="active">
              <h3>Education</h3>
              <p>{user.education}</p>
            </div>
          )}
          {activeTab === "skills" && (
            <div className="active">
              <h3>Skills</h3>
              <p>{user.skills}</p>
            </div>
          )}
          {activeTab === "projects" && (
            <div className="active">
              <h3>Projects</h3>
              <p>{user.projects}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;