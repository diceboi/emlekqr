"use client"

import Image from "next/image"
import Link from "next/link"
import H1 from "../components/UI/H1"
import Paragraph from "../components/UI/Paragraph"
import { Canvas, extend } from '@react-three/fiber'
import { Plane } from '@react-three/drei';
import { useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useRef } from "react"

import { TbQrcode } from "react-icons/tb";

function Scene() {
  // Load the materials first
  const materials = useLoader(MTLLoader, '/3D-CAD-erme.mtl');
  
  // Load the OBJ file and apply the materials
  const obj = useLoader(OBJLoader, '/3D-CAD-erme.obj', (loader) => {
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

  return <primitive ref={objRef} object={obj} scale={1} castShadow receiveShadow />
}

export default function Hero() {
  return (
    <>
      <section className="flex justify-center items-center w-full min-h-[95vh] relative">
      <div className="container flex justify-center items-center m-auto py-2 w-full h-full lg:w-8/12 z-10">
        <div className="flex flex-col items-center w-full gap-4 pt-40">
          <H1 classname="text-center text-white">A digitális emlékoldal</H1>
          <Paragraph classname="text-center text-white">
            Készítsd el saját emlékérméd, őrizd meg szeretteid legszebb pillanatait!
          </Paragraph>
          <Link href="/erme" className="flex items-center justify-center gap-2 py-1 px-4 lg:py-2 lg:px-6 mx-1 rounded-full bg-[--blue] hover:bg-[--blue-hover] transition-all text-white">
            <TbQrcode className="w-6 h-6" />
            Elkészítem
          </Link>
        </div>
      </div>
      <Canvas 
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
      </Canvas>
      <div className="absolute w-full h-full bg-[--rose]">
        <Image src="/image-kepek/hero-image.webp" fill style={{objectFit: "cover"}} className="opacity-50" />
        <div className="w-full h-full bg-[--rose]"></div>
      </div>
    </section>
    </>
    
  );
}