import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tinycolor from "tinycolor2";
import {
    rgb,
    hsl,
    cmyk,
    copyToClipboard,
    triad,
    tetrad,
    shades,
    tints
} from "./Utils"
import { FaRegCopy } from "react-icons/fa6";
import "./App.css";

function ColorPage() {
    const { colorHex } = useParams();
    const mainColor = `#${colorHex}`;
    const theColor = tinycolor(`#${colorHex}`);
    const navigate = useNavigate();

    const [textColor, setTextColor] = useState("black");
    const triadColors = triad(mainColor);
    const tetradColors = tetrad(mainColor);
    const shadesColors = shades(mainColor);
    const tintsColors = tints(mainColor);
    const complementary = tinycolor(colorHex).complement().toHexString();
    const buttonTextColor = tinycolor.mostReadable(complementary, ["#ffffff", "#000000"]).toHexString();

    useEffect(() => {
        if (theColor.isValid()) {
            const bestColor = tinycolor.mostReadable(mainColor, ["#000000", "#FFFFFF"]).toHexString();
            setTextColor(bestColor);
        }
    }, [mainColor]);

    document.body.style.backgroundColor = "#e7e7e7";

    return (
        <>
            <div className="header" style={{ backgroundColor: mainColor }}>
                <h1 style={{ color: textColor }} >{mainColor}</h1>
                <div className="convertions-group" style={{ color: textColor }}>
                    <p
                        onClick={() => copyToClipboard(rgb(theColor))}
                        className="convertion">
                        {rgb(theColor)}
                        <FaRegCopy className="copy-icon" style={{ color: textColor }} />
                    </p>

                    <p
                        onClick={() => copyToClipboard(hsl(theColor))}
                        className="convertion">
                        {hsl(theColor)}
                        <FaRegCopy className="copy-icon" style={{ color: textColor }} />
                    </p>

                    <p
                        onClick={() => copyToClipboard(cmyk(theColor))}
                        className="convertion">
                        {cmyk(theColor)}
                        <FaRegCopy className="copy-icon" style={{ color: textColor }} />
                    </p>

                </div>
            </div>
            <div className="container">
                <h3>Tints</h3>
                <div className="combination-group">
                    {tintsColors.map((colorObj) => {
                        const tintsTextColor = tinycolor.mostReadable(colorObj.hex, ["#000000", "#FFFFFF"]).toHexString();

                        return (
                            <p
                                key={colorObj.id}
                                onClick={() => copyToClipboard(colorObj.hex)}
                                className="code"
                                style={{ backgroundColor: colorObj.hex, color: tintsTextColor }}
                            >
                                {colorObj.hex} <FaRegCopy style={{ color: tintsTextColor }} className="copy-icon" />
                            </p>
                        );
                    })}
                </div>

                <h3>Shades</h3>
                <div className="combination-group">
                    {shadesColors.map((colorObj) => {
                        const shadesTextColor = tinycolor.mostReadable(colorObj.hex, ["#000000", "#FFFFFF"]).toHexString();
                        return (
                            <p
                                key={colorObj.id}
                                onClick={() => copyToClipboard(colorObj.hex)}
                                className="code"
                                style={{ backgroundColor: colorObj.hex, color: shadesTextColor }}
                            >
                                {colorObj.hex} <FaRegCopy style={{ color: shadesTextColor }} className="copy-icon" />
                            </p>
                        );
                    })}
                </div>

                <h3>Triad Combination + Complementary Color</h3>
                <div className="combination-group">
                    {triadColors.map((colorObj) => {
                        const triadTextColor = tinycolor.mostReadable(colorObj.hex, ["#000000", "#FFFFFF"]).toHexString();
                        return (
                            <p
                                key={colorObj.id}
                                onClick={() => copyToClipboard(colorObj.hex)}
                                className="code"
                                style={{ backgroundColor: colorObj.hex, color: triadTextColor }}
                            >
                                {colorObj.hex} <FaRegCopy style={{ color: triadTextColor }} className="copy-icon" />
                            </p>
                        );
                    })}
                            <p
                                onClick={() => copyToClipboard(complementary)}
                                className="code"
                                style={{ backgroundColor: complementary, color: buttonTextColor }}
                            >
                                Complementary: {complementary} <FaRegCopy style={{ color: buttonTextColor }} className="copy-icon" />
                            </p>

                </div>

                <h3>Tetrad Combination</h3>
                <div className="combination-group">
                    {tetradColors.map((colorObj) => {
                        const tetradTextColor = tinycolor.mostReadable(colorObj.hex, ["#000000", "#FFFFFF"]).toHexString();
                        return (
                            <p
                                key={colorObj.id}
                                onClick={() => copyToClipboard(colorObj.hex)}
                                className="code"
                                style={{ backgroundColor: colorObj.hex, color: tetradTextColor }}
                            >
                                {colorObj.hex} <FaRegCopy style={{ color: tetradTextColor }} className="copy-icon" />
                            </p>
                        );
                    })}
                </div>

            </div>

            <footer className="footer" style={{ backgroundColor: mainColor, color: textColor }}>
                <div className="footer-content">
                    <button className="back-button" style={{ backgroundColor: complementary, color: buttonTextColor }} onClick={() => navigate("/")}>
                        Generate Another Color
                    </button>
                    <div className="info">
                        <p>© 2025 Gustavo Almeida - <a href="https://github.com/gustavoalmeida5446" style={{ color: textColor }} target="_blank" rel="noopener noreferrer">Visit my GitHub</a>
                        </p>
                    </div>
                </div>
            </footer>

        </>
    );
}

export default ColorPage;
