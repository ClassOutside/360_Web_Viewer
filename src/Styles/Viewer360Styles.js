const styles = {
  controlsContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
    padding: "20px",
    position: "absolute",
    bottom: 0,
    transition: "background 0.3s ease-in-out",
  },
  extraControls: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  leftControls: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  rightControls: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  persistentControls: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto", // always push persistent controls to the right
    gap: "10px",
  },
  fullscreenButton: {
    background: "transparent", // Remove the background
    color: "black", // Set the icon color to black
    border: "none", // Remove border
    // width: 40,
    // height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  vrButton: {
    background: "transparent", // Remove the background
    border: "none", // Remove border
    cursor: "pointer",
    padding: 0, // No extra padding
  },
};

export default styles;
