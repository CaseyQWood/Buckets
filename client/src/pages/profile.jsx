import React, {Suspense } from "react";
import "../styles/profile.scss";

import BudgetActualExpected from "../components/graph";
import ProgressBar from "../components/progressBar";
import ChatButton from "../components/ChatButton";
import NewChat from "../components/NewChat";

import { Physics, usePlane} from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import Bucket from '../3dobjects/PolyBucket'
import Coin from '../3dobjects/BucketCoin'
import Wall from '../3dobjects/PhysicsWalls'

import { Grid, Box, Button } from "@material-ui/core";
import UserInfo from "../components/userInfo";

import useActiveData from "../hooks/useActiveData";
import useGoalData from "../hooks/useGoalsData";
import useUserData from "../hooks/useUserData";
import useVisiblity from "../hooks/useVisiblity";
import useProfileState from "../hooks/useProfileData";

export default function Profile() {
  //Handles visibility of Chat component
  const [ChatComponent, toggleVisibility] = useVisiblity(<NewChat />, false);

  // Handles category data for the progress bar component
  const { state } = useActiveData();
  const percentCalculator = (num, den) => {
    const number1 = num ? Number(num.replace(/[^0-9.-]+/g, "")) : 0.0;
    const number2 = den ? Number(den.replace(/[^0-9.-]+/g, "")) : 0.0;

    return ((number1 / number2) * 100).toFixed(2);
  };

  const checkSpend = (spendArray, category) => {
    for (const spend of spendArray) {
      if (spend.id === category.category_id) {
        return percentCalculator(spend.sum, category.spend_limit);
      }
    }
  }

  const categoryProgress = state.categories.map((ele, index) => {
    return <ProgressBar 
      key={index}
      currentValue={checkSpend(state.totalSpendCategories, ele)}
      name={ele.category_name}
      spendLimit={ele.spend_limit}
    />
  })

  //Set up data for graph
  const {profileState} = useProfileState();
  console.log("STATE: ", profileState);
  const graphNames = profileState.actualSpends.map (ele => {
    return ele.name;
  })

  const graphExpected = profileState.expectedSpends.map(ele => {
    return Number(ele.expected_total.replace(/[^0-9.-]+/g, ""));
  })

  const graphActual = profileState.actualSpends.map(ele => {
    return Number(ele.actual_total.replace(/[^0-9.-]+/g, ""));
  })
  //Set up data for goals
  //Generate a progress bar for each goal
  const goalProgress = profileState.goals.map((goal, index) => {
    const currentValue = percentCalculator(goal.amount_added, goal.amount_to_goal);
    
    return (
      <ProgressBar
        key={index}
        currentValue={currentValue}
        name={goal.name}
        spendLimit={goal.amount_to_goal}
      />
    );
  });
  //Handles user data for the Profile Page
  const activeBudget = profileState.expectedSpends.find(ele => {ele.active = true});
  console.log("ACTIVE BUDGET: ", activeBudget)
  const userInfo = <UserInfo income={profileState.user.individual_income} />;

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
                <BudgetActualExpected actual={graphActual} expected={graphExpected} names={graphNames}/>
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

