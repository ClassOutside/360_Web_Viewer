import React, { useEffect, useCallback } from "react";
import { Slider } from "../../EditedRepos/uikit/packages/kits/apfel/src/slider";
import { Container, Text, Image } from "@react-three/uikit";
import { useSelector, useDispatch } from "react-redux";
import {
  formatTime,
  handleScrubberDragStart,
  handleScrubberDragEnd,
  handlePlayPause,
} from "../Utils/videoControlsUtils";
import {
  setCurrentTime,
  toggleMute,
  setSliderValue,
  pause,
  play,
  setStartPlayingAfterSeek,
} from "../Slices/videoSlice";
import {
  handlePointerOverCursorChange,
  handlePointerOutCursorChange,
} from "../Utils/pointerUtils";
import { useThree } from "@react-three/fiber";

const XRVideoControls = () => {
  const dispatch = useDispatch();
  const { gl } = useThree();
  const {
    currentTime,
    duration,
    dragging,
    isPlaying,
    muted,
    sliderValue,
    startPlayingAfterSeek,
  } = useSelector((state) => state.video);
  const isMobile = useSelector((state) => state.device.isMobile);

  useEffect(() => {
    if (!dragging && !startPlayingAfterSeek) {
      dispatch(setSliderValue(currentTime));
    } else if (!dragging && startPlayingAfterSeek) {
      dispatch(play());
      dispatch(setStartPlayingAfterSeek(false));
    } else if (dragging) {
      if (isPlaying) {
        dispatch(pause());
        dispatch(setCurrentTime(sliderValue));
        dispatch(setStartPlayingAfterSeek(true));
      }
    }
  }, [currentTime, dragging, dispatch, startPlayingAfterSeek]);

  const onValueChange = useCallback(
    async (value) => {
      dispatch(setSliderValue(value));
      await new Promise((resolve) => setTimeout(resolve, 0)); // without this, handleTimeUpdate seems to run and mess up the pause play
      dispatch(setCurrentTime(value));
    },
    [dispatch]
  );

  const handlePlayButtonClick = useCallback(() => {
    handlePlayPause(dispatch);
  }, [dispatch]);

  const handleMuteButtonClick = useCallback(() => {
    dispatch(toggleMute());
  }, [dispatch]);

  const handleSliderPointerDown = useCallback(
    (e) => {
      const currentSliderValue = sliderValue;
      const currentIsPlaying = isPlaying;
      handleScrubberDragStart(dispatch, currentSliderValue, currentIsPlaying);
    },
    [sliderValue, isPlaying, dispatch]
  );

  const handleSliderPointerUp = useCallback(
    (e) => {
      handleScrubberDragEnd(dispatch, startPlayingAfterSeek);
    },
    [startPlayingAfterSeek, dispatch]
  );

  return (
    <Container
      flexDirection="row"
      alignItems="center"
      gapColumn={isMobile ? 12 : 24} // Adjust gap size for mobile
      height="100%"
      width={"100%"}
    >
      <Container flexDirection="column" justifyContent="center">
        <Image
          src={isPlaying ? "/icons/pause.png" : "/icons/play.png"}
          width={isMobile ? 24 : 32}
          height={isMobile ? 24 : 32}
          onClick={handlePlayButtonClick}
          onPointerOver={() => handlePointerOverCursorChange(gl)}
          onPointerOut={() => handlePointerOutCursorChange(gl)}
        />
      </Container>

      <Container
        flexDirection="column"
        flexGrow={1}
        width="auto"
        height="0"
        justifyContent="center" // Ensures centering
      >
        {/* Container with empty text to space / style the slider equally above and below. */}
        <Container
          flexDirection="row"
          justifyContent="space-between"
          marginBottom={isMobile ? 8 : 8} // Adjust margin for mobile
        >
          <Text fontSize={isMobile ? 10 : 12}> </Text>
          <Text fontSize={isMobile ? 10 : 12}> </Text>
        </Container>
        <Slider
          key={`slider-`}
          size={isMobile ? "xs" : "sm"}
          min={0}
          max={duration}
          value={sliderValue}
          onPointerDown={handleSliderPointerDown}
          onPointerUp={handleSliderPointerUp}
          onValueChange={onValueChange}
          onPointerOver={() => handlePointerOverCursorChange(gl)}
          onPointerOut={() => handlePointerOutCursorChange(gl)}
        />
        <Container
          flexDirection="row"
          justifyContent="space-between"
          marginTop={isMobile ? 8 : 8}
        >
          <Text fontSize={isMobile ? 10 : 12}>{formatTime(sliderValue)}</Text>
          <Text fontSize={isMobile ? 10 : 12}>{formatTime(duration)}</Text>
        </Container>
      </Container>

      <Container flexDirection="column" justifyContent="center">
        <Image
          src={muted ? "/icons/muted.png" : "/icons/unmuted.png"}
          width={isMobile ? 24 : 32}
          height={isMobile ? 24 : 32}
          onClick={handleMuteButtonClick}
          onPointerOver={() => handlePointerOverCursorChange(gl)}
          onPointerOut={() => handlePointerOutCursorChange(gl)}
        />
      </Container>
    </Container>
  );
};

export default XRVideoControls;
