import React, { Suspense, useState, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import Coin from "../3dobjects/SuperMarioCoinglb";
import { Physics, Debug } from "@react-three/cannon";
import axios from "axios";
import { useHistory } from "react-router-dom";
import FaceRec from "../components/FaceRec";
import LoginForm from "../components/LoginForm";
import { authContext } from "../providers/AuthProvider";


export default function Login() {
  const [mass, setMass] = useState(0);
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);

  const { login } = useContext(authContext);

  let history = useHistory();
  const positionArray = [
    [1.4, 1.75, 1],
    [2, 0.75, 1],
    [-1, 1.5, 1],
    [-2, 2.5, 1],
    [1.9, 2.5, 1],
    [-2, 1, 1]
  ];

  const verifyLogin = (email, password) => {
    const url = "http://localhost:3002/api/users";

    setFlag(true);
    axios.get(url).then((res) => {
      res.data.forEach((user) => {
        if (user.email === email && user.password === password) {
          sessionStorage.setItem("token", user.id);
          sessionStorage.setItem("firstName", user.first_name);
          sessionStorage.setItem("lastName", user.last_name);
          setTimeout(() => setMass(10), 11000);
          setTimeout(() => history.push("/profile"), 12500);

          // call login function from authprovider to setUser
          login(email, password);
        }
      });
    });
  };

  const showFace = () => {
    setShow(true);
  };

  return (
    <>
    <div className='login-emperor'>
      <div className="general">
        <div className="falling-coins">
          <Canvas height={window.innerHeight} width={window.innerWidth}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <Physics gravity={[0, -mass, 0]}>
              {/* <Debug> */}
                <Suspense>
                  {positionArray.map((pos, index) => (
                    <Coin key={index} position={pos} />
                  ))}
                </Suspense>
              {/* </Debug> */}
            </Physics>
          </Canvas>
        </div>

        {show === false ? (
          flag === false ? (
            <LoginForm verifyLogin={verifyLogin} />
          ) : (
            <FaceRec showFace={showFace} />
          )
        ) : (
          <div> </div>
        )}
      </div>
      </div>
    </>
  );
}
