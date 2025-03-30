



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatehUsers } from '../../features/reducer/usersSlice';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
const navigate=useNavigate()
    const dispatch = useDispatch();
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
  const [licenseExpiryDate, setLicenseExpiryDate] = useState('');
  const [type, setType] = useState('');
  const [user,setUser]=useState({})
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      ;
    }
  }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            name:name=== "" ? null :name,
            email:email=== "" ? null : email,
            phone:phone=== "" ? null : phone,
            password:password=== "" ? null :password,
            driverLicenseNumber: driverLicenseNumber=== "" ? null : driverLicenseNumber,
            licenseExpiryDate: licenseExpiryDate=== "" ? null : licenseExpiryDate,
            type:type=== "" ? null : type,
          };  
          
          
         

         
       
   await dispatch(updatehUsers({UserId:user.userId,newUser:userData}));
 navigate("/")


  }

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="driverLicenseNumber">Driver License Number:</label>
          <input
            type="text"
            id="driverLicenseNumber"
            value={driverLicenseNumber}
            onChange={(e) => setDriverLicenseNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="licenseExpiryDate">License Expiry Date:</label>
          <input
            type="date"
            id="licenseExpiryDate"
            value={licenseExpiryDate}
            onChange={(e) => setLicenseExpiryDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">License Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(Number(e.target.value))}
          >
            <option value="">Select License Type</option>
            <option value={0}>Car</option>
            <option value={1}>Bus</option>
            <option value={2}>Motorcycle</option>
            <option value={3}>Other</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;