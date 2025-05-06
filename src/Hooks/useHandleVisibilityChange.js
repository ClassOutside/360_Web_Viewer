import { useEffect } from "react";
import {
  handleVisibilityChange,
  handleFocus,
  handleResume,
  handleVRDisplayActivate,
} from "../Utils/textureUtils";

export const useHandleVisibilityChange = (transitionMaterialRef) => {
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      handleVisibilityChange(transitionMaterialRef);
    });
    window.addEventListener("focus", () => {
      handleFocus(transitionMaterialRef);
    });
    document.addEventListener("resume", () => {
      handleResume(transitionMaterialRef);
    });
    document.addEventListener("vrdisplayactivate", () => {
      handleVRDisplayActivate(transitionMaterialRef);
    });

    return () => {
      document.removeEventListener("visibilitychange", () => {
        handleVisibilityChange(transitionMaterialRef);
      });
      window.removeEventListener("focus", () => {
        handleFocus(transitionMaterialRef);
      });
      document.removeEventListener("resume", () => {
        handleResume(transitionMaterialRef);
      });
      document.removeEventListener("vrdisplayactivate", () => {
        handleVRDisplayActivate(transitionMaterialRef);
      });
    };
  }, []);
};
