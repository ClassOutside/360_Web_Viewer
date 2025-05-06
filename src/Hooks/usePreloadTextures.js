import { useEffect } from "react";
import * as THREE from "three";
import { useSelector } from "react-redux";
import HotspotTypes from "../Constants/HotspotTypes";
import FileTypes from "../Constants/FileTypes";
import TourTypes from "../Constants/TourTypes";

const textureCache = new Map();

const usePreloadTextures = (currentDestination, destinations) => {
  const tourType = useSelector((state) => state.destinations.tourType);
  const config = useSelector((state) => state.configuration.configuration);
  const { lowResTag } = config;

  useEffect(() => {
    if (tourType == TourTypes.TOUR && !currentDestination?.HOTSPOTS) return;

    const preloadTextures = async () => {
      let connectedDestIds = null;

      if (tourType == TourTypes.TOUR) {
        connectedDestIds = currentDestination.HOTSPOTS.filter(
          (hotspot) => hotspot.type === HotspotTypes.TOUR
        ).map((hotspot) => hotspot.destinationID);
      } else if (tourType == TourTypes.SLIDESHOW) {
        connectedDestIds = [
          currentDestination.destinationID + 1,
          currentDestination.destinationID - 1,
        ];
      } else {
        console.log("TourType not defined");
        return;
      }

      const texturesToPreload = destinations
        .filter((dest) => connectedDestIds.includes(dest.destinationID))
        .map((dest) => {
          if (dest.imageLocation.endsWith(FileTypes.MP4)) return null; // Skip videos

          // insert _low-res before the jpg to download low res version if available
          const lowResLocation = dest.imageLocation.replace(
            /(\.jpg)$/,
            lowResTag
          );
          return lowResLocation;
        })
        .filter(Boolean);

      await Promise.all(
        texturesToPreload.map(async (location) => {
          if (!textureCache.has(location)) {
            const texture = await new Promise((resolve, reject) => {
              new THREE.TextureLoader().load(
                location,
                (texture) => {
                  texture.encoding = THREE.sRGBEncoding;
                  resolve(texture);
                },
                undefined,
                reject
              );
            });
            textureCache.set(location, texture);
          }
        })
      );
    };

    preloadTextures().catch(console.error);
  }, [currentDestination]);

  return textureCache;
};

export { usePreloadTextures, textureCache };
