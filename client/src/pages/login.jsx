import React, {Suspense, useState, useEffect} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Coin from '../3dobjects/SuperMarioCoinglb'
import { Physics, Debug } from '@react-three/cannon'
import '../styles/login.scss'

export default function Login() {
const [mass, setMass] = useState(0)
console.log(mass)

const positionArray = [[1, 1, 1], [0, 1, 0], [-1, 1.5, 1], [-2, 2.5, 1], [1.9, 2.5, 1], [-2, 1, 1]]

let test = positionArray.map((pos, index) => (<Coin key={index} position={pos} mass={mass}/>)) 


  return (
    <div class='general'>
      <div class='test'>
        <Canvas height={window.innerHeight} width={window.innerWidth}>
          <ambientLight/>
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Physics gravity={[0, -mass, 0]}>
            {/* <Debug> */}
              <Suspense>
                {positionArray.map((pos, index) => (<Coin key={index} position={pos} mass={mass}/>))}
                </Suspense>
              {/* </Debug> */}
            </Physics> 
        </Canvas>
      </div>

      <p>BucketUp!</p>

      <div class='modal'> 
        <div class='login'>
          <h3>login</h3>
          <form><input placeholder='please enter email'/></form>
          <form><input placeholder='please enter password'/></form>
          <button onClick={(res) => setMass(10)}>login</button>
          <a href='/register' >Register</a>
        </div>
      </div>

   

    </div>
  )
}