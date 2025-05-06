import { useEffect } from "react";
import { useXR } from "@react-three/xr";

const useIsXRSession = (setIsXR) => {
  const session = useXR((xr) => xr.session);

  useEffect(() => {
    if (session !== undefined) {
      setIsXR(true); // Call the setter with true
    } else {
      setIsXR(false); // Call the setter with false
    }
  }, [session, setIsXR]);
};

export default useIsXRSession;
