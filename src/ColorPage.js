import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tinycolor from "tinycolor2";
import { rgb, hsl, cmyk, copyToClipboard } from "./Utils"
import { FaRegCopy } from "react-icons/fa6";
import "./App.css";

function ColorPage() {
    const { colorHex } = useParams();
    const mainColor = `#${colorHex}`;
    const theColor = tinycolor(mainColor);
    const key = Math.floor(Math.random()*9999);

    const [textColor, setTextColor] = useState("black");
    const complementary = tinycolor(colorHex).spin(180).toString();
    const analogousColors = tinycolor(mainColor).analogous();
    const triadColors = tinycolor(mainColor).triad();
    const tetradColors = tinycolor(mainColor).tetrad();

    useEffect(() => {
        if (theColor.isValid()) {
            const bestColor = tinycolor.mostReadable(mainColor, ["#000000", "#FFFFFF"]).toHexString();
            setTextColor(bestColor);
        }
    }, [mainColor]);

    useEffect(() => {
        if (theColor.isValid()) {
            document.body.style.backgroundColor = mainColor;
        }
    }, [mainColor]);

    return (
        <div className="container">
            <h1 style={{ color: textColor }} >{mainColor}</h1>
            <div className="convertions-group">
                <p
                    onClick={() => copyToClipboard(rgb(theColor))}
                    className="convertion">
                    {rgb(theColor)}
                    <FaRegCopy className="copy-icon" />
                </p>

                <p
                    onClick={() => copyToClipboard(hsl(theColor))}
                    className="convertion">
                    {hsl(theColor)}
                    <FaRegCopy className="copy-icon" />
                </p>

                <p
                    onClick={() => copyToClipboard(cmyk(theColor))}
                    className="convertion">
                    {cmyk(theColor)}
                    <FaRegCopy className="copy-icon" />
                </p>

                <p
                    onClick={() => copyToClipboard(complementary)}
                    className="convertion"
                    style={{ backgroundColor: complementary, color: textColor }}
                >
                    Complementary: {complementary}
                    <FaRegCopy style={{ color: textColor }} className="copy-icon" />
                </p>

            </div>
            <h3 style={{ color: textColor }}>Triad Combination</h3>
            <div className="combination-group">
                {triadColors.map((color, index) => (

                    <p
                    key={key}
                    onClick={() => copyToClipboard(color.toHexString())}
                        className="combination"
                        style={{ backgroundColor: color.toHexString(), color: textColor }}
                    >
                        {color.toHexString()}
                        <FaRegCopy style={{ color: textColor }} className="copy-icon" />
                    </p>

                ))}
            </div>

            <h3 style={{ color: textColor }}>Analogous Combination</h3>
            <div className="combination-group">
                {analogousColors.map((color, index) => (

                    <p
                        key={key}
                        onClick={() => copyToClipboard(color.toHexString())}
                        className="combination"
                        style={{ backgroundColor: color.toHexString(), color: textColor }}
                    >
                        {color.toHexString()}
                        <FaRegCopy style={{ color: textColor }} className="copy-icon" />
                    </p>

                ))}
            </div>
            <h3 style={{ color: textColor }}>Tetrad Combination</h3>
            <div className="combination-group">
                {tetradColors.map((color, index) => (

                    <p
                        key={key}
                        onClick={() => copyToClipboard(color.toHexString())}
                        className="combination"
                        style={{ backgroundColor: color.toHexString(), color: textColor }}
                    >
                        {color.toHexString()}
                        <FaRegCopy style={{ color: textColor }} className="copy-icon" />
                    </p>

                ))}
            </div>

        </div>
    );
}

export default ColorPage;
