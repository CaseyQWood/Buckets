/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Bucket(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/polyBucket.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh castShadow geometry={nodes.Mesh_0.geometry} material={materials['Material.001']} />
      </group>
    </group>
  )
}

useGLTF.preload('/polyBucket.glb')
