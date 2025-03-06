import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tinycolor from "tinycolor2";
import { rgb, hsl, cmyk, copyToClipboard, triad, tetrad } from "./Utils"
import { FaRegCopy } from "react-icons/fa6";
import "./App.css";

function ColorPage() {
    const { colorHex } = useParams();
    const mainColor = `#${colorHex}`;
    const theColor = tinycolor(mainColor);

    const [textColor, setTextColor] = useState("black");
    const complementary = tinycolor(colorHex).complement().toHexString();
    const triadColors = triad(mainColor);
    const tetradColors = tetrad(mainColor);

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
        </div>
            <div className="container">
                <h3>Code convertion</h3>
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

                <h3>Triad Combination</h3>
                <div className="combination-group">
                    {triadColors.map((colorObj) => (
                        <p
                            key={colorObj.id}
                            onClick={() => copyToClipboard(colorObj.hex)}
                            className="convertion"
                            style={{ backgroundColor: colorObj.hex, color: textColor }}
                        >
                            {colorObj.hex} <FaRegCopy style={{ color: textColor }} className="copy-icon" />
                        </p>
                    ))}
                </div>
               
                <h3>Tetrad Combination</h3>
                <div className="combination-group">
                    {tetradColors.map((colorObj) => (
                        <p
                            key={colorObj.id}
                            onClick={() => copyToClipboard(colorObj.hex)}
                            className="convertion"
                            style={{ backgroundColor: colorObj.hex, color: textColor }}
                        >
                            {colorObj.hex} <FaRegCopy style={{ color: textColor }} className="copy-icon" />
                        </p>
                    ))}
                </div>
               
                <h3>Shades</h3>
                <div className="combination-group">
                    {/* {shadesColor.map((colorObj) => (
                        <p
                            key={colorObj.id}
                            onClick={() => copyToClipboard(colorObj.hex)}
                            className="convertion"
                            style={{ backgroundColor: colorObj.hex, color: textColor }}
                        >
                            {colorObj.hex} <FaRegCopy style={{ color: textColor }} className="copy-icon" />
                        </p>
                    ))} */}
                </div>

            </div>
        </>
    );
}

export default ColorPage;
