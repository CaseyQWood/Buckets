import React, {Suspense, useState, useEffect} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Coin from '../3dobjects/SuperMarioCoinglb'
import { Physics, Debug } from '@react-three/cannon'
import axios from 'axios'
import '../styles/login.scss'

export default function Login() {
const [mass, setMass] = useState(0)
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const positionArray = [[1, 1, 1], [0, 1, 0], [-1, 1.5, 1], [-2, 2.5, 1], [1.9, 2.5, 1], [-2, 1, 1]]

console.log(email)
console.log(password)

const login = (inputEmail, inputPassword) => {
  const url = 'http://localhost:3002/api/users'
  axios.get(url).then((res) => {
    console.log(res.data)
    res.data.forEach(x => {if (x.email === inputEmail && x.password === inputPassword){
      setMass(10)
      sessionStorage.setItem('token', x.id)
      setTimeout(() => {console.log('login success')}, 500)
      console.log(x)
    }})
  })
}

  return (
    <div class='general'>
      <div class='test'>
        <Canvas height={window.innerHeight} width={window.innerWidth}>
          <ambientLight/>
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Physics gravity={[0, -mass, 0]}>
            {/* <Debug> */}
              <Suspense>
                {positionArray.map((pos, index) => (<Coin key={index} position={pos} />))}
                </Suspense>
              {/* </Debug> */}
            </Physics> 
        </Canvas>
      </div>

      <p>BucketUp!</p>

      <div class='modal'> 
        <div class='login'>
          <h3>login</h3>
          <form><input placeholder='please enter email' type='text' value={email} onChange={event => setEmail(event.target.value)}/></form>
          <form><input placeholder='please enter password' type='text' value={password} onChange={event => setPassword(event.target.value)}/></form>
          <button onClick={(res) => login(email, password)}>login</button>
          <a href='/register' >Register</a>
        </div>
      </div>

   

    </div>
  )
}