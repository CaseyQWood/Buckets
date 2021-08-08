import React, { Suspense} from 'react'
import useMessagesData from '../hooks/useMessagesData'
import SharedTemplate from '../components/TemplateMessage'
import '../styles/inbox.scss'
import { Canvas } from '@react-three/fiber';
import MailIcon from '../3dobjects/MailIcon';
import * as THREE from 'three'
import NavBar from "../components/NavBar.jsx";

export default function Messages(props) {
  const {messageState} = useMessagesData()


  function Plane(props) {

    const material = new THREE.ShadowMaterial();
    material.opacity = 0.2;
    return (
      <mesh material={material} rotation={[-Math.PI / 2, 0, 0]} {...props} castShadow receiveShadow>
        <planeBufferGeometry  args={[15,15]}/>         
      </mesh >
    )
  } 
  // implement messages for other actions 
  // add a delete button 
 // try to on load of page spinn the icon 

  return (
    <>
    <NavBar />
    <div className='admeral'>
      <div className='capitan'>
        
        <div className='mail-r3f'>
          <Canvas shadows camera={{angle: 0.5, position: [0.5, 0.1, 3.5] }}>
            <ambientLight intensity={0.5}/>
            <pointLight castShadow position={[-2, 10, 10]} intensity={1}  angle={1}/>
            <Suspense fallback={null}>
              {/* <OrbitControls/> */}
              <Plane position={[0, -2.5, 0]}/>
              <MailIcon/>
            </Suspense>
          </Canvas>
        </div>
        <div className='inbox'> 
        <h3 className='header'>Incoming Templates:</h3>
            {/* <SimpleList/> */}
          <ul className='inbox--tupperware'>
            {messageState.map(message => <SharedTemplate message={message}/>)}
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}


// const SimpleList = () => {
//   // const classes = useStyles();

//   return (
//     <div >
//       <List component="nav" aria-label="main mailbox folders">
//         <ListItem button onClick={() => console.log('test')}>
//           <ListItemIcon>
//             <DraftsIcon />
//           </ListItemIcon>
//           <ListItemText primary="Inbox" />
//         </ListItem>
//         <Divider />
//         <ListItem button>
//           <ListItemIcon>
//             <DraftsIcon />
//           </ListItemIcon>
//           <ListItemText primary="Drafts" />
//         </ListItem>
//       </List>
      
//       {/* <List component="nav" aria-label="secondary mailbox folders">
//         <ListItem button>
//           <ListItemText primary="Trash" />
//         </ListItem>
//         <ListItemLink href="#simple-list">
//           <ListItemText primary="Spam" />
//         </ListItemLink>
//       </List> */}
//     </div>
//   );
// }