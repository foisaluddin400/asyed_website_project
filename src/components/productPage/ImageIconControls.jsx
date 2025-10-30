'use client'
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";

const ImageIconControls = ({ selectedTool, onImageSelect, activeObject, onColorChange, canvas }) => {
  const [color, setColor] = useState("#000000");
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  const [svgIcons, setSvgIcons] = useState([]);

  // Dummy SVG data simulating dashboard API response
  const fetchDummySvgIcons = () => {
    return [
      {
        name: "License Plate",
        svgContent: `
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 512 512">
            <g>
              <path d="M376.661 393.213H59.038c-23.899 0-43.342-19.442-43.342-43.341V162.129c0-23.899 19.443-43.342 43.342-43.342h48.425a7.848 7.848 0 1 0 0-15.696H59.038C26.484 103.091 0 129.575 0 162.129v187.743c0 32.554 26.484 59.037 59.038 59.037h317.623a7.848 7.848 0 1 0 0-15.696zM452.962 103.091H138.855a7.848 7.848 0 1 0 0 15.696h314.107c23.899 0 43.342 19.443 43.342 43.342v187.743c0 23.899-19.443 43.341-43.342 43.341h-44.909a7.848 7.848 0 1 0 0 15.696h44.909c32.554 0 59.038-26.484 59.038-59.037V162.129c0-32.554-26.484-59.038-59.038-59.038z" fill="{fillColor}" />
              <path d="M452.963 139.715H59.038c-12.359 0-22.414 10.056-22.414 22.414v187.742c0 12.359 10.055 22.414 22.414 22.414h393.925c12.359 0 22.413-10.055 22.413-22.414V162.129c0-12.359-10.054-22.414-22.413-22.414zm6.716 210.156a6.725 6.725 0 0 1-6.717 6.718H59.038a6.726 6.726 0 0 1-6.718-6.718v-29.906h407.359v29.906zm0-45.602H52.32v-96.538h407.359v96.538zm0-112.234H52.32v-29.906a6.726 6.726 0 0 1 6.718-6.718h393.925c3.703 0 6.716 3.014 6.716 6.718v29.906z" fill="{fillColor}" />
              <path d="M100.322 217.31H81.79l-12.892 80.573h11.626l2.187-14.618H98.25l2.187 14.618h12.777l-12.892-80.573zm-16 55.019 6.101-40.747 6.101 40.747H84.322zM153.154 254.947c5.64-2.647 8.172-7.942 8.172-16.23v-2.878c0-12.431-5.64-18.532-18.762-18.532h-19.107v80.573h19.913c12.661.001 19.222-6.675 19.222-19.106v-6.562c.001-8.517-2.646-14.618-9.438-17.265zm-17.035-26.128h6.101c4.489 0 6.446 2.532 6.446 8.288v4.488c0 6.446-2.878 8.519-7.597 8.519h-4.95v-21.295zm13.813 49.611c0 5.985-2.302 7.942-6.561 7.942h-7.252v-24.748h5.64c5.755 0 8.172 2.302 8.172 9.784v7.022zM211.281 244.473v-7.827c0-12.892-6.446-20.258-18.877-20.258s-18.877 7.367-18.877 20.258v41.898c0 12.892 6.445 20.258 18.877 20.258 12.431 0 18.877-7.367 18.877-20.258V267.84H199.31v11.51c0 5.755-2.532 7.826-6.561 7.826s-6.561-2.071-6.561-7.826v-43.51c0-5.755 2.532-7.942 6.561-7.942s6.561 2.187 6.561 7.942v8.633h11.971zM245.004 251.838h23.021v11.51h-23.021zM325.001 217.309c-1.957 5.41-4.144 10.129-13.929 10.129v8.978h9.785v61.466h12.661v-80.573h-8.517zM365.862 286.371c-.115-.576-.115-1.151-.115-1.727 0-13.237 25.209-22.676 25.209-47.998 0-12.892-6.446-20.258-18.877-20.258s-18.877 7.367-18.877 20.258v7.827h11.97v-8.633c0-5.755 2.532-7.942 6.562-7.942 4.029 0 6.561 1.957 6.561 9.208 0 23.251-25.092 27.165-25.092 50.876v9.899h36.602v-11.51h-23.943zM440.219 238.718v-2.072c0-12.892-6.446-20.258-18.877-20.258s-18.877 7.367-18.877 20.258v4.374h11.97v-5.18c0-5.755 2.533-7.942 6.562-7.942s6.561 1.957 6.561 9.208v4.488c0 6.446-2.878 8.519-7.597 8.519h-4.948v11.51h4.258c5.755 0 8.288 2.764 8.288 10.244v6.331c0 7.136-2.532 9.093-6.561 9.093s-6.562-2.187-6.562-7.942v-7.482h-11.97v6.676c0 12.892 6.446 20.258 18.877 20.258s18.877-7.367 18.877-20.258v-6.331c0-8.172-2.532-14.158-8.863-16.92 6.099-2.531 8.862-7.941 8.862-16.574z" fill="{fillColor}" />
              <circle cx="128.938" cy="173.86" r="8.598" fill="{fillColor}" />
              <circle cx="128.938" cy="338.313" r="8.598" fill="{fillColor}" />
              <circle cx="383.067" cy="173.86" r="8.598" fill="{fillColor}" />
              <circle cx="383.067" cy="338.313" r="8.598" fill="{fillColor}" />
            </g>
          </svg>
        `
      },
      {
        name: "Smiley Face",
        svgContent: `
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 512.001 512.001">
            <g>
              <path d="M256 106c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10z" fill="{fillColor}" />
              <path d="M502 429h-44.316c21.789-12.09 39.955-28.442 52.635-47.451A10 10 0 0 0 502 366h-18.295C502.488 329.148 512 292.215 512 256 512 117.949 394.141 0 256 0 118.087 0 0 117.702 0 256c0 36.215 9.512 73.147 28.295 110H10a10 10 0 0 0-8.32 15.548C14.612 400.943 33.077 417.265 54.17 429H10a10 10 0 0 0-8.32 15.548C28.581 484.893 79.39 512 128.11 512h255.78c48.272 0 99.718-27.406 126.43-67.451A10 10 0 0 0 502 429zM20 256C20 128.075 128.075 20 256 20s236 108.075 236 236c0 35.956-10.413 72.937-30.947 110h-50.016C435.638 332.514 449 294.128 449 256c0-104.617-88.383-193-193-193S63 151.383 63 256c0 38.127 13.362 76.514 37.964 110H50.947C30.413 328.937 20 291.956 20 256zm365.517 110H126.483C98.411 333.285 83 294.384 83 256c0-93.776 79.225-173 173-173s173 79.224 173 173c0 38.384-15.411 77.285-43.483 110zM30.811 385.9h450.425C457.281 411.192 420.06 429 383.89 429H128.11c-35.058 0-72.587-17.152-97.299-43.1zM383.89 492H128.11c-35.058 0-72.587-17.152-97.299-43.1h450.425C457.281 474.192 420.06 492 383.89 492z" fill="{fillColor}" />
              <path d="M298.432 112.11c-5.301-1.567-10.858 1.462-12.423 6.758-1.563 5.296 1.462 10.858 6.759 12.422C347.661 147.502 386 198.784 386 256c0 5.523 4.478 10 10 10s10-4.477 10-10c0-68.631-46.082-125.733-107.568-143.89z" fill="{fillColor}" />
            </g>
          </svg>
        `
      },
      {
        name: "Star",
        svgContent: `
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 512 512">
            <g>
              <path d="M256 0l79.529 161.573 177.827 25.854-128.688 125.413 30.389 177.16L256 416.347 96.943 489.999l30.389-177.16L0 187.427l177.827-25.854z" fill="{fillColor}" />
            </g>
          </svg>
        `
      },
      {
        name: "Heart",
        svgContent: `
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 512 512">
            <g>
              <path d="M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.918 64 162.56 64c36.399 0 70.718 16.742 93.44 43.315C278.282 80.742 312.601 64 349 64c64.641 0 114.56 50.221 114.56 115.095 0 79.515-70.718 143.347-177.836 241.694L256 448z" fill="{fillColor}" />
            </g>
          </svg>
        `
      },
      
    ];
  };

  // Simulate fetching SVGs from dashboard on component mount
  useEffect(() => {
    const fetchedIcons = fetchDummySvgIcons();
    setSvgIcons(fetchedIcons);
    console.log("Fetched SVG icons from dashboard:", fetchedIcons);
  }, []);

  // Convert SVG to data URL for canvas
  const svgToDataUrl = (svgString, fillColor) => {
    const coloredSvg = svgString.replace(/{fillColor}/g, fillColor);
    return `data:image/svg+xml;base64,${btoa(coloredSvg)}`;
  };

  // Convert SVG to PNG for download
  const svgToPng = (svgString, fillColor, callback) => {
    const coloredSvg = svgString.replace(/{fillColor}/g, fillColor);
    const img = new Image();
    const svgBlob = new Blob([coloredSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 100, 100);
      canvas.toBlob((blob) => {
        callback(blob);
        URL.revokeObjectURL(url);
      }, "image/png");
    };
    
    img.src = url;
  };

  // Handle drag start for icons
  const handleDragStart = (e, index) => {
    const dataUrl = svgToDataUrl(svgIcons[index].svgContent, color);
    e.dataTransfer.setData("text/plain", JSON.stringify({
      type: "svgIcon",
      dataUrl,
      name: svgIcons[index].name,
      color,
    }));
    console.log(`Dragging icon: ${svgIcons[index].name} with color ${color}`);
  };

  // Download SVG as PNG
  const downloadSvgAsPng = (index) => {
    svgToPng(svgIcons[index].svgContent, color, (blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${svgIcons[index].name.replace(/\s+/g, '_')}_${color.replace('#', '')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log(`Downloaded ${svgIcons[index].name} as PNG with color ${color}`);
      } else {
        console.error("Failed to generate PNG");
      }
    });
  };

  // Handle icon click - show color picker and add to canvas
  const handleIconClick = (index) => {
    setSelectedIconIndex(index);
    const dataUrl = svgToDataUrl(svgIcons[index].svgContent, color);
    onImageSelect(dataUrl, true);
    console.log(`Icon selected: ${svgIcons[index].name} with color ${color}`);
  };

  // Handle color change
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    if (activeObject?.type === "group") {
      onColorChange(newColor);
    }
  };

  // Render SVG with dynamic color
  const renderSvg = (svgContent, fillColor) => {
    const coloredSvg = svgContent.replace(/{fillColor}/g, fillColor);
    return <div dangerouslySetInnerHTML={{ __html: coloredSvg }} />;
  };

  if (selectedTool !== "imageIcon") return null;

  return (
    <div className="absolute top-0 left-0 bg-white p-4 rounded shadow-lg flex flex-col gap-4 max-w-md max-h-[85vh] overflow-y-auto z-10">
      {/* Color Picker Section - Always visible */}
      <div className="p-3 border-2 border-blue-400 rounded bg-blue-50">
        <label htmlFor="colorPicker" className="block mb-2 font-bold text-lg">
          Pick Icon Color:
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            id="colorPicker"
            value={color}
            onChange={handleColorChange}
            className="w-20 h-10 border-2 border-gray-300 rounded cursor-pointer"
          />
          <span className="text-sm font-mono bg-white px-3 py-1 rounded border">
            {color.toUpperCase()}
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {selectedIconIndex !== null 
            ? `Editing: ${svgIcons[selectedIconIndex]?.name || 'Icon'}`
            : "Select or drag an icon to customize"}
        </p>
      </div>

      {/* Available Icons Section */}
      <div>
        <p className="font-bold text-lg mb-2">Available Icons</p>
        <div className="grid grid-cols-2 gap-3">
          {svgIcons.map((icon, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col items-center border-2 rounded p-3 transition cursor-move ${
                selectedIconIndex === index 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
              }`}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, index)}
              onClick={() => handleIconClick(index)}
            >
              {/* SVG Icon */}
              <div 
                id={`svg-icon-${index}`}
                className="w-[80px] h-[80px] flex items-center justify-center"
              >
                {renderSvg(icon.svgContent, selectedIconIndex === index ? color : '#000000')}
              </div>
              
              {/* Icon Name */}
              <p className="text-xs text-gray-700 font-medium mt-2 text-center">
                {icon.name}
              </p>
              
              {/* Download Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadSvgAsPng(index);
                }}
                className="mt-2 flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition"
                title="Download as PNG"
              >
                <Download size={14} />
                Download PNG
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageIconControls;