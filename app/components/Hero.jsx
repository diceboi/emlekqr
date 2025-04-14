"use client";

import Image from "next/image";
import Link from "next/link";
import H1 from "../components/UI/H1";
import Paragraph from "../components/UI/Paragraph";
import Label from "../components/UI/Label";
import { TbBrowserPlus } from "react-icons/tb";
import { Canvas, extend } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useRef } from "react";
import { motion } from "framer-motion";

import { TbQrcode } from "react-icons/tb";

function Scene() {
  // Load the materials first
  const materials = useLoader(MTLLoader, "/3D-CAD-erme-negyzet.mtl");

  // Load the OBJ file and apply the materials
  const obj = useLoader(OBJLoader, "/3D-CAD-erme-negyzet.obj", (loader) => {
    materials.preload(); // Preload materials
    loader.setMaterials(materials); // Attach materials to OBJ loader
  });

  const objRef = useRef();

  // Rotate the object on each frame
  useFrame(() => {
    if (objRef.current) {
      objRef.current.rotation.z += 0.005;
      objRef.current.rotation.y += 0.005;
      objRef.current.rotation.x += 0.005;
      // Adjust rotation as desired
    }
  });

  return (
    <primitive ref={objRef} object={obj} scale={1} castShadow receiveShadow />
  );
}

export default function Hero() {
  return (
    <>
      <section className="flex lg:flex-row flex-col items-end w-full min-h-[90vh] relative z-20">
        <div className="flex items-end lg:pl-16 pl-8 lg:pb-16 pb-8 pt-20 pr-20 z-10 relative overflow-hidden rounded-bl-3xl lg:w-1/2 h-[90vh]">
          <motion.div
            animate={{ y: ["-20px", "0px", "-20px"] }} // Start at the viewport's left edge
            transition={{
              duration: 2, // Time for a single loop
              ease: "easeInOut", // Smooth linear motion
              repeat: Infinity, // Infinite looping
              repeatType: "loop", // Restarts the animation
            }}
            className="absolute lg:-bottom-[750px] -bottom-[30vh] lg:-left-[750px] -left-[25vw] lg:w-[1200px] w-[130vw] lg:h-[1200px] h-[60vh] blur-[120px] rounded-full bg-[--rose] lg:opacity-85 opacity-100"
          ></motion.div>
          <div className="flex flex-col items-start w-full gap-4 z-10">
            <H1 classname="text-white">
              A digitális<br></br> emlékoldal
            </H1>
            <Paragraph classname="text-white">
              Ne hagyd hogy szeretteid emléke feledésbe merüljön,<br></br>őrizd
              meg minden pillanatát az utókornak.
            </Paragraph>
            <div
              className="relative flex lg:flex-row flex-col min-w-fit gap-2"
            >
              <Link
                href="/erme"
                className="flex flex-nowrap items-center justify-center gap-3 py-1 px-4 lg:py-2 lg:px-4 rounded-full bg-gradient-to-br from-[--rose] to-[--blue] hover:bg-gradient-to-r hover:from-[--rose] hover:to-[--blue] transition-all text-white h-fit"
              >
                <Image src="/emlekqr-plus-white.svg" alt="EmlékQR Plusz" title="Válts EmlékQR Plusz-ra" width={50} height={50} className="w-6 h-auto" />
                <Label classname={"cursor-pointer"}>Érme rendelés</Label>
              </Link>
              <Link
                href="/ingyenes-emlekoldal-keszites"
                className="flex flex-nowrap items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-4 rounded-full bg-[--cream-10] hover:bg-[--blue] transition-all text-white h-fit"
              >
                <TbBrowserPlus className="w-6 h-6" />
                <Label classname={"cursor-pointer"}>Emlékoldal készítés</Label>
              </Link>
            </div>
          </div>
        </div>
        {/*<Canvas 
      style={{ position: "absolute" }}
      className="-top-20 left-0 w-full z-[9]"
      camera={{ fov: 50, position: [0, 0, 45] }}
      shadows
      >
          <ambientLight intensity={0.4} />
          <directionalLight
            color="white"
            position={[5, 10, 5]}
            intensity={1}
            castShadow // Enable shadow casting
            shadow-mapSize-width={1024} // Optional: Increase shadow resolution
            shadow-mapSize-height={1024}
            shadow-camera-far={10} // Optional: Adjust shadow distance
            shadow-camera-left={-10} // Optional: Set shadow camera bounds for fine-tuning
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[10, 10, 10]} intensity={0.7} />
          <Plane rotation={[-Math.PI / 2, 10, 0]} position={[0, -1, 0]} args={[10, 10]} receiveShadow>
            <shadowMaterial opacity={1} />
          </Plane>
          <Scene className="w-full "/>
      </Canvas>*/}
        <motion.video
          src="videok/Hero-video.mp4"
          autoPlay
          muted
          loop
          className="absolute w-full h-full top-0 left-0 object-cover lg:object-cover rounded-b-3xl"
          preload="auto"
        />
      </section>
    </>
  );
}
