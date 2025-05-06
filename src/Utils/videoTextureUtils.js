import * as THREE from "three";
import { handleTextureTransition } from "./textureUtils";

export const createVideoElement = (src, muted) => {
  const video = document.createElement("video");
  document.body.appendChild(video);
  video.src = src;
  video.loop = true;
  video.muted = muted; // Start muted for autoplay
  video.playsInline = true; // Important for mobile
  video.crossOrigin = "anonymous";
  video.style.display = "none";

  // Detect loading errors (invalid source or unsupported video format)
  video.addEventListener("error", () => {
    console.log(
      "Error loading video. The URL might be invalid or unsupported."
    );
  });
  return video;
};

export const createVideoTexture = (video) => {
  const videoTexture = new THREE.VideoTexture(video);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;
  return videoTexture;
};

const loadVideoTexture_DesktopAndVR = (
  transitionMaterialRef,
  currentTextureRef,
  video,
  videoTexture,
  dispatch,
  setDuration,
  textureTransitionDuration,
  setTransitionInProgress
) => {
  video.addEventListener("loadedmetadata", () => {
    handleTextureTransition(
      dispatch,
      setTransitionInProgress,
      transitionMaterialRef,
      currentTextureRef,
      videoTexture,
      textureTransitionDuration
    );
    dispatch(setDuration(video.duration));
    video.pause();
  });
  video.load();
};

// Modify captureFirstFrame to accept necessary props
const captureFirstFrame = (video, ctx, canvas) => {
  return new Promise((resolve) => {
    video.onseeked = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnailUrl = canvas.toDataURL();
      const placeholderTexture = new THREE.TextureLoader().load(thumbnailUrl);
      resolve(placeholderTexture);
    };
    video.currentTime = 0; // Trigger the video seek to the first frame
  });
};

export const handleTimeUpdate = (videoElement, dispatch, setCurrentTime) => {
  dispatch(setCurrentTime(videoElement.currentTime.toFixed(0)));
};

export const videoTextureCleanup = (videoRef, dispatch, setIsVideo) => {
  if (videoRef.current) {
    videoRef.current.pause();
    videoRef.current.src = "";
    if (document.body.contains(videoRef.current)) {
      document.body.removeChild(videoRef.current);
    }
    videoRef.current = null;
  }
  dispatch(setIsVideo(false));
};

const loadVideoTexture_MobileDevices = (
  transitionMaterialRef,
  currentTextureRef,
  video,
  videoTexture,
  dispatch,
  setDuration,
  textureTransitionDuration,
  setTransitionInProgress
) => {
  video.addEventListener("loadedmetadata", () => {
    // Create the canvas and context to capture the first frame
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    //Supposed to be used for easy loading first frame of video, not sure if it works.
    canvas.width = 160;
    canvas.height = 90;

    // Call captureFirstFrame with video, ctx, and canvas
    captureFirstFrame(video, ctx, canvas)
      .then((placeholderTexture) => {
        // Handle texture transition with the captured placeholder
        handleTextureTransition(
          dispatch,
          setTransitionInProgress,
          transitionMaterialRef,
          currentTextureRef,
          placeholderTexture,
          textureTransitionDuration
        );
        return video.play();
      })
      .then(() => {
        // Once the video starts playing, pause it and update texture
        video.pause();
        video.currentTime = 0;
        videoTexture.needsUpdate = true;
        handleTextureTransition(
          dispatch,
          setTransitionInProgress,
          transitionMaterialRef,
          currentTextureRef,
          videoTexture,
          textureTransitionDuration
        );
        dispatch(setDuration(video.duration));
      })
      .catch(() => {
        // Handle error or fallback if first frame can't be captured
        video.currentTime = 0;
        const checkFrame = () => {
          if (video.readyState >= 2) {
            videoTexture.needsUpdate = true;
            handleTextureTransition(
              dispatch,
              setTransitionInProgress,
              transitionMaterialRef,
              currentTextureRef,
              videoTexture,
              textureTransitionDuration
            );
            dispatch(setDuration(video.duration));
          } else {
            requestAnimationFrame(checkFrame);
          }
        };
        checkFrame();
      });
  });

  video.load(); // Load the video
};

export const loadVideoTexture = (
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
) => {
  dispatch(setIsVideo(true));
  const video = createVideoElement(mediaLocation, muted);
  videoRef.current = video;
  const videoTexture = createVideoTexture(video);

  video.addEventListener("timeupdate", () =>
    handleTimeUpdate(video, dispatch, setCurrentTime)
  );

  if (isMobile) {
    loadVideoTexture_MobileDevices(
      transitionMaterialRef,
      currentTextureRef,
      video,
      videoTexture,
      dispatch,
      setDuration,
      textureTransitionDuration,
      setTransitionInProgress,
      muted,
      setMuted
    );
  } else {
    loadVideoTexture_DesktopAndVR(
      transitionMaterialRef,
      currentTextureRef,
      video,
      videoTexture,
      dispatch,
      setDuration,
      textureTransitionDuration,
      setTransitionInProgress,
      muted,
      setMuted
    );
  }
};
