"use client";
import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { ImageIcon, Save } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import TextControls from "@/components/productPage/TextControls";
import DrawingControls from "@/components/productPage/DrawingControls";
import ImageIconControls from "@/components/productPage/ImageIconControls";
import { saveDesigns } from "@/redux/store";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CgFormatText } from "react-icons/cg";
import { TfiPencilAlt } from "react-icons/tfi";

import { useGetSingleProductQuery } from "@/redux/Api/productApi";
import { imageUrl } from "@/redux/Api/baseApi";
import { Popconfirm } from "antd";
import { FaArtstation } from "react-icons/fa";

// Load Google Fonts
const loadGoogleFonts = () => {
  const fonts = [
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Poppins",
    "Raleway",
    "Source Sans Pro",
    "PT Sans",
    "Ubuntu",
    "Noto Sans",
    "Rubik",
    "Inter",
    "Fira Sans",
    "Work Sans",
    "Nunito",
    "Quicksand",
    "Muli",
    "Karla",
    "Barlow",
    "Overpass",
    "Catamaran",
    "Josefin Sans",
    "Arimo",
    "Cabin",
    "Varela Round",
    "IBM Plex Sans",
    "Dosis",
    "Oxygen",
    "Hind",
    "Asap",
    "Prompt",
    "Manrope",
    "Public Sans",
    "DM Sans",
    "Jost",
    "Archivo",
    "Exo",
    "Chivo",
    "Heebo",
    "Mukta",
    "Titillium Web",
    "Yantramanav",
    "Red Hat Display",
    "Mulish",
    "Space Grotesk",
    "Urbanist",
    "Outfit",
    "Figtree",
    "Lexend",
    "Sora",
    "Merriweather",
    "Playfair Display",
    "Lora",
    "Spectral",
    "Crimson Text",
    "Bitter",
    "Cardo",
    "Vollkorn",
    "EB Garamond",
    "Noto Serif",
    "Source Serif Pro",
    "Libre Baskerville",
    "Domine",
    "Alegreya",
    "Cormorant",
    "Old Standard TT",
    "Baskervville",
    "Arvo",
    "Zilla Slab",
    "Literata",
    "Gentium Book Basic",
    "Ibarra Real Nova",
    "Sorts Mill Goudy",
    "Neuton",
    "Aleo",
    "Prata",
    "Cinzel",
    "Vidaloka",
    "Yeseva One",
    "Faustina",
    "Rosarivo",
    "Fanwood Text",
    "IM Fell English",
    "Crimson Pro",
    "Vesper Libre",
    "Bangers",
    "Bebas Neue",
    "Anton",
    "Abril Fatface",
    "Lobster",
    "Oswald",
    "Alfa Slab One",
    "Black Ops One",
    "Righteous",
    "Patua One",
    "Archivo Black",
    "Creepster",
    "Fredericka the Great",
    "Special Elite",
    "Monoton",
    "Bungee",
    "Changa One",
    "Fjalla One",
    "Passion One",
    "Russo One",
    "Teko",
    "Staatliches",
    "Squada One",
    "Paytone One",
    "Ultra",
    "Bowlby One SC",
    "Pacifico",
    "Amatic SC",
    "Shadows Into Light",
    "Dancing Script",
    "Indie Flower",
    "Caveat",
    "Permanent Marker",
    "Rock Salt",
    "Covered By Your Grace",
    "Great Vibes",
    "Sacramento",
    "Kaushan Script",
    "Satisfy",
    "Zeyada",
    "Tangerine",
    "Allura",
    "Parisienne",
    "Berkshire Swash",
    "Homemade Apple",
    "Cedarville Cursive",
    "Reenie Beanie",
    "Annie Use Your Telescope",
    "Coming Soon",
    "Just Another Hand",
    "Handlee",
    "Gochi Hand",
    "Schoolbell",
    "Crafty Girls",
    "Kalam",
    "Neucha",
    "Patrick Hand",
    "Sue Ellen Francisco",
    "Waiting for the Sunrise",
    "Marck Script",
    "Inconsolata",
    "Source Code Pro",
    "Fira Code",
    "Roboto Mono",
    "Space Mono",
    "IBM Plex Mono",
    "Ubuntu Mono",
    "Cousine",
    "JetBrains Mono",
    "Anonymous Pro",
    "Overpass Mono",
    "Victor Mono",
    "PT Mono",
    "Cutive Mono",
    "Share Tech Mono",
  ];
  const link = document.createElement("link");
  link.href = `https://fonts.googleapis.com/css2?${fonts
    .map((font) => `family=${font.replace(/\s+/g, "+")}`)
    .join("&")}&display=swap`;
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

export default function DesignPage() {
  const { id } = useParams();
  const {
    data: singleProduct,
    isLoading: isProductLoading,
    error: productError,
  } = useGetSingleProductQuery({ id });
  
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null); // Store the fabric canvas instance
  const isInitializingRef = useRef(false); // Prevent multiple initializations
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [selectedTool, setSelectedTool] = useState("text");
  const [currentSide, setCurrentSide] = useState("front");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [designs, setDesigns] = useState({});
  const [previews, setPreviews] = useState({});
  const [shadowOffsetX, setShadowOffsetX] = useState(0);
  const [shadowOffsetY, setShadowOffsetY] = useState(0);
  const [shadowBlur, setShadowBlur] = useState(0);
  const [borderWidth, setBorderWidth] = useState(0);
  const dispatch = useDispatch();
  const fileInputId = "image-upload-input";

  const frontTshirtUrl = singleProduct?.data?.variants[selectedColorIndex]
    ?.frontImage
    ? `${singleProduct.data.variants[selectedColorIndex].frontImage}`
    : "https://via.placeholder.com/700x700?text=Front+T-Shirt";
  const backTshirtUrl = singleProduct?.data?.variants[selectedColorIndex]
    ?.backImage
    ? `${singleProduct.data.variants[selectedColorIndex].backImage}`
    : "https://via.placeholder.com/700x700?text=Back+T-Shirt";
  const rightTshirtUrl = singleProduct?.data?.variants[selectedColorIndex]
    ?.rightImage
    ? `${singleProduct.data.variants[selectedColorIndex].rightImage}`
    : "https://via.placeholder.com/700x700?text=Right+T-Shirt";
  const leftTshirtUrl = singleProduct?.data?.variants[selectedColorIndex]
    ?.leftImage
    ? `${singleProduct.data.variants[selectedColorIndex].leftImage}`
    : "https://via.placeholder.com/700x700?text=Left+T-Shirt";
  const hasRightImage =
    singleProduct?.data?.variants[selectedColorIndex]?.rightImage?.trim() !==
    "";
  const hasLeftImage =
    singleProduct?.data?.variants[selectedColorIndex]?.leftImage?.trim() !== "";
  const activeImage =
    currentSide === "front"
      ? frontTshirtUrl
      : currentSide === "back"
      ? backTshirtUrl
      : currentSide === "right"
      ? rightTshirtUrl
      : leftTshirtUrl;

  const [isAllSidesDesigned, setIsAllSidesDesigned] = useState(false);

  useEffect(() => {
    if (!singleProduct || isProductLoading) return;

    const currentPreviews = previews[selectedColorIndex] || {};
    const requiredSides = ["front", "back"];
    if (hasRightImage) requiredSides.push("right");
    if (hasLeftImage) requiredSides.push("left");

    const allDesigned = requiredSides.every(
      (side) =>
        currentPreviews[side] && !currentPreviews[side].includes("placeholder")
    );

    setIsAllSidesDesigned(allDesigned);
  }, [
    previews,
    selectedColorIndex,
    singleProduct,
    isProductLoading,
    hasRightImage,
    hasLeftImage,
  ]);

  const addDeleteControl = (object, canvasInstance) => {
    if (!object || !canvasInstance) {
      console.error("Cannot add delete control: Invalid object or canvas");
      return;
    }
    object.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetX: 10,
      offsetY: -10,
      cursorStyle: "pointer",
      mouseUpHandler: (eventData, transform) => {
        const target = transform.target;
        canvasInstance.remove(target);
        canvasInstance.requestRenderAll();
        setActiveObject(null);
        console.log("Object deleted:", target.type);
      },
      render: (ctx, left, top) => {
        const size = 16;
        ctx.save();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(left, top, size / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("×", left, top);
        ctx.restore();
      },
      cornerSize: 16,
    });
  };

  const addTextToCanvas = (canvasInstance, textString = "Double click to edit") => {
    if (!canvasInstance) {
      console.error("Cannot add text: Canvas not available");
      toast.error("Cannot add text: Canvas not initialized.");
      return;
    }
    const text = new fabric.Textbox(textString, {
      left: 100,
      top: 150,
      fontSize: 24,
      fill: "black",
      fontWeight: "normal",
      fontStyle: "normal",
      fontFamily: "Arial",
      editable: true,
      stroke: "black",
      strokeWidth: 0,
      shadow: new fabric.Shadow({
        color: "rgba(0,0,0,0)",
        offsetX: 0,
        offsetY: 0,
        blur: 0,
      }),
    });

    addDeleteControl(text, canvasInstance);
    canvasInstance.add(text);
    canvasInstance.setActiveObject(text);
    canvasInstance.requestRenderAll();
    setSelectedTool("text");
    console.log("Text added to canvas:", textString);
  };

  const handleSelection = (e) => {
    const obj = e.selected ? e.selected[0] : null;
    if (obj) {
      setActiveObject(obj);
      if (obj.type === "textbox") {
        setSelectedTool("text");
      } else if (obj.type === "image" || obj.type === "group") {
        setSelectedTool("imageIcon");
      } else if (obj.type === "path") {
        setSelectedTool("drawing");
      }
    } else {
      setActiveObject(null);
    }
  };

  const initializeCanvas = () => {
    if (isInitializingRef.current) {
      console.log("Canvas initialization already in progress");
      return null;
    }

    if (!canvasRef.current) {
      console.error("Canvas ref is null");
      return null;
    }

    // Check if canvas element already has a fabric instance
    if (canvasRef.current.__fabric) {
      console.log("Canvas already has fabric instance, disposing first");
      try {
        const existingCanvas = canvasRef.current.__fabric;
        existingCanvas.dispose();
        delete canvasRef.current.__fabric;
      } catch (error) {
        console.error("Error disposing existing canvas:", error);
      }
    }

    isInitializingRef.current = true;

    try {
      console.log("Initializing new fabric canvas");
      const canvasInstance = new fabric.Canvas(canvasRef.current, {
        width: 700,
        height: 700,
        isDrawingMode: false,
        backgroundColor: null,
      });

      loadGoogleFonts();
      addTextToCanvas(canvasInstance, "Double click to edit");

      canvasInstance.on("selection:created", handleSelection);
      canvasInstance.on("selection:updated", handleSelection);
      canvasInstance.on("selection:cleared", () => setActiveObject(null));
      canvasInstance.on("path:created", (e) => {
        const path = e.path;
        addDeleteControl(path, canvasInstance);
        canvasInstance.renderAll();
      });

      fabricCanvasRef.current = canvasInstance;
      isInitializingRef.current = false;
      console.log("Canvas initialized successfully");
      
      return canvasInstance;
    } catch (error) {
      console.error("Fabric.js initialization error:", error);
      isInitializingRef.current = false;
      return null;
    }
  };

  // Single initialization effect
  useEffect(() => {
    let timeoutId;
    
    const attemptInit = () => {
      if (fabricCanvasRef.current) {
        console.log("Canvas already initialized, skipping");
        setCanvas(fabricCanvasRef.current);
        return;
      }

      if (!canvasRef.current) {
        console.log("Canvas ref not ready, will retry");
        timeoutId = setTimeout(attemptInit, 100);
        return;
      }

      const canvasInstance = initializeCanvas();
      if (canvasInstance) {
        setCanvas(canvasInstance);
      } else {
        console.log("Canvas initialization failed, retrying...");
        timeoutId = setTimeout(attemptInit, 100);
      }
    };

    // Start initialization after a small delay
    timeoutId = setTimeout(attemptInit, 50);

    return () => {
      clearTimeout(timeoutId);
      if (fabricCanvasRef.current) {
        console.log("Disposing canvas on unmount");
        try {
          fabricCanvasRef.current.dispose();
          fabricCanvasRef.current = null;
        } catch (error) {
          console.error("Error disposing canvas:", error);
        }
      }
    };
  }, []); // Only run once on mount

  useEffect(() => {
    if (!canvas || !singleProduct || isProductLoading) {
      return;
    }

    const design = designs[selectedColorIndex]?.[currentSide];
    if (design) {
      canvas.loadFromJSON(
        design,
        () => {
          canvas.forEachObject((obj) => addDeleteControl(obj, canvas));
          canvas.isDrawingMode = false;
          canvas.renderAll();
          console.log("Design loaded successfully");
        },
        (err) => {
          console.error("Failed to load design:", err);
          toast.error("Failed to load saved design.");
        }
      );
    } else {
      canvas.remove(...canvas.getObjects());
      addTextToCanvas(canvas, "Double click to edit");
      canvas.isDrawingMode = false;
      canvas.renderAll();
    }
  }, [canvas, currentSide, selectedColorIndex, singleProduct, isProductLoading]);

  const base64ToBlob = (base64Data) => {
    try {
      const byteString = atob(base64Data.split(",")[1]);
      const mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    } catch (err) {
      console.error("Failed to convert base64 to blob:", err);
      return null;
    }
  };

  const saveDesign = () => {
    if (!canvas) {
      console.error("Cannot save design: Canvas not available");
      toast.error("Cannot save design: Canvas not initialized.");
      return;
    }

    const toastId = toast.loading("Saving design...");

    try {
      canvas.renderAll();
      const json = canvas.toJSON();
      delete json.backgroundImage;
      setDesigns((prev) => ({
        ...prev,
        [selectedColorIndex]: {
          ...prev[selectedColorIndex],
          [currentSide]: json,
        },
      }));

      const designImageUrl = canvas.toDataURL({ format: "png", multiplier: 1 });

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.getWidth();
      tempCanvas.height = canvas.getHeight();
      const context = tempCanvas.getContext("2d");

      if (!context) {
        console.error("Failed to get temp canvas context");
        toast.error("Failed to save design: Temporary canvas context error.", {
          id: toastId,
        });
        return;
      }

      const canvasDataUrl = canvas.toDataURL({ format: "png", multiplier: 1 });
      const canvasImage = new window.Image();
      canvasImage.src = canvasDataUrl;

      canvasImage.onload = () => {
        context.drawImage(canvasImage, 0, 0);
        const imgElement = new window.Image();
        imgElement.crossOrigin = "anonymous";
        imgElement.src = activeImage;

        imgElement.onload = () => {
          context.globalCompositeOperation = "destination-over";
          context.drawImage(
            imgElement,
            0,
            0,
            tempCanvas.width,
            tempCanvas.height
          );
          context.globalCompositeOperation = "source-over";

          const finalImageUrl = tempCanvas.toDataURL("image/png");

          setPreviews((prev) => ({
            ...prev,
            [selectedColorIndex]: {
              ...prev[selectedColorIndex],
              [currentSide]: finalImageUrl,
              [`element${
                currentSide.charAt(0).toUpperCase() + currentSide.slice(1)
              }`]: designImageUrl,
            },
          }));

          toast.success("Design saved successfully!", { id: toastId });
        };

        imgElement.onerror = (err) => {
          console.error("Failed to load T-shirt image:", activeImage, err);
          const fallbackImageUrl = canvas.toDataURL("image/png");
          setPreviews((prev) => ({
            ...prev,
            [selectedColorIndex]: {
              ...prev[selectedColorIndex],
              [currentSide]: fallbackImageUrl,
              [`element${
                currentSide.charAt(0).toUpperCase() + currentSide.slice(1)
              }`]: designImageUrl,
            },
          }));
          toast.warning(
            "Saved design without T-shirt image due to image loading error.",
            { id: toastId }
          );
        };
      };

      canvasImage.onerror = (err) => {
        console.error("Failed to load canvas image for preview:", err);
        const fallbackImageUrl = canvas.toDataURL("image/png");
        setPreviews((prev) => ({
          ...prev,
          [selectedColorIndex]: {
            ...prev[selectedColorIndex],
            [currentSide]: fallbackImageUrl,
            [`element${
              currentSide.charAt(0).toUpperCase() + currentSide.slice(1)
            }`]: designImageUrl,
          },
        }));
        toast.warning(
          "Saved design without T-shirt image due to rendering error.",
          { id: toastId }
        );
      };
    } catch (err) {
      console.error("Save design error:", err);
      toast.error("Failed to save design: Unexpected error.", { id: toastId });
    }
  };

  const switchSide = (newSide) => {
    if (newSide === currentSide) return;

    if (canvas) {
      saveDesign();
    }

    setCurrentSide(newSide);
    setActiveObject(null);
    setSelectedTool("text");
  };

  const selectColor = (index) => {
    if (index === selectedColorIndex) return;

    if (canvas) {
      saveDesign();
    }

    setSelectedColorIndex(index);
    setActiveObject(null);
    setSelectedTool("text");
  };

  const addImage = (e) => {
    if (!canvas) {
      console.error("Cannot add image: Canvas not available");
      toast.error("Cannot add image: Canvas not initialized.");
      return;
    }
    const file = e.target.files?.[0];
    if (!file) {
      console.error("No file selected for upload");
      toast.error("No file selected. Please choose an image.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type:", file.type);
      toast.error("Please upload a valid image file (e.g., PNG, JPEG).");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error("File too large:", file.size);
      toast.error("Image file is too large. Maximum size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (f) => {
      const dataUrl = f.target.result;
      if (!dataUrl) {
        console.error("FileReader failed to read file");
        toast.error("Failed to read the image file.");
        return;
      }

      const imgElement = new window.Image();
      imgElement.src = dataUrl;
      imgElement.crossOrigin = "anonymous";

      imgElement.onload = () => {
        const img = new fabric.Image(imgElement, {
          left: 150,
          top: 150,
          scaleX: 0.5,
          scaleY: 0.5,
        });

        addDeleteControl(img, canvas);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        setSelectedTool("image");
        toast.success("Image uploaded successfully!");
      };

      imgElement.onerror = (err) => {
        console.error("Failed to load uploaded image:", err);
        toast.error("Failed to load the image. Please try another file.");
      };
    };

    reader.onerror = (err) => {
      console.error("FileReader error:", err);
      toast.error("Error reading the image file.");
    };

    reader.readAsDataURL(file);
  };

  const addImageFromUrl = (
    imageUrl,
    isSvg,
    position = { left: 150, top: 150 }
  ) => {
    if (!canvas) {
      console.error("Cannot add image from URL: Canvas not available");
      toast.error("Cannot add image: Canvas not initialized.");
      return;
    }
    
    if (isSvg) {
      fabric.loadSVGFromURL(
        imageUrl,
        (objects, options) => {
          const svgGroup = fabric.util.groupSVGElements(objects, {
            left: position.left,
            top: position.top,
            scaleX: 0.5,
            scaleY: 0.5,
            ...options,
          });
          svgGroup._originalSvgUrl = imageUrl;

          addDeleteControl(svgGroup, canvas);
          canvas.add(svgGroup);
          canvas.setActiveObject(svgGroup);
          canvas.renderAll();
          setSelectedTool("imageIcon");
        },
        (error) => {
          console.error("Failed to load SVG:", imageUrl, error);
          toast.error("Failed to add SVG to canvas.");
        }
      );
    } else {
      fabric.Image.fromURL(
        imageUrl,
        (img) => {
          if (img) {
            img.set({
              left: position.left,
              top: position.top,
              scaleX: 0.5,
              scaleY: 0.5,
            });

            addDeleteControl(img, canvas);
            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.renderAll();
            setSelectedTool("imageIcon");
          } else {
            console.error("Failed to load image:", imageUrl);
            toast.error("Failed to load image from URL.");
          }
        },
        { crossOrigin: "anonymous" }
      );
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!canvas) {
      console.error("Cannot drop: Canvas not available");
      toast.error("Cannot drop icon: Canvas not initialized.");
      return;
    }

    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.type === "svgIcon") {
        const rect = canvasRef.current.getBoundingClientRect();
        const dropX = e.clientX - rect.left;
        const dropY = e.clientY - rect.top;
        addImageFromUrl(data.dataUrl, true, { left: dropX, top: dropY });
      }
    } catch (err) {
      console.error("Failed to handle drop:", err);
      toast.error("Failed to drop icon.");
    }
  };

  const handlePersistDesigns = () => {
    if (!canvas) {
      console.error("Cannot persist designs: Canvas not available");
      toast.error("Cannot save order: Canvas not initialized.");
      return;
    }

    saveDesign();

    setTimeout(() => {
      const currentPreviews = previews[selectedColorIndex] || {};
      const designData = {
        id,
        variantId: singleProduct?.data?.variants[selectedColorIndex]?._id,
        frontPreview:
          currentPreviews.front ||
          "https://via.placeholder.com/700x700?text=No+Front+Design",
        backPreview:
          currentPreviews.back ||
          "https://via.placeholder.com/700x700?text=No+Back+Design",
        elementFrontPreview:
          currentPreviews.elementFront ||
          "https://via.placeholder.com/700x700?text=No+Element+Front+Design",
        elementBackPreview:
          currentPreviews.elementBack ||
          "https://via.placeholder.com/700x700?text=No+Element+Back+Design",
      };

      if (hasRightImage) {
        designData.rightPreview =
          currentPreviews.right ||
          "https://via.placeholder.com/700x700?text=No+Right+Design";
        designData.elementRightPreview =
          currentPreviews.elementRight ||
          "https://via.placeholder.com/700x700?text=No+Element+Right+Design";
      }

      if (hasLeftImage) {
        designData.leftPreview =
          currentPreviews.left ||
          "https://via.placeholder.com/700x700?text=No+Left+Design";
        designData.elementLeftPreview =
          currentPreviews.elementLeft ||
          "https://via.placeholder.com/700x700?text=No+Element+Left+Design";
      }

      dispatch(saveDesigns(designData));
      toast.success("Designs saved to persist!");
    }, 1000);
  };

  if (productError) {
    return (
      <div className="flex h-screen bg-gray-100 justify-center items-center">
        <div className="text-red-500 text-center">
          <h1>
            Error loading product data:{" "}
            {productError?.data?.message || "Unknown error"}
          </h1>
          <p>Please check the product ID or server connection and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex bg-transparent">
      <div className="w-24 bg-gray-50 p-2 flex flex-col items-center gap-4 border-r">
        <button
          disabled={isProductLoading}
          onClick={() => {
            console.log(
              "Text button clicked, canvas:",
              !!canvas,
              "context:",
              canvas ? !!canvas.getContext() : false
            );
            setSelectedTool("text");
            if (canvas && canvas.getContext()) {
              addTextToCanvas(canvas);
              canvas.isDrawingMode = false;
            } else {
              console.error("Text button clicked but canvas unavailable");
              toast.error("Canvas not initialized. Please wait or refresh.");
            }
          }}
          className={`p-2 rounded ${
            selectedTool === "text"
              ? "bg-gray-300 text-gray-700"
              : "bg-gray-100 text-gray-600"
          } ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <CgFormatText size={24} />
        </button>
        <button
          disabled={isProductLoading}
          onClick={() => {
            console.log(
              "Image button clicked, canvas:",
              !!canvas,
              "context:",
              canvas ? !!canvas.getContext() : false
            );
            setSelectedTool("image");
            if (canvas && canvas.getContext()) {
              canvas.isDrawingMode = false;
            } else {
              console.error("Image button clicked but canvas unavailable");
              toast.error("Canvas not initialized. Please wait or refresh.");
            }
          }}
          className={`p-2 rounded ${
            selectedTool === "image"
              ? "bg-gray-300 text-gray-700"
              : "bg-gray-100 text-gray-600"
          } ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ImageIcon size={24} />
        </button>
        <button
          disabled={isProductLoading}
          onClick={() => {
            console.log(
              "ImageIcon button clicked, canvas:",
              !!canvas,
              "context:",
              canvas ? !!canvas.getContext() : false
            );
            setSelectedTool("imageIcon");
            if (canvas && canvas.getContext()) {
              canvas.isDrawingMode = false;
            } else {
              console.error("ImageIcon button clicked but canvas unavailable");
              toast.error("Canvas not initialized. Please wait or refresh.");
            }
          }}
          className={`p-2 rounded ${
            selectedTool === "imageIcon"
              ? "bg-gray-300 text-gray-700"
              : "bg-gray-100 text-gray-600"
          } ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FaArtstation size={24} />
        </button>
        <button
          disabled={isProductLoading}
          onClick={() => {
            console.log(
              "Drawing button clicked, canvas:",
              !!canvas,
              "context:",
              canvas ? !!canvas.getContext() : false
            );
            setSelectedTool("drawing");
            if (canvas && canvas.getContext()) {
              canvas.isDrawingMode = true;
            } else {
              console.error("Drawing button clicked but canvas unavailable");
              toast.error("Canvas not initialized. Please wait or refresh.");
            }
          }}
          className={`p-2 rounded ${
            selectedTool === "drawing"
              ? "bg-gray-300 text-gray-700"
              : "bg-gray-100 text-gray-600"
          } ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <TfiPencilAlt size={24} />
        </button>
      </div>

      <div className="flex-1 flex justify-center items-center bg-gray-100 relative">
        {isProductLoading ? (
          <div className="w-[700px] h-[700px] animate-pulse rounded bg-transparent" />
        ) : (
          <div
            className="shadow-md p-4 rounded-md relative"
            style={{ width: 700, height: 700 }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="absolute top-0 -right-24 flex gap-2">
              <button
                disabled={isProductLoading}
                onClick={() => {
                  console.log(
                    "Save button clicked, canvas:",
                    !!canvas,
                    "context:",
                    canvas ? !!canvas.getContext() : false
                  );
                  if (canvas && canvas.getContext()) {
                    saveDesign();
                  } else {
                    console.error("Save button clicked but canvas unavailable");
                    toast.error(
                      "Canvas not initialized. Please wait or refresh."
                    );
                  }
                }}
                className={`p-2 bg-green-500 text-white rounded flex items-center gap-2 ${
                  isProductLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Save size={20} />
                Save
              </button>
            </div>
            <div className="relative">
              <img
                src={activeImage}
                alt={singleProduct?.data?.name || "T-Shirt"}
                style={{ width: 700, height: 700 }}
                className="mx-auto block"
                crossOrigin="anonymous"
              />
            </div>
            <div
              className="absolute inset-0 w-full border  border-dashed border-gray-500"
              style={{ width: 700, height: 700 }}
            >
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>
        )}

        {selectedTool === "text" && activeObject?.type === "textbox" && (
          <TextControls
            activeObject={activeObject}
            canvas={canvas}
            setShadowOffsetX={setShadowOffsetX}
            setShadowOffsetY={setShadowOffsetY}
            setShadowBlur={setShadowBlur}
            setBorderWidth={setBorderWidth}
          />
        )}

        {selectedTool === "image" && (
          <div className="absolute top-0 left-0 bg-white p-4 rounded flex flex-col gap-2">
            <p>Upload Image</p>
            <label
              htmlFor={fileInputId}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition"
            >
              <ImageIcon size={18} />
              <span>Upload Image</span>
              <input
                id={fileInputId}
                type="file"
                accept="image/*"
                onChange={addImage}
                className="hidden"
              />
            </label>
          </div>
        )}

        <ImageIconControls
          selectedTool={selectedTool}
          onImageSelect={addImageFromUrl}
          activeObject={activeObject}
          onColorChange={(newColor) => {
            if (activeObject && activeObject.type === "group") {
              activeObject.getObjects().forEach((obj) => {
                if (obj.fill) obj.set({ fill: newColor });
              });
              canvas.renderAll();
            }
          }}
          canvas={canvas}
        />

        <DrawingControls
          canvas={canvas}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
      </div>

      <div className="w-96 bg-gray-50 p-4 flex flex-col gap-4 border-l h-screen overflow-y-auto">
        <div className="border p-2">
          <h1 className="font-semibold mb-2">Select Color</h1>
          <div className="flex flex-wrap gap-1">
            {singleProduct?.data?.variants?.map((variant, index) => (
              <button
                key={variant._id}
                onClick={() => selectColor(index)}
                disabled={isProductLoading}
                className={`flex items-center gap-2 rounded-full ${
                  selectedColorIndex === index ? "bg-red-500 p-[2px]" : ""
                } ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: variant.color.hexValue }}
                ></div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Popconfirm
            title="Are you sure you want to Save This design?"
            onConfirm={() => switchSide("front")}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <button
              disabled={isProductLoading}
              className={`p-2  ${
                currentSide === "front"
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              } ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {" "}
              Front Image
            </button>
          </Popconfirm>

          <Popconfirm
            title="Are you sure you want to Save This design?"
            onConfirm={() => switchSide("back")}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <button
              disabled={isProductLoading}
              className={`p-2  ${
                currentSide === "back" ? "bg-primary text-white" : "bg-gray-200"
              } ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Back Image
            </button>
          </Popconfirm>

          {hasRightImage && (
            <>
              <Popconfirm
                title="Are you sure you want to Save This design?"
                onConfirm={() => switchSide("right")}
                okText="Yes"
                cancelText="No"
                okType="danger"
              >
                <button
                  disabled={isProductLoading}
                  className={`p-2  ${
                    currentSide === "right"
                      ? "bg-primary text-white"
                      : "bg-gray-200"
                  } ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Right Image
                </button>
              </Popconfirm>
            </>
          )}

          {hasLeftImage && (
            <>
              <Popconfirm
                title="Are you sure you want to Save This design?"
                onConfirm={() => switchSide("left")}
                okText="Yes"
                cancelText="No"
                okType="danger"
              >
                <button
                  
                  disabled={isProductLoading}
                  className={`p-2  ${
                    currentSide === "left"
                      ? "bg-primary text-white"
                      : "bg-gray-200"
                  } ${isProductLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Left Image
                </button>
              </Popconfirm>
            </>
          )}
        </div>

        <h1 className="text-center bg-green-500 p-1">Freview</h1>
        <div className="grid grid-cols-2 gap-2">
          {previews[selectedColorIndex]?.front && (
            <div className="border ">
              <h1 className="bg-primary p-[3px] text-white text-center">
                Front Image{" "}
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                <img
                  src={previews[selectedColorIndex].front}
                  alt="Front Preview"
                  className="w-full"
                />
              </div>
            </div>
          )}

          {previews[selectedColorIndex]?.back && (
            <div className="border ">
              <h1 className="bg-primary p-[3px] text-white text-center">
                Back Image :
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                <img
                  src={previews[selectedColorIndex].back}
                  alt="Back Preview"
                  className="w-full"
                />
              </div>
            </div>
          )}

          {previews[selectedColorIndex]?.right && (
            <div className="border">
              <h1 className="bg-primary p-[3px] text-white text-center">
                Right Image :
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                <img
                  src={previews[selectedColorIndex].right}
                  alt="Right Preview"
                  className="w-full"
                />
              </div>
            </div>
          )}

          {previews[selectedColorIndex]?.left && (
            <div className="border">
              <h1 className="bg-primary p-[3px] text-white text-center">
                Left Image :
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                <img
                  src={previews[selectedColorIndex].left}
                  alt="Left Preview"
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
        {/* {previews[selectedColorIndex]?.elementFront && (
          <div className="border">
            <h1 >Element Front Image :</h1>
            <div className="flex flex-col gap-2 mt-2">
              <img
                src={previews[selectedColorIndex].elementFront}
                alt="Element Front Preview"
                className="w-full"
              />
            </div>
          </div>
        )}
        {previews[selectedColorIndex]?.elementBack && (
          <div className="border">
            <h1>Element Back Image :</h1>
            <div className="flex flex-col gap-2 mt-2">
              <img
                src={previews[selectedColorIndex].elementBack}
                alt="Element Back Preview"
                className="w-full"
              />
            </div>
          </div>
        )}
        {previews[selectedColorIndex]?.elementRight && (
          <div className="border ">
            <h1>Element Right Image Preview:</h1>
            <div className="flex flex-col gap-2 mt-2">
              <img
                src={previews[selectedColorIndex].elementRight}
                alt="Element Right Preview"
                className="w-full"
              />
            </div>
          </div>
        )}
        {previews[selectedColorIndex]?.elementLeft && (
          <div className="border">
            <h1>Element Left Image Preview:</h1>
            <div className="flex flex-col gap-2 mt-2">
              <img
                src={previews[selectedColorIndex].elementLeft}
                alt="Element Left Preview"
                className="w-full"
              />
            </div>
          </div>
        )} */}
        <div>
          <Link href="/saveDesign">
            <button
              onClick={() => {
                console.log(
                  "Save Order button clicked, canvas:",
                  !!canvas,
                  "context:",
                  canvas ? !!canvas.getContext() : false
                );
                if (canvas && canvas.getContext()) {
                  handlePersistDesigns();
                } else {
                  console.error(
                    "Save Order button clicked but canvas unavailable"
                  );
                  toast.error(
                    "Canvas not initialized. Please wait or refresh."
                  );
                }
              }}
              disabled={isProductLoading || !isAllSidesDesigned}
              className={`bg-red-500 text-white py-2 px-5 rounded ${
                isProductLoading || !isAllSidesDesigned
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Save Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
