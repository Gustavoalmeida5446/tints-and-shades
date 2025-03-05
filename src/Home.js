import { useState, useEffect } from "react";
import Logo from "./assets/logo.svg";
import "./App.css"
import tinycolor from "tinycolor2";
import { useNavigate } from "react-router-dom";

function Home() {
  const [hex, setHex] = useState("");
  const [isDarkColor, setIsDarkColor] = useState(false);
  const navigate = useNavigate();

  const generateRandomHex = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
  };
  useEffect(() => {
    const randomHex = generateRandomHex();
    setHex(randomHex);
    document.body.style.backgroundColor = randomHex;
    const isDark = tinycolor(randomHex).isDark();
    setIsDarkColor(isDark);
  }, []);

  const handleChange = (e) => {
    let value = e.target.value.trim();

    if (!value.startsWith("#") && value.length > 0) {
      value = `#${value}`;
    }

    const isValid = /^#?[0-9A-Fa-f]{0,6}$/.test(value);
    if (isValid) {
      setHex(value);
    }
  };

  useEffect(() => {
    if (tinycolor(hex).isValid()) {
      document.body.style.backgroundColor = hex;
      const isDark = tinycolor(hex).isDark();
      setIsDarkColor(isDark);
    }
  }, [hex]);

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
    <div className="container">
      <img src={Logo} alt="Logo" />
      <div className="block">
        <input
          value={hex}
          placeholder="#3498db"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>Generate</button>
        <p className="description"
          style={{ color: isDarkColor ? "#ffffff" : "#000000", }}        >
          Enter the HEX color code in the field above to generate tints & shades, convert formats, check contrast, and create automatic palettes.
        </p>
      </div>
    </div>
  );
}

export default Home;
