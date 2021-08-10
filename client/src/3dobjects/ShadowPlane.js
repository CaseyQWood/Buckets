import * as THREE from 'three'

export default function ShadowPlane(props) {

  const material = new THREE.ShadowMaterial();
  material.opacity = 0.2;
  return (
    <mesh material={material} rotation={[-Math.PI / 2, 0, 0]} {...props} castShadow receiveShadow>
      <planeBufferGeometry args={[15, 15]} />
      {/* <meshStandardMaterial color='red'/> */}

    </mesh >
  )
}