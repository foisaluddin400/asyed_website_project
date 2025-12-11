'use client'
import React, { useState, useEffect } from "react";
import * as fabric from "fabric";

const DrawingControls = ({ canvas, selectedTool, setSelectedTool }) => {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [drawingShadowColor, setDrawingShadowColor] = useState("#000000");
  const [drawingLineWidth, setDrawingLineWidth] = useState(1);
  const [drawingShadowWidth, setDrawingShadowWidth] = useState(0);
  const [drawingShadowOffset, setDrawingShadowOffset] = useState(0);
  const [drawingBrushType, setDrawingBrushType] = useState("Pencil");

  useEffect(() => {
    if (canvas && selectedTool === "drawing" && canvas.getContext()) {
      canvas.isDrawingMode = isDrawingMode;
      setupBrush(drawingBrushType);
    } else if (canvas) {
      canvas.isDrawingMode = false;
    }
  }, [canvas, selectedTool, isDrawingMode, drawingBrushType]);

  // Drawing brush setup
  const setupBrush = (brushType) => {
    if (!canvas || !canvas.getContext()) {
      console.error("Cannot setup brush: Canvas context unavailable");
      return;
    }

    let brush;
    if (brushType === "erase") {
      // Use PencilBrush with destination-out composite mode for erasing
      brush = new fabric.PencilBrush(canvas);
      brush.width = parseInt(drawingLineWidth, 10) || 1;
      
      // Set up eraser mode using canvas composite operation
      const originalComposite = canvas.contextTop?.globalCompositeOperation;
      if (canvas.contextTop) {
        canvas.contextTop.globalCompositeOperation = 'destination-out';
      }
      
      // Store original composite to restore later
      brush._originalComposite = originalComposite;
    } else if (brushType === "hline") {
      brush = new fabric.PatternBrush(canvas);
      brush.getPatternSrc = function () {
        const patternCanvas = document.createElement("canvas");
        patternCanvas.width = patternCanvas.height = 10;
        const ctx = patternCanvas.getContext("2d");
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();
        return patternCanvas;
      };
    } else if (brushType === "vline") {
      brush = new fabric.PatternBrush(canvas);
      brush.getPatternSrc = function () {
        const patternCanvas = document.createElement("canvas");
        patternCanvas.width = patternCanvas.height = 10;
        const ctx = patternCanvas.getContext("2d");
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();
        return patternCanvas;
      };
    } else if (brushType === "square") {
      brush = new fabric.PatternBrush(canvas);
      brush.getPatternSrc = function () {
        const squareWidth = 10;
        const squareDistance = 2;
        const patternCanvas = document.createElement("canvas");
        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
        const ctx = patternCanvas.getContext("2d");
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, squareWidth, squareWidth);
        return patternCanvas;
      };
    } else if (brushType === "diamond") {
      brush = new fabric.PatternBrush(canvas);
      brush.getPatternSrc = function () {
        const squareWidth = 10;
        const squareDistance = 5;
        const patternCanvas = document.createElement("canvas");
        const rect = new fabric.Rect({
          width: squareWidth,
          height: squareWidth,
          angle: 45,
          fill: this.color,
        });
        const canvasWidth = rect.getBoundingRect().width;
        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
        const ctx = patternCanvas.getContext("2d");
        rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });
        rect.render(ctx);
        return patternCanvas;
      };
    } else {
      brush = new fabric.PencilBrush(canvas);
    }

    if (brush) {
      canvas.freeDrawingBrush = brush;
      if (brushType !== "erase") {
        // Restore normal composite operation
        if (canvas.contextTop) {
          canvas.contextTop.globalCompositeOperation = 'source-over';
        }
        
        canvas.freeDrawingBrush.color = drawingColor;
        canvas.freeDrawingBrush.shadow = new fabric.Shadow({
          blur: parseInt(drawingShadowWidth, 10) || 0,
          offsetX: parseInt(drawingShadowOffset, 10) || 0,
          offsetY: parseInt(drawingShadowOffset, 10) || 0,
          affectStroke: true,
          color: drawingShadowColor,
        });
      }
      canvas.freeDrawingBrush.width = parseInt(drawingLineWidth, 10) || 1;
      canvas.renderAll();
    }
  };

  // Handle drawing mode toggle
  const toggleDrawingMode = () => {
    if (!canvas || !canvas.getContext()) {
      console.error("Cannot toggle drawing mode: Canvas context unavailable");
      return;
    }
    canvas.isDrawingMode = !canvas.isDrawingMode;
    setIsDrawingMode(canvas.isDrawingMode);
    if (!canvas.isDrawingMode) {
      setSelectedTool(null);
      setDrawingBrushType("Pencil");
      // Restore normal composite operation when exiting drawing mode
      if (canvas.contextTop) {
        canvas.contextTop.globalCompositeOperation = 'source-over';
      }
    } else {
      setupBrush(drawingBrushType);
    }
    canvas.renderAll();
    console.log("Drawing mode:", canvas.isDrawingMode);
  };

  // Handle clear canvas
  const clearCanvas = () => {
    if (!canvas || !canvas.getContext()) {
      console.error("Cannot clear canvas: Canvas context unavailable");
      return;
    }
    console.log("Clearing canvas");
    canvas.remove(...canvas.getObjects());
    canvas.isDrawingMode = false;
    setIsDrawingMode(false);
    setSelectedTool(null);
    setDrawingBrushType("Pencil");
    canvas.renderAll();
  };

  if (selectedTool !== "drawing") return null;

  return (
    <div className="absolute top-0 left-0 bg-white p-4 w-[350px] rounded flex flex-col gap-2 shadow-lg z-10">
      <p className="font-bold">Drawing Controls</p>
      <button onClick={toggleDrawingMode} className="p-2 bg-gray-300 rounded hover:bg-gray-400">
        {isDrawingMode ? "Cancel Drawing Mode" : "Enter Drawing Mode"}
      </button>
      <div>
        <label className="block text-sm font-medium">Brush Type:</label>
        <select
          value={drawingBrushType}
          onChange={(e) => {
            setDrawingBrushType(e.target.value);
            setupBrush(e.target.value);
          }}
          className="border p-1 mt-1 w-full rounded"
        >
          <option value="Pencil">Pencil</option>
          <option value="hline">Horizontal Line</option>
          <option value="vline">Vertical Line</option>
          <option value="square">Square</option>
          <option value="diamond">Diamond</option>
          <option value="erase">Erase</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 border p-2 rounded">
        <div>
          <label className="block text-sm font-medium">Drawing Color:</label>
          <input
            type="color"
            value={drawingColor}
            onChange={(e) => {
              setDrawingColor(e.target.value);
              if (canvas && canvas.freeDrawingBrush && drawingBrushType !== "erase") {
                canvas.freeDrawingBrush.color = e.target.value;
                canvas.renderAll();
              }
            }}
            disabled={drawingBrushType === "erase"}
            className="border p-1 mt-1 w-full disabled:opacity-50 h-10 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Shadow Color:</label>
          <input
            type="color"
            value={drawingShadowColor}
            onChange={(e) => {
              setDrawingShadowColor(e.target.value);
              if (canvas && canvas.freeDrawingBrush && drawingBrushType !== "erase") {
                canvas.freeDrawingBrush.shadow.color = e.target.value;
                canvas.renderAll();
              }
            }}
            disabled={drawingBrushType === "erase"}
            className="border p-1 mt-1 w-full disabled:opacity-50 h-10 cursor-pointer"
          />
        </div>
      </div>
      <div className="border p-2 rounded">
        <div className="mb-2">
          <label className="block text-sm font-medium">Line Width: {drawingLineWidth}</label>
          <input
            type="range"
            min="1"
            max="50"
            value={drawingLineWidth}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10) || 1;
              setDrawingLineWidth(value);
              if (canvas && canvas.freeDrawingBrush) {
                canvas.freeDrawingBrush.width = value;
                canvas.renderAll();
              }
            }}
            className="w-full mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium">Shadow Width: {drawingShadowWidth}</label>
            <input
              type="range"
              min="0"
              max="20"
              value={drawingShadowWidth}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10) || 0;
                setDrawingShadowWidth(value);
                if (canvas && canvas.freeDrawingBrush && drawingBrushType !== "erase") {
                  canvas.freeDrawingBrush.shadow.blur = value;
                  canvas.renderAll();
                }
              }}
              disabled={drawingBrushType === "erase"}
              className="w-full mt-1 disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Shadow Offset: {drawingShadowOffset}</label>
            <input
              type="range"
              min="0"
              max="20"
              value={drawingShadowOffset}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10) || 0;
                setDrawingShadowOffset(value);
                if (canvas && canvas.freeDrawingBrush && drawingBrushType !== "erase") {
                  canvas.freeDrawingBrush.shadow.offsetX = value;
                  canvas.freeDrawingBrush.shadow.offsetY = value;
                  canvas.renderAll();
                }
              }}
              disabled={drawingBrushType === "erase"}
              className="w-full mt-1 disabled:opacity-50"
            />
          </div>
        </div>
      </div>
      <button
        onClick={clearCanvas}
        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear Canvas
      </button>
    </div>
  );
};

export default DrawingControls;