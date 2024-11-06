import { Canvas, extend } from '@react-three/fiber'
import { Plane } from '@react-three/drei';
import { useLoader, useFrame } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useRef } from "react"

function Scene() {
    // Load the materials first
    const materials = useLoader(MTLLoader, '/3D-CAD-erme-oval.mtl');
    
    // Load the OBJ file and apply the materials
    const obj = useLoader(OBJLoader, '/3D-CAD-erme-oval.obj', (loader) => {
      materials.preload(); // Preload materials
      loader.setMaterials(materials); // Attach materials to OBJ loader
    });
    
    const objRef = useRef();
  
    // Rotate the object on each frame
    useFrame(() => {
      if (objRef.current) {
        objRef.current.rotation.z += 0.000;
        objRef.current.rotation.y += 0.01;
        objRef.current.rotation.x += 0.000;
         // Adjust rotation as desired
      }
    });
  
    return <primitive ref={objRef} object={obj} scale={1} castShadow receiveShadow />
  }

export default function EmlekermeOval() {
  return (
    <Canvas 
      style={{ height: "300px", width: "100%" }}
      className="w-full z-[9]"
      camera={{ fov: 30, position: [0, 0, 45] }}
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
  )
}
