import React from "react"
import { useBox } from "@react-three/cannon"

export default function Wall() {
  const args = [1, 15, 1]
  const mass = 0
  const [ref] = useBox(() => ({mass, args, rotation: [0, 0, -0.2], position: [1.8,0,0]}))
  const [ref1] = useBox(() => ({mass, args, rotation: [0, 0, 0.2], position: [-1.8,0,0]}))
  const [ref2] = useBox(() => ({mass, args, rotation: [-0.2, 0, 0], position: [0,0,-1.8]}))
  const [ref3] = useBox(() => ({mass, args, rotation: [0.2, 0, 0], position: [0,0,1.8]}))
  const [ref4] = useBox(() => ({mass, args, rotation: [0.2, 0, 0], position: [0,0,1.8]}))
  const [ref5] = useBox(() => ({mass, args, rotation: [0.15, Math.PI * 0.25, -0.1], position: [1.2, 0, 1.2]}))
  const [ref6] = useBox(() => ({mass, args, rotation: [-0.15, Math.PI * 0.25, 0.1], position: [-1.2, 0, -1.2]}))
  const [ref7] = useBox(() => ({mass, args, rotation: [-0.1, Math.PI * 0.25, -0.15], position: [1.3, 0, -1.3]}))
  const [ref8] = useBox(() => ({mass, args, rotation: [0.1, Math.PI * 0.25, 0.15], position: [-1.3, 0, 1.3]}))

  return (
    <>
      <mesh ref={ref}></mesh>
      <mesh ref={ref1}></mesh>
      <mesh ref={ref2}></mesh>
      <mesh ref={ref3}></mesh>
      <mesh ref={ref4}></mesh>
      <mesh ref={ref5}></mesh>
      <mesh ref={ref6}></mesh>
      <mesh ref={ref7}></mesh>
      <mesh ref={ref8}></mesh>
    </>
  )
}