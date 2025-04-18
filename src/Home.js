import { useState, useEffect, useRef } from "react";
import {
  tetrad
} from "./Utils"
import "./App.css";
import tinycolor from "tinycolor2";
import { useNavigate } from "react-router-dom";
import { FaRandom } from "react-icons/fa";

function Home() {
  const [hex, setHex] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const navigate = useNavigate();
  const complementary = tinycolor(hex).complement().toHexString();
  const buttonTextColor = tinycolor.mostReadable(complementary, ["#ffffff", "#000000"]).toHexString();
  const inputRef = useRef(null);

  const [tetradColors, settetradColors] = useState([]);
  useEffect(() => {
    if (tinycolor(hex).isValid()) {
      document.body.style.backgroundColor = hex;
      setTextColor(tinycolor.mostReadable(hex, ["#ffffff", "#000000"]).toHexString());
      settetradColors(tetrad(hex));
    }
  }, [hex]);

  const handleInputFocus = () => {
    inputRef.current.select()
  };

  const generateRandomHex = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  };

  useEffect(() => {
    const randomHex = generateRandomHex();
    setHex(randomHex);
    document.body.style.backgroundColor = randomHex;
    setTextColor(tinycolor.mostReadable(randomHex, ["#ffffff", "#000000"]).toHexString());
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.trim().toUpperCase();
    const formattedValue = value.replace('#', '').replace(/[^0-9A-F]/g, "").slice(0, 6);
    setHex(`#${formattedValue}`);
  };

  const handleRandomColor = () => {
    const randomHex = generateRandomHex();
    setHex(randomHex);
  };

  const handleSubmit = () => {
    if (tinycolor(hex).isValid()) {
      navigate(`/color/${hex.replace("#", "")}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="container-home">

      <div className="logo">
        <div className="square"
          style={{
            background: `linear-gradient(45deg, ${tetradColors[3]?.hex}, ${tetradColors[1]?.hex})`,
          }}
        >
        </div>
        <div className="text">
          <div
            className="color"
            style={{ color: textColor }}
          >
            COLOR
          </div>
          <div
            className="toolkit"
            style={{ color: textColor }}
          >
            toolkit
          </div>
        </div>
      </div>

      <div className="block">
          <input
            className="home-input"
            type="text"
            minLength="4"
            maxLength="7"
            placeholder={hex}
            ref={inputRef}
            onChange={handleChange}
            value={hex}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
          />
        <button
          className="home-button"
          style={{ backgroundColor: complementary, color: buttonTextColor }}
          onClick={handleSubmit}
        >
          Generate
        </button>
        <p className="description" style={{ color: textColor }}>
          Enter the HEX color code in the field above to generate tints & shades, convert formats, check contrast, and create automatic palettes.
        </p>

        <button
          className="random-button"
          style={{ color: textColor }}
          onClick={handleRandomColor}
        >
          <FaRandom /> random color
        </button>
      </div>
    </div>
  );
}

export default Home;
