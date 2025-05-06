import { useFrame } from "@react-three/fiber";

const useAlwaysFaceCamera = (meshRef, camera) => {
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
    }
  });
};

export default useAlwaysFaceCamera;
