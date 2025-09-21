// ObjViewer.tsx
import  { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

function ObjModel({ urlObj = '/UpliftV5v1.obj', urlMtl = '/UpliftV5v1.mtl', fixedScale = 10, spinSpeed = 0.2 }) {
  // Load materials and OBJ
  const materials = useLoader(MTLLoader, urlMtl);
  materials.preload();

  const obj = useLoader(OBJLoader, urlObj, (loader) => {
    loader.setMaterials(materials);
  });

  // Refs for grouping and model
  const pivotRef = useRef<THREE.Group | null>(null);
  const objRef = useRef<THREE.Object3D | null>(null);
  const { camera } = useThree();

  // Auto-center and optionally set scale to a fixedScale if model too small/large
  useEffect(() => {
    if (!objRef.current || !pivotRef.current) return;

    const box = new THREE.Box3().setFromObject(objRef.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Move object so its center is at origin
    objRef.current.position.x -= center.x;
    objRef.current.position.y -= center.y;
    objRef.current.position.z -= center.z;

    // Determine a scale factor so model is visible at fixedScale (optional)
    // You can keep fixedScale as a manual multiplier, or auto-calc based on size.
    const maxDim = Math.max(size.x, size.y, size.z);
    const autoScale = maxDim > 0 ? (fixedScale / maxDim) : 1;
    objRef.current.scale.setScalar(autoScale);

    // Position camera back a bit based on model size
    camera.position.set(0, 0, Math.max(50, maxDim * 2 * autoScale));
    camera.lookAt(0, 0, 0);
  }, [obj, camera, fixedScale]);

  // Make the model horizontal (lie flat): rotate -90deg around X
  // We'll place the model inside objRef, then put a pivot group that we tilt by 60deg and spin.
  // Tilt angle = 60 degrees
  const tiltRad = (60 * Math.PI) / 180;

  // Spin the pivot around its local Y axis (after tilt). speed is radians/sec scale.
  useFrame((state, delta) => {
    if (pivotRef.current) {
      // spinSpeed is in degrees per second-ish mapped to radians
      pivotRef.current.rotation.y += delta * (spinSpeed * (Math.PI / 180));
      state //does not do anything, just to avoid  error
    }
  });

  return (
    <group ref={pivotRef} rotation={[tiltRad, 0, 0]}>
      {/* objRef holds the actual object; set initial rotation so it's horizontal */}
      <primitive
        ref={objRef}
        object={obj}
        rotation={[-Math.PI / 2, 0, 0]} // lie flat
      />
    </group>
  );
}

const ObjViewer = () => {
  return (
    <div className="h-[500px] md:w-1/2 mx-auto">
      <Canvas camera={{ position: [0, 0, 200], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 10]} intensity={1} />
        <Suspense fallback={null}>
          {/* props: urlObj, urlMtl, fixedScale (multiplier), spinSpeed (deg/sec) */}
          <ObjModel urlObj="/UpliftV5v1.obj" urlMtl="/UpliftV5v1.mtl" fixedScale={10} spinSpeed={10} />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate minDistance={20} maxDistance={1000} />
      </Canvas>
    </div>
  );
};

export default ObjViewer;
