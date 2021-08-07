import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import {useCylinder} from '@react-three/cannon'


export default function Model(props) {
  const [position, setPosition] = useState(props.position)
  const [rotation, setRotation] = useState([0,0,0])
  
  const { nodes, materials } = useGLTF('/superMarioCoinglb.glb')
  const [ref, api] = useCylinder(() => ({mass: 1, position: position, rotation: rotation, args: [0.5, 0.5, 0.1, 5]}))
  const group = useRef(ref)
 
  useEffect(() => {setPosition(ref.position)},[ref])

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
