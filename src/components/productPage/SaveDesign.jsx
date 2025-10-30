"use client";
import { useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useAddDesignMutation } from "@/redux/Api/productApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Spin } from "antd";

export default function SaveDesign() {
  const [loading, setLoading] = useState(false);
  const [saveDesign] = useAddDesignMutation();
  const [designName, setDesignName] = useState("");
  const router = useRouter();
  const {
    frontPreview,
    backPreview,
    elementFrontPreview,
    elementBackPreview,
    rightPreview,
    leftPreview,
    elementRightPreview,
    elementLeftPreview,
    id,
    variantId,
  } = useSelector((state) => state.design);

  const baseProduct = id;

  console.log(baseProduct);

  const convertBase64ToFile = (base64String, fileName) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("designName", designName);
      formData.append("baseProduct", baseProduct);

      if (frontPreview)
        formData.append(
          "frontImage",
          convertBase64ToFile(frontPreview, "front.png")
        );
      if (backPreview)
        formData.append(
          "backImage",
          convertBase64ToFile(backPreview, "back.png")
        );
      if (elementFrontPreview)
        formData.append(
          "frontElement",
          convertBase64ToFile(elementFrontPreview, "frontElement.png")
        );
      if (elementBackPreview)
        formData.append(
          "backElement",
          convertBase64ToFile(elementBackPreview, "backElement.png")
        );
      if (rightPreview)
        formData.append(
          "rightImage",
          convertBase64ToFile(rightPreview, "right.png")
        );
      if (leftPreview)
        formData.append(
          "leftImage",
          convertBase64ToFile(leftPreview, "left.png")
        );
      if (elementRightPreview)
        formData.append(
          "rightElement",
          convertBase64ToFile(elementRightPreview, "rightElement.png")
        );
      if (elementLeftPreview)
        formData.append(
          "leftElement",
          convertBase64ToFile(elementLeftPreview, "leftElement.png")
        );
      setLoading(true);
      const response = await saveDesign(formData);
      setLoading(false);
      console.log(response?.data?.data?._id);
      if (response?.data?.success) {
        setLoading(false);
        toast.success('Save Successfull')
        router.push(`/addToDesignCart/${response?.data?.data?._id}`);
        setDesignName("");
      } else {
        setLoading(false);
        toast.error("Failed to save design ❌");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Error saving design ❌");
    }
  };

  const placeholderImage = "https://via.placeholder.com/300x300?text=No+Design";

  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="bg-white grid grid-cols-2 rounded-lg w-full max-w-4xl">
        {/* ======== Left Preview Section ======== */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Only show if available */}
            {frontPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Composite Front Design
                </h3>
                <img
                  src={frontPreview || placeholderImage}
                  alt="Composite Front Design"
                  className="w-full object-cover"
                />
              </div>
            )}

            {backPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Composite Back Design
                </h3>
                <img
                  src={backPreview || placeholderImage}
                  alt="Composite Back Design"
                  className="w-full object-cover"
                />
              </div>
            )}

            {rightPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Composite Right Design
                </h3>
                <img
                  src={rightPreview || placeholderImage}
                  alt="Composite Right Design"
                  className="w-full object-cover"
                />
              </div>
            )}

            {leftPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Composite Left Design
                </h3>
                <img
                  src={leftPreview || placeholderImage}
                  alt="Composite Left Design"
                  className="w-full object-cover"
                />
              </div>
            )}

            {elementFrontPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Element Front Design
                </h3>
                <img
                  src={elementFrontPreview || placeholderImage}
                  alt="Element Front Design"
                  className="w-full object-cover"
                />
              </div>
            )}

            {elementBackPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Element Back Design
                </h3>
                <img
                  src={elementBackPreview || placeholderImage}
                  alt="Element Back Design"
                  className="w-full object-cover"
                />
              </div>
            )}

            {elementRightPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Element Right Design
                </h3>
                <img
                  src={elementRightPreview || placeholderImage}
                  alt="Element Right Design"
                  className="w-full object-cover"
                />
              </div>
            )}

            {elementLeftPreview && (
              <div className="border">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Element Left Design
                </h3>
                <img
                  src={elementLeftPreview || placeholderImage}
                  alt="Element Left Design"
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* ======== Right Save Section ======== */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/allProduct/productDetails/design">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>

            <h2 className="text-lg font-medium text-gray-900">Save</h2>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Save your design
              </h3>
              <p className="text-gray-600">
                View it anywhere, and share it with others!
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label
                  htmlFor="design-name"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Design name
                </label>
                <input
                  id="design-name"
                  type="text"
                  placeholder="Design name"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">
                By clicking 'Save Design', I agree to the{" "}
                <a href="#" className="text-gray-700 hover:underline">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="text-gray-700 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            <div>
              <button
                onClick={handleSave}
                className={`mt-5 px-6 py-3 rounded text-white flex justify-center items-center gap-2 transition-all duration-300 ${
                  loading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-primary hover:bg-red-500"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spin size="small" />
                    <span>Adding...</span>
                  </>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
