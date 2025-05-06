import { Controller } from "@react-spring/core";
import * as THREE from "three";

const loadTextureAsync = (textureUrl, textureCache) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const texture = new THREE.Texture(image);
      texture.needsUpdate = true;
      textureCache.set(textureUrl, texture);
      resolve(texture); // Resolves the Promise with the texture when loaded
    };
    image.onerror = reject; // Reject the Promise if there's an error loading the image
    image.src = textureUrl;
  });
};

export const handleTextureTransition = (
  dispatch,
  setTransitionInProgress,
  transitionMaterialRef,
  currentTextureRef,
  newTexture,
  duration = 1,
  isVR = false // currently unused
) => {
  if (!transitionMaterialRef.current) return;
  const material = transitionMaterialRef.current;

  // If isVR is true, immediately swap the texture without transition
  if (isVR) {
    // material.uniforms.currentTexture.value = newTexture;
    // material.uniforms.nextTexture.value = newTexture;
    // material.uniforms.progress.value = 0;
    // material.needsUpdate = true;
    // newTexture.needsUpdate = true;
    // return;
  } else {
    if (!material.uniforms.currentTexture.value) {
      material.uniforms.currentTexture.value = newTexture;
      material.uniforms.nextTexture.value = newTexture;
      material.uniforms.progress.value = 0;
      material.needsUpdate = true;
      newTexture.needsUpdate = true;
      return;
    }

    currentTextureRef.current = material.uniforms.currentTexture.value;
    material.uniforms.nextTexture.value = newTexture;
    material.needsUpdate = true;

    // Dispatch that the transition is starting
    dispatch(setTransitionInProgress(true));

    const ctrl = new Controller({ progress: material.uniforms.progress.value });
    ctrl.start({
      progress: 1,
      config: { duration: duration * 1000, easing: (t) => t },
      onChange: ({ value }) => {
        material.uniforms.progress.value = value.progress;
        material.needsUpdate = true;
      },
      onRest: () => {
        material.uniforms.currentTexture.value = newTexture;
        material.uniforms.progress.value = 0;
        material.needsUpdate = true;
        if (
          currentTextureRef.current &&
          !(currentTextureRef.current instanceof THREE.VideoTexture)
        ) {
          currentTextureRef.current.dispose();
        }
        // Dispatch that the transition has finished
        dispatch(setTransitionInProgress(false));
      },
    });
  }
};

export const forceTextureUpdate = (transitionMaterialRef) => {
  if (transitionMaterialRef.current) {
    transitionMaterialRef.current.needsUpdate = true;
    if (transitionMaterialRef.current.uniforms.currentTexture.value) {
      transitionMaterialRef.current.uniforms.currentTexture.value.needsUpdate = true;
    }
    if (transitionMaterialRef.current.uniforms.nextTexture.value) {
      transitionMaterialRef.current.uniforms.nextTexture.value.needsUpdate = true;
    }
  }
};

export const handleVisibilityChange = (transitionMaterialRef) => {
  if (!document.hidden) {
    forceTextureUpdate(transitionMaterialRef);
  }
};

export const handleFocus = (transitionMaterialRef) => {
  forceTextureUpdate(transitionMaterialRef);
};

export const handleResume = (transitionMaterialRef) => {
  forceTextureUpdate(transitionMaterialRef);
};

export const handleVRDisplayActivate = (transitionMaterialRef) => {
  forceTextureUpdate(transitionMaterialRef);
};

export const loadImageTexture = async (
  dispatch,
  setIsVideo,
  mediaLocation,
  textureCache,
  transitionMaterialRef,
  currentTextureRef,
  textureTransitionDuration,
  setTransitionInProgress,
  lowResTag
) => {
  dispatch(setIsVideo(false));
  const lowResLocation = mediaLocation.replace(/(\.jpg)$/, lowResTag);

  if (textureCache.has(lowResLocation)) {
    handleTextureTransition(
      dispatch,
      setTransitionInProgress,
      transitionMaterialRef,
      currentTextureRef,
      textureCache.get(lowResLocation),
      textureTransitionDuration
    );

    if (!textureCache.has(mediaLocation)) {
      const highResTexture = await loadTextureAsync(
        mediaLocation,
        textureCache
      );
      handleTextureTransition(
        dispatch,
        setTransitionInProgress,
        transitionMaterialRef,
        currentTextureRef,
        highResTexture,
        textureTransitionDuration
      );
    } else {
      handleTextureTransition(
        dispatch,
        setTransitionInProgress,
        transitionMaterialRef,
        currentTextureRef,
        textureCache.get(mediaLocation),
        textureTransitionDuration
      );
    }
  } else {
    const lowResTexture = await loadTextureAsync(lowResLocation, textureCache);
    handleTextureTransition(
      dispatch,
      setTransitionInProgress,
      transitionMaterialRef,
      currentTextureRef,
      lowResTexture,
      textureTransitionDuration
    );

    const highResTexture = await loadTextureAsync(mediaLocation, textureCache);
    handleTextureTransition(
      dispatch,
      setTransitionInProgress,
      transitionMaterialRef,
      currentTextureRef,
      highResTexture,
      textureTransitionDuration
    );
  }
};

export const loadIconTexture = (materialRef, textureLocation) => {
  if (materialRef.current) {
    const loader = new THREE.TextureLoader();
    loader.load(
      textureLocation,
      (texture) => {
        if (materialRef.current) {
          materialRef.current.map = texture;
          materialRef.current.needsUpdate = true;
        }
      },
      undefined,
      (error) => {
        console.error("Error loading texture:", error);
      }
    );
  }
};
