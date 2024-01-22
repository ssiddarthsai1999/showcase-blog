import React from 'react'
import ProfileC from '../../Components/Profile/ProfileC';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
function Profile() {
const {user}=useSelector((state)=>state.user)
const email = user?.email
    const userInfo = {
        profilePic:
            "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
            name:"Sid",
            Country:"India",
            Number:"7123213123",
            email:"sid@gmail.com"

    };
  return (
      <div className="max-w-7xl mx-auto justify-center 0 align-middle items-center ">
          <h1 className="text-center py-[100px]">Profile</h1>
          <ProfileC userInfo={userInfo} email={email} />
      </div>
  );
}

export default Profile