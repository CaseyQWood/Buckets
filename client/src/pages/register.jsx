import React from 'react';
import NewCategory from '../components/NewCategory';
import useProfileState from '../hooks/useProfileData';

export default function Register() {
  const { profileState } = useProfileState();
  console.log(profileState)
  // logic goes here

  return (
    <div>
      <p>this is the register page</p>
      <NewCategory budget_id={1}/>
    </div>

  )
}