import { createRoot } from "react-dom/client";
import Viewer360Frame from "./Components/Viewer360Frame.jsx";

// Import the JSON file (one level above the src folder)
import configData from "../defaults.json"; // Importing defaults.json

// Wrap the Viewer360Frame in a div with a red background
createRoot(document.getElementById("root")).render(
  <div
    style={{
      width: "80vw", // Default width
      height: "60vh", // Default height
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "red",
      // padding: "20px",
    }}
  >
    <Viewer360Frame config={configData} />
  </div>
);
