import React, {Suspense} from 'react'
import '../styles/login.scss'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Coin from '../3dobjects/SuperMarioCoinglb'

export default function Login() {



  return (
    <div class='general'>
      <div class='test'>
        <Canvas height={window.innerHeight} width={window.innerWidth}>
          <ambientLight/>
          <pointLight position={[10, 10, 10]} intensity={2} />
          <OrbitControls/>
            <Suspense>
              <Coin position={[1, 1, 1]}/>
              <Coin position={[0, 0, 0]}/>
              <Coin position={[-1, 1.5, 1]}/>
              <Coin position={[-2, 2.5, 1]}/>
              <Coin position={[1.9, 2.5, 1]}/>
              <Coin position={[-2, 1, 1]}/>
            </Suspense>
        </Canvas>
      </div>

      <p>BucketUp!</p>

      <div class='modal'> 
        <div class='login'>
          <h3>login</h3>
          <form><input placeholder='please enter email'/></form>
          <form><input placeholder='please enter password'/></form>
          <button>login</button>
          <a href='/register' >Register</a>
        </div>
      </div>

   

    </div>
  )
}