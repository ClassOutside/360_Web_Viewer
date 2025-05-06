import { useSelector } from "react-redux";
import { useEffect } from "react";

const useSeekedVideo = (videoRef, transitionMaterialRef) => {
  const currentTime = useSelector((state) => state.video.currentTime);
  const isPlaying = useSelector((state) => state.video.isPlaying);
  const dragging = useSelector((state) => state.video.dragging);

  useEffect(() => {
    if (videoRef.current) {
      if (currentTime !== videoRef.current.currentTime && !isPlaying) {
        videoRef.current.currentTime = currentTime;
        // console.log("currentTime " + currentTime);
      }
    }
  }, [currentTime]);
};

export default useSeekedVideo;
