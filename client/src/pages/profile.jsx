import React from 'react'
import '../styles/profile.scss'

import BudgetActualExpected from '../components/graph'
import ProgressBar from '../components/progressBar'
import ChatButton from '../components/ChatButton'

import { useState } from 'react'
import { Grid, Box, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import UserInfo from '../components/userInfo'
import Join from '../components/userInfo'

import useCategoryData from '../hooks/useCategoryData'
import useGoalData from '../hooks/useGoalsData'
import useUserData from '../hooks/useUserData'

  
export default function Profile() {

  // Handles category data for the progress bar component
  const {categoryState} = useCategoryData();
  // Generates a progress bar for each category
  const categoryProgress = categoryState.values.map((values, index) => {
    return (
      <ProgressBar key={index} currentValue={50} name={values[0]} spendLimit={values[1]} />
    )
  })
  //Handles goal data for the progress bar component
  const {goalState} = useGoalData();
  // Generate a progress bar for each goal
  const goalProgress = goalState.values.map((values, index) => {
    return (
      <ProgressBar key={index} currentValue={80} name={values[0]} spendLimit={values[1]} />
    )
  })
  //Handles user data for the Profile Page
  const {userState} = useUserData();
  // Generates user info section
  const userInfo = userState.values.map((values, index) => {
    return (
      <UserInfo income={values[1]} key={index}/>
    )
  })

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs>
          <div>
            {userInfo}
          </div>
          <div class="threeJS">
            <h3>ThreeJS HERE</h3>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div class="center-col-profile">
            <div class="previous-budget-graph">
            <BudgetActualExpected />
            </div>
            <div class="category-bars" style={{margin:1 + 'em'}}>
              {categoryProgress}
            </div>
          </div>
        </Grid>
        <Grid item xs>
        <div class="right-col-profile">
          <div class="goals-bars">  
            {goalProgress}
          </div>
          <div class="buttonComponent">
            <span><Button variant="contained" size="large">Create a New Budget</Button></span>
            <span><Button variant="contained" size="large">Create a New Goal</Button></span>
          </div>
        </div>
        </Grid>
      </Grid>
    </Box>  
        <Link 
          to={`/`}><ChatButton />
        </Link>    
    </>
  )
}