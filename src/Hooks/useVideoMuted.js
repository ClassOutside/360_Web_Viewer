import { useEffect } from "react";

const useVideoMuted = (videoRef, muted) => {
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [videoRef, muted]);
};

export default useVideoMuted;
