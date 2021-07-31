import './App.css';
import React, { Suspense, useRef } from 'react'
import * as THREE from 'three'
import {Canvas} from '@react-three/fiber'
import Coin from './SuperMarioCoinglb'
import {OrbitControls} from "@react-three/drei"

// currently the commented out section was just for testing base 3d object dependancies ahead of time please disregard


function App() {
  return (
    <div>
      <p>THIS IS A TEST</p>
      {/* <Canvas>
      <ambientLight/>
      <pointLight position={[10, 10, 10]} intensity={3} />
      <OrbitControls/>
        <Suspense>
          <Coin roughness={0.2}/>
        </Suspense>
      </Canvas> */}
    
    </div>
  );
}

export default App;
