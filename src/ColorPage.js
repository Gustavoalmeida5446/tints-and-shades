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
    tints,
    isAccessible,
    contrastRatio
} from "./Utils"
import { FaRegCopy, FaCheck, FaXmark } from "react-icons/fa6";
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
    const [contrastColor, setContrastColor] = useState("#000000");
    const theContrastColor = tinycolor(`#${contrastColor}`);


    useEffect(() => {
        if (theColor.isValid()) {
            const bestColor = tinycolor.mostReadable(mainColor, ["#000000", "#FFFFFF"]).toHexString();
            setTextColor(bestColor);
        } else {
            navigate("/");
        }
    }, [mainColor, theColor, navigate]);

    useEffect(() => {
        document.body.style.backgroundColor = "#e7e7e7";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let inputColor = e.target.elements.contrastInput.value;

        if (inputColor.startsWith("#")) {
            inputColor = inputColor.slice(1);
        }
        if (tinycolor(`#${inputColor}`).isValid()) {
            setContrastColor(inputColor);
            console.log("Contrast Color Updated:", inputColor);
        } else {
            alert("Please enter a valid hex color (ex: #ffffff).");
        }
    };

    return (
        <>
            <div className="header" style={{ backgroundColor: mainColor }}>
                <h1 style={{ color: textColor }} >{mainColor}</h1>

            </div>
            <div className="top-info" style={{ backgroundColor: mainColor }}>
                <div id="spacer" style={{ height: 120 }} />
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

                <h3>Complementary</h3>
                <div className="combination-group">
                    <p
                        className="code"
                        style={{ backgroundColor: complementary, color: buttonTextColor }}
                    >
                        <span
                            onClick={() => navigate(`/color/${complementary.slice(1)}`)}
                        >

                            {complementary}
                        </span>
                        <FaRegCopy
                            style={{ color: buttonTextColor }}
                            className="copy-icon"
                            onClick={() => copyToClipboard(complementary)}
                        />
                    </p>
                </div>

                <h3>Tints</h3>
                <div className="combination-group">
                    {tintsColors.map((colorObj) => {
                        const tintsTextColor = tinycolor.mostReadable(colorObj.hex, ["#000000", "#FFFFFF"]).toHexString();

                        return (
                            <p
                                key={colorObj.id}
                                className="code"
                                style={{ backgroundColor: colorObj.hex, color: tintsTextColor }}
                            >
                                <span
                                    onClick={() => navigate(`/color/${colorObj.hex.slice(1)}`)}
                                >
                                    {colorObj.hex}
                                </span>
                                <FaRegCopy
                                    style={{ color: tintsTextColor }}
                                    onClick={() => copyToClipboard(colorObj.hex)}
                                    className="copy-icon"
                                />
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
                                className="code"
                                style={{ backgroundColor: colorObj.hex, color: shadesTextColor }}
                            >
                                <span
                                    onClick={() => navigate(`/color/${colorObj.hex.slice(1)}`)}
                                >
                                    {colorObj.hex}
                                </span>
                                <FaRegCopy
                                    style={{ color: shadesTextColor }}
                                    onClick={() => copyToClipboard(colorObj.hex)}
                                    className="copy-icon"
                                />
                            </p>
                        );
                    })}
                </div>

                <h3>Triad Combination</h3>
                <div className="combination-group">
                    {triadColors.map((colorObj) => {
                        const triadTextColor = tinycolor.mostReadable(colorObj.hex, ["#000000", "#FFFFFF"]).toHexString();
                        return (
                            <p
                                key={colorObj.id}
                                className="code"
                                style={{ backgroundColor: colorObj.hex, color: triadTextColor }}
                            >
                                <span
                                    onClick={() => navigate(`/color/${colorObj.hex.slice(1)}`)}
                                >
                                    {colorObj.hex}
                                </span>
                                <FaRegCopy
                                    style={{ color: triadTextColor }}
                                    onClick={() => copyToClipboard(colorObj.hex)}
                                    className="copy-icon"
                                />
                            </p>
                        );
                    })}
                </div>

                <h3>Tetrad Combination</h3>
                <div className="combination-group">
                    {tetradColors.map((colorObj) => {
                        const tetradTextColor = tinycolor.mostReadable(colorObj.hex, ["#000000", "#FFFFFF"]).toHexString();
                        return (
                            <p
                                key={colorObj.id}
                                className="code"
                                style={{ backgroundColor: colorObj.hex, color: tetradTextColor }}
                            >
                                <span
                                    onClick={() => navigate(`/color/${colorObj.hex.slice(1)}`)}
                                >
                                    {colorObj.hex}
                                </span>
                                <FaRegCopy
                                    style={{ color: tetradTextColor }}
                                    className="copy-icon"
                                    onClick={() => copyToClipboard(colorObj.hex)}
                                />
                            </p>
                        );
                    })}
                </div>

                <h3>Contrast</h3>
                <div className="contrast-group">

                    <div
                        className="contrast-info"
                        style={{ backgroundColor: mainColor }}
                    >
                        <h4 style={{ color: theContrastColor }}>Contrast Checker</h4>
                        <form onSubmit={handleSubmit}>
                            <input
                                id="contrastInput"
                                className="contrast-input"
                                type="text"
                                minLength="4"
                                maxLength="7"
                                placeholder="#000000"
                            />
                            <button
                                type="submit"
                                className="contrast-button"
                                style={{ backgroundColor: textColor, color: mainColor }}
                            >
                                Check
                            </button>
                        </form>

                        <div style={{ color: theContrastColor }}>
                            <p>Contrast Ratio: <strong>{contrastRatio(contrastColor, mainColor).toFixed(2)}</strong></p>
                            <p>
                                AA: {isAccessible(contrastColor, mainColor, "AA") ? (
                                    <span className="contrast-text-pass"><FaCheck /> Pass</span>
                                ) : (
                                    <span className="contrast-text-fail"><FaXmark /> Fail</span>
                                )}
                            </p>
                            <p>
                                AAA: {isAccessible(contrastColor, mainColor, "AAA") ? (
                                    <span className="contrast-text-pass"><FaCheck /> Pass</span>
                                ) : (
                                    <span className="contrast-text-fail"><FaXmark /> Fail</span>
                                )}
                            </p>
                        </div>
                        {/* <button
    type="button"
    className="contrast-button"
    style={{ backgroundColor: theContrastColor, color: mainColor }}
    onClick={alert.bind(this, `Contrast Color: ${theContrastColor}`)}
>
    Swap Colors
</button> */}
                    </div>

                </div >

            </div >

            <footer className="footer" style={{ backgroundColor: mainColor, color: textColor }}>
                <div className="footer-content">
                    <button className="back-button" style={{ backgroundColor: "white", color: "black" }} onClick={() => navigate("/")}>
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
