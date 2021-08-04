import React, {Suspense, useState, useEffect} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Coin from '../3dobjects/SuperMarioCoinglb'
import { Physics, Debug } from '@react-three/cannon'
import axios from 'axios'
import '../styles/login.scss'
import { Redirect, useHistory } from 'react-router-dom'

export default function Login() {
const [mass, setMass] = useState(0)
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
let history = useHistory()
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
      sessionStorage.setItem('firstName', x.first_name)
      sessionStorage.setItem('lastName', x.last_name)
      setTimeout(() => {history.push('/profile')}, 750)
      console.log(x)
      console.log("sessionStorage-----",sessionStorage)
    }})
  })
}

  return (
    <div className='general'>
      <div className='falling-coins'>
        <Canvas height={window.innerHeight} width={window.innerWidth}>
          <ambientLight/>
          <pointLight position={[10, 10, 10]} intensity={2} />
          <Physics gravity={[0, -mass, 0]}>
            <Debug>
              <Suspense>
                {positionArray.map((pos, index) => (<Coin key={index} position={pos} />))}
                </Suspense>
              </Debug>
            </Physics> 
        </Canvas>
      </div>

      <p>BucketUp!</p>

      <div className='user-login'> 
        <div className='login'>
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