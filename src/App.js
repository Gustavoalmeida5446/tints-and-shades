import { useState } from "react";
import { generateShades, generateTints, convertColor, getColorConversions } from "./Utils";
import "./App.css";
import { FaRegCopy } from "react-icons/fa6";
import tinycolor from "tinycolor2";

function App() {
  const [hex, setHex] = useState("");
  const [tints, setTints] = useState([]);
  const [shades, setShades] = useState([]);
  const [convertedColor, setConvertedColor] = useState(null);
  const [isDarkColor, setIsDarkColor] = useState(false);

  const handleGenerateColors = () => {
    const colorWithHash = hex.startsWith("#") ? hex : "#" + hex;
    document.body.style.backgroundColor = colorWithHash;

    setTints(generateTints(hex));
    setShades(generateShades(hex));
    setConvertedColor(convertColor(hex));
    
    setIsDarkColor(tinycolor(hex).isLight() === false); 
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGenerateColors();
    }
  };

  const colorConversions = convertedColor ? getColorConversions(convertedColor) : {};

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
          onKeyPress={handleKeyPress}
          placeholder="#hexcode" />
        <button onClick={handleGenerateColors}>Generate</button>
      </div>

      {convertedColor && (
        <div className={`converted-values ${isDarkColor ? "converted-values-dark" : ""}`}>
          <h3>Color Information</h3>
          <p onClick={() => copyToClipboard(colorConversions.rgb)}>{colorConversions.rgb} <FaRegCopy className="copy" /></p>
          <p onClick={() => copyToClipboard(colorConversions.hsl)}>{colorConversions.hsl} <FaRegCopy className="copy" /></p>
          <p onClick={() => copyToClipboard(colorConversions.hsv)}>{colorConversions.hsv} <FaRegCopy className="copy" /></p>
          <p onClick={() => copyToClipboard(colorConversions.cmyk)}>{colorConversions.cmyk} <FaRegCopy className="copy" /></p>
        </div>
      )}

      <hr className="hr"></hr>

      <div className="container">
        <div className="color-box">
          <div className="tints">
            {tints.map((color, index) => (
              <div className="level" key={index} onClick={() => copyToClipboard(color)} style={{ backgroundColor: color, padding: "10px" }}>
                {color} <FaRegCopy className="copy" />
              </div>
            ))}
          </div>
        </div>

        <div className="color-box">
          <div className="shades">
            {shades.map((color, index) => (
              <div className="level" key={index} onClick={() => copyToClipboard(color)} style={{ backgroundColor: color, padding: "10px" }}>
                {color} <FaRegCopy className="copy" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; {new Date().getFullYear()} Tints and Shades Generator. Criado por Gustavo Almeida.</p>
      </footer>
    </div>
  );
}

export default App;
