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

    const [textColor, setTextColor] = useState("black");
    const [copyMessage, setCopyMessage] = useState("");
    const complementary = tinycolor(colorHex).spin(180).toString();

    useEffect(() => {
        if (theColor.isValid()) {
            const darkColor = theColor.isDark();
            setTextColor(darkColor ? "white" : "black");
        }
    }, [mainColor]);

    useEffect(() => {
        if (theColor.isValid()) {
            document.body.style.backgroundColor = mainColor;
        }
    }, [mainColor]);

    useEffect(() => {
        if (copyMessage) {
            const timer = setTimeout(() => {
                setCopyMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [copyMessage]);

    return (
        <div className="container">
            <h1 style={{ color: textColor }} >{mainColor}</h1>
            <div className="convertions-group">
                <p
                    onClick={() => copyToClipboard(rgb(theColor), setCopyMessage)}
                    className="convertion">
                    {rgb(theColor)}
                    <FaRegCopy className="copy-icon" />
                </p>

                <p
                    onClick={() => copyToClipboard(hsl(theColor), setCopyMessage)}
                    className="convertion">
                    {hsl(theColor)}
                    <FaRegCopy className="copy-icon" />
                </p>

                <p
                    onClick={() => copyToClipboard(cmyk(theColor), setCopyMessage)}
                    className="convertion">
                    {cmyk(theColor)}
                    <FaRegCopy className="copy-icon" />
                </p>

                <p
                    onClick={() => copyToClipboard(complementary, setCopyMessage)}
                    className="convertion" 
                    style={{ backgroundColor: complementary, color: textColor }}
                >
                    Complementary: {complementary}
                    <FaRegCopy className="copy-icon" />
                </p>

            </div>

        </div>
    );
}

export default ColorPage;
