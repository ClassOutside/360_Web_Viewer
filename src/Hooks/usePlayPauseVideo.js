import { useSelector } from "react-redux";
import { useEffect } from "react";

const usePlayPauseVideo = (videoRef) => {
  const isPlaying = useSelector((state) => state.video.isPlaying);
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);
};

export default usePlayPauseVideo;
