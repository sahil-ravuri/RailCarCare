import React, { useState } from 'react';
import './Profile.css';
import NavBar from './NavBar';
import AboutUs from './AboutUs';

function ProfilePage() {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('Benjamin');
  const [mobileNumber, setMobileNumber] = useState('00441224948576');
  const [email, setEmail] = useState('BenBut33@gmail.com');
  const [title, setTitle] = useState('Mr.');
  const [surname, setSurname] = useState('Button');
  const [birthDate, setBirthDate] = useState('1996-04-12');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSaveChanges = () => {
    // Implement save logic here
  };

  return (
    <div className="profile-container">
      <NavBar onLogout={handleLogout} />
       <div className="profile-content">
        <div className="card profile-image-card">
          <div className="card-header">Profile Picture</div>
          <div className="card-body text-center">
            <img src={profileImage || 'default-profile.jpg'} alt="Profile" className="profile-image"/>
            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
            <input id="profileImage" type="file" onChange={handleImageChange} hidden />
            <button className="btn btn-primary" onClick={() => document.getElementById('profileImage').click()}>
              Upload new image
            </button>
          </div>
        </div>
        <div className="profile-fields">
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <select id="title" value={title} onChange={(e) => setTitle(e.target.value)}>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              {/* Other options */}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="forename">Forename</label>
            <input id="forename" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="surname">Surname</label>
            <input id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="birthDate">Birth Date</label>
            <input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
        </div>
      </div>
      <AboutUs>
        
      </AboutUs>
    </div>

  );
}

export default ProfilePage;
