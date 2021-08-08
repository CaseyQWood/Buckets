import React, { Suspense } from "react";
import "../styles/profile.scss";

import BudgetActualExpected from "../components/graph";
import ProgressBar from "../components/progressBar";
import ChatButton from "../components/ChatButton";
import NewChat from "../components/NewChat";

import { Physics, usePlane } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import Bucket from '../3dobjects/PolyBucket'
import Coin from '../3dobjects/BucketCoin'
import Wall from '../3dobjects/PhysicsWalls'
import NewGoal from '../components/NewGoal'
import DarkIcon from "../3dobjects/DarkGraph";
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three'

import { Grid, Box } from "@material-ui/core";
import UserInfo from "../components/userInfo";

import useActiveData from "../hooks/useActiveData";
import useVisiblity from "../hooks/useVisiblity";
import useProfileState from "../hooks/useProfileData";
import NavBar from "../components/NavBar.jsx";

export default function Profile() {
  const { profileState, userState, addGoal } = useProfileState();
  //Handles visibility of Chat component
  const [ChatComponent, toggleVisibility] = useVisiblity(<NewChat />, false);
  //Access needed data with Axios
  const budgetId = profileState.actualSpends[0] ? profileState.actualSpends[0].budget_id : 0;

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
  //Renders categories component
  const categoryProgress = state.categories.map((ele, index) => {
    return <ProgressBar
      key={index}
      currentValue={checkSpend(state.totalSpendCategories, ele)}
      name={ele.category_name}
      spendLimit={ele.spend_limit}
    />
  })

  //Set up data for graph
  const graphNames = profileState.actualSpends.map(ele => {
    return ele.name;
  })

  const graphExpected = profileState.expectedSpends.map(ele => {
    return Number(ele.expected_total.replace(/[^0-9.-]+/g, ""));
  })

  const graphActual = profileState.actualSpends.map(ele => {
    return Number(ele.actual_total.replace(/[^0-9.-]+/g, ""));
  })

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

  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(true);

  // this is the floor of the R3F
  function Plane() {
    const [ref] = usePlane(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0], position: [0, -2, 0] }))
    return (
      <mesh ref={ref} />
    )
  }

  function ShadowPlane(props) {

    const material = new THREE.ShadowMaterial();
    material.opacity = 0.2;
    return (
      <mesh material={material} rotation={[-Math.PI / 2, 0, 0]} {...props} castShadow receiveShadow>
        <planeBufferGeometry args={[15, 15]} />

      </mesh >
    )
  }

  // controls how many coins drop
  function Coins(props) {
    const container = []
    for (let i = 0; i < props.numOfCoins; i++) {
      container.push(<Coin scale={10} position={[0, 4, 0]} rotation={[0, Math.random() * 100, 0]} />)
    }
    return container
  }


  //Handles userInfo data for the Profile Page
  const expectedSpend = profileState.expectedSpends.find(ele => ele.active);
  const expectedBudget = expectedSpend ? expectedSpend.expected_total : 0;
  const expectedBudgetNum = expectedBudget ? Number(expectedBudget.replace(/[^0-9.-]+/g, "")) : 0;

  const actualSpend = profileState.actualSpends.find(ele => ele.active);
  const actualBudget = actualSpend ? actualSpend.actual_total : 0;
  const actualBudgetNum = actualBudget ? Number(actualBudget.replace(/[^0-9.-]+/g, "")) : 0;

  const totalRemainingNumber = expectedBudgetNum - actualBudgetNum;
  const totalRemainingFormatted = `$${totalRemainingNumber}.00`

  const userInfo = <UserInfo income={profileState.user.individual_income} expectedExpenses={expectedBudget} balance={totalRemainingFormatted} />;

  // currently have OrbitControls and Debug commented out as they are used to TS but not for production
  return (

    <>
    <NavBar/>
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>

          <Grid item xs>

            <div className="threeJS">
              <div className='canvas-tupperware'>
                <Canvas shadows camera={{ position: [0, 0.5, 6], far: 500, fov: 60 }}>
                  {/* <OrbitControls/> */}
                  <pointLight castShadow position={[-5, 10, 10]} intensity={1.5} />
                  <Physics>
                    {/* <Debug> */}
                    <Suspense>
                      <Wall />
                      <Plane position={[0, 5, 0]} />
                      <Coins numOfCoins={10} />
                      <Bucket scale={7} position={[0, -1.8, 0]} rotation={[0, Math.random() * 5, 0]} />
                      <ShadowPlane position={[0, -3, 0]} />
                    </Suspense>
                    {/* </Debug> */}
                  </Physics>
                </Canvas>
              </div>
            </div>

            <div>{userInfo}</div>
            <div className="right-col-profile">

              <div className="goals-bars">
                <h3>Goals:</h3>
                {goalProgress}
              </div>

              <div className="buttonComponent">
                <span>
                  <NewGoal onSave={addGoal} budgetId={budgetId} />
                </span>
              </div>

            </div>

          </Grid>

          <Grid item xs={6}>
            <div className="center-col-profile">
              <div>
                <Canvas>
                  <OrbitControls />

                  <pointLight castShadow position={[-5, 10, 10]} intensity={1.5} />
                  <Suspense fallback={null}>
                    <DarkIcon />

                  </Suspense>
                </Canvas>

              </div>

              <div className="previous-budget-graph">
                <BudgetActualExpected actual={graphActual} expected={graphExpected} names={graphNames} />
              </div>

              <div className="category-bars" style={{ margin: 1 + "em" }}>
                <h3>Categories</h3>
                {categoryProgress}
              </div>

            </div>
          </Grid>
        </Grid>
      </Box>

      <div>
        <ChatButton onClick={toggleVisibility} />
        {ChatComponent}
      </div>
    </div>
    </>
  );
}


