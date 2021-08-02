/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {useCylinder} from '@react-three/cannon'


export default function Model(props) {
  const [position, setPosition] = useState(props.position)
  
  const { nodes, materials } = useGLTF('/superMarioCoinglb.glb')
  const [ref, api] = useCylinder(() => ({mass: 1, position: position, args: [0.5, 0.5, 0.1, 5]}))
  const group = useRef(ref)
  // useFrame((state, delta) => (
  //   group.current.rotation.x += 0.01
  // ))
  
  // console.log('this is ref', ref.position)
  // if(ref) {console.log(ref.position)}
  console.log('tester',position)
  useEffect(() => {setPosition(ref.position)},[ref])
  // console.log('this is group',group)  

  return (
    <group ref={ref} position={position} dispose={null} >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.0019}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 0, 0]} scale={[1, 1, 1.27]}>
            <mesh geometry={nodes['Cylinder001_01_-_Default_0'].geometry} material={materials['01_-_Default']} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/superMarioCoinglb.glb')
