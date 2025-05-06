import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTime,
  setDuration,
  setIsVideo,
  setMuted,
} from "../Slices/videoSlice";
import { textureCache } from "./usePreloadTextures";
import {
  loadVideoTexture,
  videoTextureCleanup,
} from "../Utils/videoTextureUtils";
import { loadImageTexture } from "../Utils/textureUtils";
import FileTypes from "../Constants/FileTypes";
import { setTransitionInProgress } from "../Slices/destinationSlice";

const useTextureLoader = (mediaLocation) => {
  const videoRef = useRef(null);
  const currentTextureRef = useRef(null);
  const transitionMaterialRef = useRef(null);
  const isMobile = useSelector((state) => state.device.isMobile);
  const muted = useSelector((state) => state.video.muted);
  const config = useSelector((state) => state.configuration.configuration);
  const { textureTransitionDuration, lowResTag } = config;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!mediaLocation) return;

    if (mediaLocation.endsWith(FileTypes.MP4)) {
      loadVideoTexture(
        dispatch,
        setIsVideo,
        videoRef,
        isMobile,
        setCurrentTime,
        transitionMaterialRef,
        currentTextureRef,
        setDuration,
        mediaLocation,
        textureTransitionDuration,
        setTransitionInProgress,
        muted,
        setMuted
      );
    } else {
      loadImageTexture(
        dispatch,
        setIsVideo,
        mediaLocation,
        textureCache,
        transitionMaterialRef,
        currentTextureRef,
        textureTransitionDuration,
        setTransitionInProgress,
        lowResTag
      );
    }

    return () => videoTextureCleanup(videoRef, dispatch, setIsVideo);
  }, [mediaLocation]);

  return { videoRef, transitionMaterialRef };
};

export default useTextureLoader;
