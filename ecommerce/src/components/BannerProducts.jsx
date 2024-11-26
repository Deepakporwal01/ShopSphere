import React, { useState, useEffect } from "react"; // Importing necessary React hooks
import image1 from "../assest/banner/img1.webp"; // Importing image assets for the banner
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import image1mobile from "../assest/banner/img1_mobile.jpg"; // Importing mobile versions of the images
import image2mobile from "../assest/banner/img2_mobile.webp";
import image3mobile from "../assest/banner/img3_mobile.jpg";
import image4mobile from "../assest/banner/img4_mobile.jpg";
import image5mobile from "../assest/banner/img5_mobile.png";
import { FaAngleLeft } from "react-icons/fa6"; // Importing icons for navigation
import { FaAngleRight } from "react-icons/fa6";

export default function BannerProducts() {
  const [currentImage, setCurrentImage] = useState(0); // State to keep track of the currently displayed image

  // Arrays for desktop and mobile images
  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1mobile,
    image2mobile,
    image3mobile,
    image4mobile,
    image5mobile,
  ];

  // Function to switch to the next image
  const nextImg = () => {
    setCurrentImage((prev) => (prev + 1) % desktopImages.length); // Incrementing the current image index with wrap-around using modulus
  };

  useEffect(() => {
    // Setting up an interval to automatically switch images every 5 seconds
    const interval = setInterval(nextImg, 5000);
    return () => {
      clearInterval(interval); // Clearing the interval when the component is unmounted
    };
  }, []);

  return (
    <div className="container bg-red-500 mx-auto rounded overflow-hidden">
      {/* Main container with styling */}
      <div className="h-60 md:h-72 w-full relative bg-slate-200">
        {/* Banner container with dynamic height for desktop (md) and mobile */}
        <div className="flex items-center absolute z-10 justify-between h-full w-full">
          {/* Navigation buttons container, hidden on mobile */}
          <div className="hidden text-2xl shadow-md rounded-full justify-between p-1 md:flex w-[calc(100vw-80px)]">
            {/* Left navigation button */}
            <button
              onClick={() => setCurrentImage((prev) => prev - 1)}
              className="bg-white shadow-md rounded-full p-2"
            >
              <FaAngleLeft />
            </button>
            {/* Right navigation button */}
            <button
              onClick={nextImg}
              className="bg-white shadow-md rounded-full p-2"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Desktop and tablet image slideshow */}
        <div className="md:flex hidden h-full w-full items-center">
          {desktopImages.map((img, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full"
                style={{
                  transform: `translateX(-${currentImage * 100}%)`, // Shifting the slides horizontally
                }}
                key={img}
              >
                <img src={img} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/* Mobile image slideshow */}
        <div className="flex h-full w-full items-center md:hidden">
          {mobileImages.map((img, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full"
                style={{
                  transform: `translateX(-${currentImage * 100}%)`, // Shifting the slides horizontally for mobile
                }}
                key={img}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
