'use client'
import React, { useEffect, useState } from "react";
import * as fabric from "fabric";

const TextControls = ({
  activeObject,
  canvas,
  setShadowOffsetX,
  setShadowOffsetY,
  setShadowBlur,
  setBorderWidth,
}) => {
  const [shadowOffsetX, setLocalShadowOffsetX] = useState(
    activeObject?.shadow?.offsetX || 0
  );
  const [shadowOffsetY, setLocalShadowOffsetY] = useState(
    activeObject?.shadow?.offsetY || 0
  );
  const [shadowBlur, setLocalShadowBlur] = useState(
    activeObject?.shadow?.blur || 0
  );
  const [borderWidth, setLocalBorderWidth] = useState(
    activeObject?.strokeWidth || 0
  );

  useEffect(() => {
    if (activeObject?.type === "textbox") {
      setLocalShadowOffsetX(activeObject.shadow?.offsetX || 0);
      setLocalShadowOffsetY(activeObject.shadow?.offsetY || 0);
      setLocalShadowBlur(activeObject.shadow?.blur || 0);
      setLocalBorderWidth(activeObject.strokeWidth || 0);
    }
  }, [activeObject]);

  const changeTextColor = (color) => {
    if (activeObject?.type === "textbox") {
      activeObject.set("fill", color);
      canvas.renderAll();
    }
  };

  const changeTextSize = (size) => {
    if (activeObject?.type === "textbox") {
      activeObject.set("fontSize", size);
      canvas.renderAll();
    }
  };

  const changeFontFamily = (font) => {
    if (activeObject?.type === "textbox") {
      activeObject.set("fontFamily", font);
      setTimeout(() => canvas.renderAll(), 100); // Delay to ensure font loads
    }
  };

  const toggleBold = () => {
    if (activeObject?.type === "textbox") {
      activeObject.set(
        "fontWeight",
        activeObject.fontWeight === "bold" ? "normal" : "bold"
      );
      canvas.renderAll();
    }
  };

  const toggleItalic = () => {
    if (activeObject?.type === "textbox") {
      activeObject.set(
        "fontStyle",
        activeObject.fontStyle === "italic" ? "normal" : "italic"
      );
      canvas.renderAll();
    }
  };

  const changeTextShadow = (property, value) => {
    if (activeObject?.type === "textbox") {
      const currentShadow = activeObject.shadow || {
        color: "rgba(0,0,0,0)",
        offsetX: 0,
        offsetY: 0,
        blur: 0,
      };
      const newShadow = { ...currentShadow, [property]: value };
      activeObject.set("shadow", new fabric.Shadow(newShadow));
      canvas.renderAll();
      if (property === "offsetX") setShadowOffsetX(value);
      else if (property === "offsetY") setShadowOffsetY(value);
      else if (property === "blur") setShadowBlur(value);
    }
  };

  const changeTextBorderColor = (color) => {
    if (activeObject?.type === "textbox") {
      activeObject.set("stroke", color);
      canvas.renderAll();
    }
  };

  const changeTextBorderWidth = (width) => {
    if (activeObject?.type === "textbox") {
      activeObject.set("strokeWidth", width);
      setBorderWidth(width);
      canvas.renderAll();
    }
  };

  // Comprehensive font list (~200 fonts)
  const fontOptions = [
    // Web-safe Fonts
    { value: "Arial", label: "Arial", category: "Sans Serif" },
    { value: "Helvetica", label: "Helvetica", category: "Sans Serif" },
    { value: "Verdana", label: "Verdana", category: "Sans Serif" },
    { value: "Trebuchet MS", label: "Trebuchet MS", category: "Sans Serif" },
    { value: "Gill Sans", label: "Gill Sans", category: "Sans Serif" },
    { value: "Century Gothic", label: "Century Gothic", category: "Sans Serif" },
    { value: "Arial Black", label: "Arial Black", category: "Sans Serif" },
    { value: "Tahoma", label: "Tahoma", category: "Sans Serif" },
    { value: "Times New Roman", label: "Times New Roman", category: "Serif" },
    { value: "Georgia", label: "Georgia", category: "Serif" },
    { value: "Palatino Linotype", label: "Palatino Linotype", category: "Serif" },
    { value: "Bookman Old Style", label: "Bookman Old Style", category: "Serif" },
    { value: "Garamond", label: "Garamond", category: "Serif" },
    { value: "Courier New", label: "Courier New", category: "Monospace" },
    { value: "Lucida Console", label: "Lucida Console", category: "Monospace" },
    { value: "Comic Sans MS", label: "Comic Sans MS", category: "Handwriting" },
    { value: "Impact", label: "Impact", category: "Display" },
    // Generic Font Families
    { value: "sans-serif", label: "Sans Serif", category: "Sans Serif" },
    { value: "serif", label: "Serif", category: "Serif" },
    { value: "monospace", label: "Monospace", category: "Monospace" },
    { value: "cursive", label: "Cursive", category: "Handwriting" },
    { value: "fantasy", label: "Fantasy", category: "Display" },
    // Google Fonts - Sans Serif
    { value: "Roboto", label: "Roboto", category: "Sans Serif" },
    { value: "Open Sans", label: "Open Sans", category: "Sans Serif" },
    { value: "Lato", label: "Lato", category: "Sans Serif" },
    { value: "Montserrat", label: "Montserrat", category: "Sans Serif" },
    { value: "Poppins", label: "Poppins", category: "Sans Serif" },
    { value: "Raleway", label: "Raleway", category: "Sans Serif" },
    { value: "Source Sans Pro", label: "Source Sans Pro", category: "Sans Serif" },
    { value: "PT Sans", label: "PT Sans", category: "Sans Serif" },
    { value: "Ubuntu", label: "Ubuntu", category: "Sans Serif" },
    { value: "Noto Sans", label: "Noto Sans", category: "Sans Serif" },
    { value: "Rubik", label: "Rubik", category: "Sans Serif" },
    { value: "Inter", label: "Inter", category: "Sans Serif" },
    { value: "Fira Sans", label: "Fira Sans", category: "Sans Serif" },
    { value: "Work Sans", label: "Work Sans", category: "Sans Serif" },
    { value: "Nunito", label: "Nunito", category: "Sans Serif" },
    { value: "Quicksand", label: "Quicksand", category: "Sans Serif" },
    { value: "Muli", label: "Muli", category: "Sans Serif" },
    { value: "Karla", label: "Karla", category: "Sans Serif" },
    { value: "Barlow", label: "Barlow", category: "Sans Serif" },
    { value: "Overpass", label: "Overpass", category: "Sans Serif" },
    { value: "Catamaran", label: "Catamaran", category: "Sans Serif" },
    { value: "Josefin Sans", label: "Josefin Sans", category: "Sans Serif" },
    { value: "Arimo", label: "Arimo", category: "Sans Serif" },
    { value: "Cabin", label: "Cabin", category: "Sans Serif" },
    { value: "Varela Round", label: "Varela Round", category: "Sans Serif" },
    { value: "IBM Plex Sans", label: "IBM Plex Sans", category: "Sans Serif" },
    { value: "Dosis", label: "Dosis", category: "Sans Serif" },
    { value: "Oxygen", label: "Oxygen", category: "Sans Serif" },
    { value: "Hind", label: "Hind", category: "Sans Serif" },
    { value: "Asap", label: "Asap", category: "Sans Serif" },
    { value: "Prompt", label: "Prompt", category: "Sans Serif" },
    { value: "Manrope", label: "Manrope", category: "Sans Serif" },
    { value: "Public Sans", label: "Public Sans", category: "Sans Serif" },
    { value: "DM Sans", label: "DM Sans", category: "Sans Serif" },
    { value: "Jost", label: "Jost", category: "Sans Serif" },
    { value: "Archivo", label: "Archivo", category: "Sans Serif" },
    { value: "Exo", label: "Exo", category: "Sans Serif" },
    { value: "Chivo", label: "Chivo", category: "Sans Serif" },
    { value: "Heebo", label: "Heebo", category: "Sans Serif" },
    { value: "Mukta", label: "Mukta", category: "Sans Serif" },
    { value: "Titillium Web", label: "Titillium Web", category: "Sans Serif" },
    { value: "Yantramanav", label: "Yantramanav", category: "Sans Serif" },
    { value: "Red Hat Display", label: "Red Hat Display", category: "Sans Serif" },
    { value: "Mulish", label: "Mulish", category: "Sans Serif" },
    { value: "Space Grotesk", label: "Space Grotesk", category: "Sans Serif" },
    { value: "Urbanist", label: "Urbanist", category: "Sans Serif" },
    { value: "Outfit", label: "Outfit", category: "Sans Serif" },
    { value: "Figtree", label: "Figtree", category: "Sans Serif" },
    { value: "Lexend", label: "Lexend", category: "Sans Serif" },
    { value: "Sora", label: "Sora", category: "Sans Serif" },
    // Google Fonts - Serif
    { value: "Merriweather", label: "Merriweather", category: "Serif" },
    { value: "Playfair Display", label: "Playfair Display", category: "Serif" },
    { value: "Lora", label: "Lora", category: "Serif" },
    { value: "Spectral", label: "Spectral", category: "Serif" },
    { value: "Crimson Text", label: "Crimson Text", category: "Serif" },
    { value: "Bitter", label: "Bitter", category: "Serif" },
    { value: "Cardo", label: "Cardo", category: "Serif" },
    { value: "Vollkorn", label: "Vollkorn", category: "Serif" },
    { value: "EB Garamond", label: "EB Garamond", category: "Serif" },
    { value: "Noto Serif", label: "Noto Serif", category: "Serif" },
    { value: "Source Serif Pro", label: "Source Serif Pro", category: "Serif" },
    { value: "Libre Baskerville", label: "Libre Baskerville", category: "Serif" },
    { value: "Domine", label: "Domine", category: "Serif" },
    { value: "Alegreya", label: "Alegreya", category: "Serif" },
    { value: "Cormorant", label: "Cormorant", category: "Serif" },
    { value: "Old Standard TT", label: "Old Standard TT", category: "Serif" },
    { value: "Baskervville", label: "Baskervville", category: "Serif" },
    { value: "Arvo", label: "Arvo", category: "Serif" },
    { value: "Zilla Slab", label: "Zilla Slab", category: "Serif" },
    { value: "Literata", label: "Literata", category: "Serif" },
    { value: "Gentium Book Basic", label: "Gentium Book Basic", category: "Serif" },
    { value: "Ibarra Real Nova", label: "Ibarra Real Nova", category: "Serif" },
    { value: "Sorts Mill Goudy", label: "Sorts Mill Goudy", category: "Serif" },
    { value: "Neuton", label: "Neuton", category: "Serif" },
    { value: "Aleo", label: "Aleo", category: "Serif" },
    { value: "Prata", label: "Prata", category: "Serif" },
    { value: "Cinzel", label: "Cinzel", category: "Serif" },
    { value: "Vidaloka", label: "Vidaloka", category: "Serif" },
    { value: "Yeseva One", label: "Yeseva One", category: "Serif" },
    { value: "Faustina", label: "Faustina", category: "Serif" },
    { value: "Rosarivo", label: "Rosarivo", category: "Serif" },
    { value: "Fanwood Text", label: "Fanwood Text", category: "Serif" },
    { value: "IM Fell English", label: "IM Fell English", category: "Serif" },
    { value: "Crimson Pro", label: "Crimson Pro", category: "Serif" },
    { value: "Vesper Libre", label: "Vesper Libre", category: "Serif" },
    // Google Fonts - Display
    { value: "Bangers", label: "Bangers", category: "Display" },
    { value: "Bebas Neue", label: "Bebas Neue", category: "Display" },
    { value: "Anton", label: "Anton", category: "Display" },
    { value: "Abril Fatface", label: "Abril Fatface", category: "Display" },
    { value: "Lobster", label: "Lobster", category: "Display" },
    { value: "Oswald", label: "Oswald", category: "Display" },
    { value: "Alfa Slab One", label: "Alfa Slab One", category: "Display" },
    { value: "Black Ops One", label: "Black Ops One", category: "Display" },
    { value: "Righteous", label: "Righteous", category: "Display" },
    { value: "Patua One", label: "Patua One", category: "Display" },
    { value: "Archivo Black", label: "Archivo Black", category: "Display" },
    { value: "Creepster", label: "Creepster", category: "Display" },
    { value: "Fredericka the Great", label: "Fredericka the Great", category: "Display" },
    { value: "Special Elite", label: "Special Elite", category: "Display" },
    { value: "Monoton", label: "Monoton", category: "Display" },
    { value: "Bungee", label: "Bungee", category: "Display" },
    { value: "Changa One", label: "Changa One", category: "Display" },
    { value: "Fjalla One", label: "Fjalla One", category: "Display" },
    { value: "Passion One", label: "Passion One", category: "Display" },
    { value: "Russo One", label: "Russo One", category: "Display" },
    { value: "Teko", label: "Teko", category: "Display" },
    { value: "Staatliches", label: "Staatliches", category: "Display" },
    { value: "Squada One", label: "Squada One", category: "Display" },
    { value: "Paytone One", label: "Paytone One", category: "Display" },
    { value: "Ultra", label: "Ultra", category: "Display" },
    { value: "Bowlby One SC", label: "Bowlby One SC", category: "Display" },
    // Google Fonts - Handwriting
    { value: "Pacifico", label: "Pacifico", category: "Handwriting" },
    { value: "Amatic SC", label: "Amatic SC", category: "Handwriting" },
    { value: "Shadows Into Light", label: "Shadows Into Light", category: "Handwriting" },
    { value: "Dancing Script", label: "Dancing Script", category: "Handwriting" },
    { value: "Indie Flower", label: "Indie Flower", category: "Handwriting" },
    { value: "Caveat", label: "Caveat", category: "Handwriting" },
    { value: "Permanent Marker", label: "Permanent Marker", category: "Handwriting" },
    { value: "Rock Salt", label: "Rock Salt", category: "Handwriting" },
    { value: "Covered By Your Grace", label: "Covered By Your Grace", category: "Handwriting" },
    { value: "Great Vibes", label: "Great Vibes", category: "Handwriting" },
    { value: "Sacramento", label: "Sacramento", category: "Handwriting" },
    { value: "Kaushan Script", label: "Kaushan Script", category: "Handwriting" },
    { value: "Satisfy", label: "Satisfy", category: "Handwriting" },
    { value: "Zeyada", label: "Zeyada", category: "Handwriting" },
    { value: "Tangerine", label: "Tangerine", category: "Handwriting" },
    { value: "Allura", label: "Allura", category: "Handwriting" },
    { value: "Parisienne", label: "Parisienne", category: "Handwriting" },
    { value: "Berkshire Swash", label: "Berkshire Swash", category: "Handwriting" },
    { value: "Homemade Apple", label: "Homemade Apple", category: "Handwriting" },
    { value: "Cedarville Cursive", label: "Cedarville Cursive", category: "Handwriting" },
    { value: "Reenie Beanie", label: "Reenie Beanie", category: "Handwriting" },
    { value: "Annie Use Your Telescope", label: "Annie Use Your Telescope", category: "Handwriting" },
    { value: "Coming Soon", label: "Coming Soon", category: "Handwriting" },
    { value: "Just Another Hand", label: "Just Another Hand", category: "Handwriting" },
    { value: "Handlee", label: "Handlee", category: "Handwriting" },
    { value: "Gochi Hand", label: "Gochi Hand", category: "Handwriting" },
    { value: "Schoolbell", label: "Schoolbell", category: "Handwriting" },
    { value: "Crafty Girls", label: "Crafty Girls", category: "Handwriting" },
    { value: "Kalam", label: "Kalam", category: "Handwriting" },
    { value: "Neucha", label: "Neucha", category: "Handwriting" },
    { value: "Patrick Hand", label: "Patrick Hand", category: "Handwriting" },
    { value: "Sue Ellen Francisco", label: "Sue Ellen Francisco", category: "Handwriting" },
    { value: "Waiting for the Sunrise", label: "Waiting for the Sunrise", category: "Handwriting" },
    { value: "Marck Script", label: "Marck Script", category: "Handwriting" },
    // Google Fonts - Monospace
    { value: "Inconsolata", label: "Inconsolata", category: "Monospace" },
    { value: "Source Code Pro", label: "Source Code Pro", category: "Monospace" },
    { value: "Fira Code", label: "Fira Code", category: "Monospace" },
    { value: "Roboto Mono", label: "Roboto Mono", category: "Monospace" },
    { value: "Space Mono", label: "Space Mono", category: "Monospace" },
    { value: "IBM Plex Mono", label: "IBM Plex Mono", category: "Monospace" },
    { value: "Ubuntu Mono", label: "Ubuntu Mono", category: "Monospace" },
    { value: "Cousine", label: "Cousine", category: "Monospace" },
    { value: "JetBrains Mono", label: "JetBrains Mono", category: "Monospace" },
    { value: "Anonymous Pro", label: "Anonymous Pro", category: "Monospace" },
    { value: "Overpass Mono", label: "Overpass Mono", category: "Monospace" },
    { value: "Victor Mono", label: "Victor Mono", category: "Monospace" },
    { value: "PT Mono", label: "PT Mono", category: "Monospace" },
    { value: "Cutive Mono", label: "Cutive Mono", category: "Monospace" },
    { value: "Share Tech Mono", label: "Share Tech Mono", category: "Monospace" },
  ];

  return (
    <div className="absolute top-0 w-[350px] left-0 bg-white p-4 rounded flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          onClick={toggleBold}
          className="py-1 px-3 bg-gray-300 rounded font-bold"
        >
          B
        </button>
        <button
          onClick={toggleItalic}
          className="py-1 px-3 bg-gray-300 rounded italic"
        >
          I
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Font:</label>
          <select
            value={activeObject?.fontFamily || "Arial"}
            onChange={(e) => changeFontFamily(e.target.value)}
            className="border p-1 mt-1 w-full max-h-96 overflow-y-auto"
          >
            <optgroup label="Sans Serif">
              {fontOptions
                .filter((font) => font.category === "Sans Serif")
                .map((font) => (
                  <option
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Serif">
              {fontOptions
                .filter((font) => font.category === "Serif")
                .map((font) => (
                  <option
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Display">
              {fontOptions
                .filter((font) => font.category === "Display")
                .map((font) => (
                  <option
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Handwriting">
              {fontOptions
                .filter((font) => font.category === "Handwriting")
                .map((font) => (
                  <option
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Monospace">
              {fontOptions
                .filter((font) => font.category === "Monospace")
                .map((font) => (
                  <option
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
        <div>
          <label>Size:</label>
          <input
            type="number"
            value={activeObject?.fontSize || 24}
            onChange={(e) => changeTextSize(parseInt(e.target.value))}
            className="border p-1 mt-1 w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 border p-2">
        <div>
          <label>Text Color:</label>
          <input
            type="color"
            value={activeObject?.fill || "#000000"}
            onChange={(e) => changeTextColor(e.target.value)}
            className="border p-1 mt-1 w-full"
          />
        </div>
        <div>
          <label>Shadow Color:</label>
          <input
            type="color"
            value={activeObject?.shadow?.color || "rgba(0,0,0,0)"}
            onChange={(e) => changeTextShadow("color", e.target.value)}
            className="border p-1 mt-1 w-full"
          />
        </div>
      </div>
      <div className="border p-2">
        <div>
          <label>Shadow Offset X: {shadowOffsetX.toFixed(1)}</label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={shadowOffsetX}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              setLocalShadowOffsetX(value);
              setShadowOffsetX(value);
              changeTextShadow("offsetX", value);
            }}
            className="w-full mt-1"
          />
        </div>
        <div>
          <label>Shadow Offset Y: {shadowOffsetY.toFixed(1)}</label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={shadowOffsetY}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              setLocalShadowOffsetY(value);
              setShadowOffsetY(value);
              changeTextShadow("offsetY", value);
            }}
            className="w-full mt-1"
          />
        </div>
        <div>
          <label>Shadow Blur: {shadowBlur.toFixed(1)}</label>
          <input
  type="range"
  min="0"
  max="20"
  step="0.1"
  value={shadowBlur}
  onChange={(e) => {
    const value = parseFloat(e.target.value) || 0;
    setLocalShadowBlur(value);
    setShadowBlur(value);
    changeTextShadow("blur", value);
  }}
  className="w-full mt-4 h-2 rounded-full bg-gray-300 accent-blue-500 slider-thumb"
/>

        </div>
      </div>
      <div className="border p-2">
        <div>
          <label>Border Color:</label>
          <input
            type="color"
            value={activeObject?.stroke || "#000000"}
            onChange={(e) => changeTextBorderColor(e.target.value)}
            className="border p-1 mt-1 w-full"
          />
        </div>
        <div>
          <label>Border Width: {borderWidth.toFixed(1)}</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={borderWidth}
            onChange={(e) => {
              const value = parseFloat(e.target.value) || 0;
              setLocalBorderWidth(value);
              setBorderWidth(value);
              changeTextBorderWidth(value);
            }}
            className="w-full mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TextControls;