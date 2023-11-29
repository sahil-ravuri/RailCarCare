import React, { useState } from 'react';
import './Profile.css';

function ProfilePage() {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('Benjamin');
  const [mobileNumber, setMobileNumber] = useState('00441224948576');
  const [email, setEmail] = useState('BenBut33@gmail.com');
  const [title, setTitle] = useState('Mr.');
  const [surname, setSurname] = useState('Button');
  const [birthDate, setBirthDate] = useState('1996-04-12');

  const handleImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSaveChanges = () => {
    // Implement save logic here
  };

  return (
    <div className="profile-container">
      <nav className="navbar">
        {/* Nav items here */}
      </nav>
      <header className="profile-header">Benjamin Button - Employee Profile</header>
      <div className="profile-content">
        <div className="profile-image-container">
          <label htmlFor="profileImage">Picture</label>
          <img src={profileImage || 'default-profile.jpg'} alt="Profile" className="profile-image"/>
          <input id="profileImage" type="file" onChange={handleImageChange} />
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
    </div>
  );
}

export default ProfilePage;
