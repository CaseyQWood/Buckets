import React, {Suspense } from "react";
import "../styles/profile.scss";

import BudgetActualExpected from "../components/graph";
import ProgressBar from "../components/progressBar";
import ChatButton from "../components/ChatButton";
import NewChat from "../components/NewChat";
import FaceRec from "../components/FaceRec";

import { Physics, Debug, usePlane} from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Bucket from '../3dobjects/PolyBucket'
import Coin from '../3dobjects/BucketCoin'
import Wall from '../3dobjects/PhysicsWalls'

import { useState } from "react";
import { Grid, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import UserInfo from "../components/userInfo";
import Join from "../components/Join";

import useCategoryData from "../hooks/useCategoryData";
import useGoalData from "../hooks/useGoalsData";
import useUserData from "../hooks/useUserData";
import useVisiblity from "../hooks/useVisiblity";

export default function Profile() {
  //Handles visibility of Chat component
  const [ChatComponent, toggleVisibility] = useVisiblity(<NewChat />, false);

  // Handles category data for the progress bar component
  const { categoryState } = useCategoryData();
  // Generates a progress bar for each category
  const categoryProgress = categoryState.values.map((values, index) => {
    return (
      <ProgressBar
        key={index}
        currentValue={50}
        name={values[0]}
        spendLimit={values[1]}
      />
    );
  });
  //Handles goal data for the progress bar component
  const { goalState } = useGoalData();
  // Generate a progress bar for each goal
  const goalProgress = goalState.values.map((values, index) => {
    return (
      <ProgressBar
        key={index}
        currentValue={80}
        name={values[0]}
        spendLimit={values[1]}
      />
    );
  });
  //Handles user data for the Profile Page
  const { userState } = useUserData();
  // Generates user info section
  const userInfo = userState.values.map((values, index) => {
    return <UserInfo income={values[1]} key={index} />;
  });

  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(true);

  // this is the floor of the R3F
  function Plane() {
    const [ref] = usePlane(() => ({mass: 0, rotation: [-Math.PI / 2, 0, 0], position: [0, -2, 0]}))
    return (
      <mesh ref={ref}/>
    )
  } 

  // controls how many coins drop 
  function Coins(props) {
    const container = []
    for (let i = 0; i < props.numOfCoins; i ++) {
      container.push(<Coin scale={10} position={[0, 4, 0]} rotation={[0, Math.random() * 100, 0]}/>)
    }
    return container
  }

 // currently have OrbitControls and Debug commented out as they are used to TS but not for production 
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs>
            <div>{userInfo}</div>
            <div className="threeJS">
              <h3>ThreeJS HERE</h3>
              <div className='canvas-tupperware'>
                <Canvas camera={{position: [0, 0.5, 6],far: 500, fov: 60}}>
                  {/* <OrbitControls/> */}
                  <pointLight position={[10, 10, 10]} intensity={2} />
                  <Physics>
                    {/* <Debug> */}
                      <Suspense>
                        <Wall/>
                        <Plane position={[0, 5, 0]}/>
                        <Coins numOfCoins={10}/>
                        <Bucket scale={7} position={[0, -2, 0]} rotation={[0, Math.random() * 5, 0]}/>
                      </Suspense>
                    {/* </Debug> */}
                  </Physics>
                </Canvas>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="center-col-profile">
              <div className="previous-budget-graph">
                <BudgetActualExpected />
              </div>
              <div className="category-bars" style={{ margin: 1 + "em" }}>
                {categoryProgress}
              </div>
            </div>
          </Grid>
          <Grid item xs>
            <div className="right-col-profile">
              <div className="goals-bars">{goalProgress}</div>
              <div className="buttonComponent">
                <span>
                  <Button variant="contained" size="large">
                    Create a New Budget
                  </Button>
                </span>
                <span>
                  <Button variant="contained" size="large">
                    Create a New Goal
                  </Button>
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      <div>
      <ChatButton onClick={toggleVisibility} />
      {ChatComponent}
      </div>
    </>
  );
}