// ----------- original --------------------
// <>
// <Box sx={{ flexGrow: 1 }}>
//   <Grid container spacing={3}>
//     <Grid item xs>
//       <div>{userInfo}</div>
//       <div className="threeJS">
//         <h3>ThreeJS HERE</h3>
//         <div className='canvas-tupperware'>
//           <Canvas camera={{position: [0, 0.5, 6],far: 500, fov: 60}}>
//             {/* <OrbitControls/> */}
//             <pointLight position={[10, 10, 10]} intensity={2} />
//             <Physics>
//               {/* <Debug> */}
//                 <Suspense>
//                   <Wall/>
//                   <Plane position={[0, 5, 0]}/>
//                   <Coins numOfCoins={10}/>
//                   <Bucket scale={7} position={[0, -2, 0]} rotation={[0, Math.random() * 5, 0]}/>
//                 </Suspense>
//               {/* </Debug> */}
//             </Physics>
//           </Canvas>
//         </div>
//       </div>
//     </Grid>
//     <Grid item xs={6}>
//       <div className="center-col-profile">
//         <div className="previous-budget-graph">
//           <BudgetActualExpected actual={graphActual} expected={graphExpected} names={graphNames}/>
//         </div>
//         <div className="category-bars" style={{ margin: 1 + "em" }}>
//           {categoryProgress}
//         </div>
//       </div>
//     </Grid>
//     <Grid item xs>
//       <div className="right-col-profile">
//         <div className="goals-bars">{goalProgress}</div>
//         <div className="buttonComponent">
//           <span>
//             <Button variant="contained" size="large">
//               Create a New Budget
//             </Button>
//           </span>
//           <span>
//             <Button variant="contained" size="large">
//               Create a New Goal
//             </Button>
//           </span>
//         </div>
//       </div>
//     </Grid>
//   </Grid>
// </Box>

// <div>
// <ChatButton onClick={toggleVisibility} />
// {ChatComponent}
// </div>
// </>




// ----------------- version 1 -----------------

// (<div>

// <Box sx={{ flexGrow: 1 }}>
//   <Grid container spacing={3}>

//     <Grid item xs>
//     <div className="threeJS">
//   <h3>Spending Available</h3>
//   <div className='canvas-tupperware'>
//     <Canvas camera={{position: [0, 0.5, 6],far: 500, fov: 60}}>
//       {/* <OrbitControls/> */}
//       <pointLight position={[10, 10, 10]} intensity={2} />
//       <Physics>
//         {/* <Debug> */}
//           <Suspense>
//             <Wall/>
//             <Plane position={[0, 5, 0]}/>
//             <Coins numOfCoins={10}/>
//             <Bucket scale={7} position={[0, -2, 0]} rotation={[0, Math.random() * 5, 0]}/>
//           </Suspense>
//         {/* </Debug> */}
//       </Physics>
//     </Canvas>
//   </div>
// </div>

//       <div>{userInfo}</div>
//         <div className="right-col-profile">
//           <div className="goals-bars">{goalProgress}</div>
//           <div className="buttonComponent">
//             <span>
//               <Button variant="contained" size="large">
//                 Create a New Budget
//               </Button>
//             </span>
//             <span>
//               <Button variant="contained" size="large">
//                 Create a New Goal
//               </Button>
//             </span>
//           </div>
//         </div>

//     </Grid>

//     <Grid item xs={6}>
//       <div className="center-col-profile">

//         <div className="previous-budget-graph">
//           <BudgetActualExpected actual={graphActual} expected={graphExpected} names={graphNames}/>
//         </div>

//         <div className="category-bars" style={{ margin: 1 + "em" }}>
//           {categoryProgress}
//         </div>

//       </div>
//     </Grid>
//   </Grid>
// </Box>

// <div>
// <ChatButton onClick={toggleVisibility} />
// {ChatComponent}
// </div>
// </div>)