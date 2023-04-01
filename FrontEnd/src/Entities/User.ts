import React from 'react'

type User = {
  id: number|null;
  name?: string; 
  email?: string;
  created_at?: string;
  password?: string;
  password_confirmation: string;
  profilePicture?: string;
  //accessRole: AccessRole;
}

export default User