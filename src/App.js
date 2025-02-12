import { useState } from "react";
import { generateShades, generateTints } from "./Utils";
import "./App.css";

function App() {
  const [hex, setHex] = useState("");
  const [tints, setTints] = useState([]);
  const [shades, setShades] = useState([]);

  const handleGenerateColors = () => {
    setTints(generateTints(hex));
    setShades(generateShades(hex));
  };

  return (
    <div className="view">
      <div className="header">
        <h1>Tints and Shades</h1>
        <h2>Generator</h2>
      </div>
      <div className="form">
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          placeholder="#hexcode" />

        <button onClick={handleGenerateColors}>Generate</button>
      </div>

      <hr className="hr"></hr>

      <div className="container">

        <div className="color-box">
          <div className="tints">
            {tints.map((color, index) => (
              <div className="level" key={index} style={{ backgroundColor: color, padding: "10px" }}>
                {color}
              </div>
            ))}
          </div>
        </div>

        <div className="color-box">
          <div className="shades">
            {shades.map((color, index) => (
              <div className="level" key={index} style={{ backgroundColor: color, padding: "10px" }}>
                {color}
              </div>
            ))}
          </div>
        </div>


      </div>
        <footer>
          <p>&copy; 2025 Tints and Shades Generator. Criado por Gustavo Almeida.</p>
        </footer>
    </div>
  );
}

export default App;
