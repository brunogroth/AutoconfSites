import React from 'react'

type User = {
  id: number;
  name?: string; 
  email?: string;
  created_at?: string;
  password?: string;
  profilePicture?: string;
  //accessRole: AccessRole;
}

export default User