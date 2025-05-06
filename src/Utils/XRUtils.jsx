import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
  useXRControllerButtonEvent,
  useXRInputSourceStateContext,
  useXRInputSourceState,
  DefaultXRController,
  createXRStore,
} from "@react-three/xr";
import { useDispatch, useSelector } from "react-redux";
import { setVrMenuVisible } from "../Slices/controlCardSlice";
import { setNewMenuPositionAndRotation } from "./vrMenuUtils";
import TourTypes from "../Constants/TourTypes";
import { handleNext, handlePrevious } from "../Utils/slideShowUtils";
import { setThumbStickTriggered } from "../Slices/deviceSlice";

export const rightHand = () => {
  const dispatch = useDispatch();
  const vrMenuVisible = useSelector((state) => state.controlCard.vrMenuVisible);
  const buttonDownRef = useRef(false);
  const camera = useThree((state) => state.camera);
  const state = useXRInputSourceStateContext("controller");
  const isVideo = useSelector((state) => state.video.isVideo);
  const tourType = useSelector((state) => state.destinations.tourType);
  const destinations = useSelector((state) => state.destinations.destinations);
  const currentDestination = useSelector(
    (state) => state.destinations.loadedDestination
  );
  const thumbStickTriggered = useSelector(
    (state) => state.device.thumbStickTriggered
  );

  if (tourType === TourTypes.SLIDESHOW) {
    const readerRight = useXRInputSourceState("controller", "right");

    useFrame((state, delta) => {
      const rightThumbstickState =
        readerRight?.gamepad?.["xr-standard-thumbstick"];

      const { xAxis } = rightThumbstickState;

      if (xAxis >= -0.5 && xAxis <= 0.5) {
        dispatch(setThumbStickTriggered(false));
      } else if (!thumbStickTriggered) {
        if (xAxis > 0.5) {
          dispatch(setThumbStickTriggered(true));
          handleNext(dispatch, destinations, currentDestination);
        } else if (xAxis < -0.5) {
          dispatch(setThumbStickTriggered(true));
          handlePrevious(dispatch, destinations, currentDestination);
        }
      }
    });
  }

  useXRControllerButtonEvent(state, "a-button", (buttonState) => {
    if (buttonState === "pressed" && !buttonDownRef.current && isVideo) {
      buttonDownRef.current = true;
      dispatch(setVrMenuVisible(!vrMenuVisible));
      setNewMenuPositionAndRotation(camera, dispatch);
    } else {
      buttonDownRef.current = false;
    }
  });

  return (
    <DefaultXRController
      model={{ renderOrder: 3 }}
      rayPointer={{
        cursorModel: {
          size: 1, // Adjust this value to change the cursor size
          opacity: 0.8,
        },
      }}
    />
  );
};

export const store = createXRStore({
  controller: {
    right: rightHand,
  },
});

export const enterVRSession = async () => {
  await store.enterVR();
};
