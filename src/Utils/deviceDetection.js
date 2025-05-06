// src/Utils/deviceDetection.js
export const detectMobile = () => {
  const userAgent = navigator.userAgent;
  // console.log("User Agent:", userAgent); // Log the user agent to the console
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
};

export const detectCanFullScreen = () => {
  const userAgent = navigator.userAgent;
  // console.log("test", !/iPhone/i.test(userAgent), "User Agent:", userAgent); // Log the user agent to the console
  return !/iPhone/i.test(userAgent);
};
