"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";

// Slideshow Data
const slides = [
  {
    id: 1,
    image: "/nature.jpg",
    title: "The Smoke That Thunders",
    description: "Experience the breathtaking Blue Nile Falls, a majestic cascade of water that has mesmerized travelers for centuries.",
    effect: "fade", // Animation effect
  },
  {
    id: 2,
    image: "/fasiledes.jpg",
    title: "Step into the Royal Past",
    description: "Discover the ancient fortress of Gondar, the Camelot of Africa, where history and architecture blend in timeless beauty.",
    effect: "reveal-parts",
  },
  {
    id: 3,
    image: "/ertale.jpg",
    title: "The Gateway to the Earth's Fire",
    description: "Witness the raw power of nature at Erta Ale, Ethiopia’s mesmerizing lava lake, glowing like a portal to another world.",
    effect: "zoom-in",
  },
  {
    id: 4,
    image: "/adiss.jpg",
    title: "Discover Ethiopia",
    description: "A land of history, culture, and breathtaking landscapes",
    effect: "slide-up",
  },
  {
    id: 5,
    image: "/afar.jpg",
    title: "Journey to the Hottest Place on Earth",
    description: "Explore the surreal landscapes of the Danakil Depression, where salt flats, colorful mineral deposits, and bubbling lava create an alien world.",
    effect: "split",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Next slide function
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Animation variants for different effects
  const animationVariants = {
    fade: { opacity: 0, scale: 0.9 },
    "reveal-parts": { clipPath: "inset(50% 50% 50% 50%)", opacity: 0 },
    "zoom-in": { scale: 0.8, opacity: 0 },
    "slide-up": { y: 50, opacity: 0 },
    split: { clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)", opacity: 0 },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-text">
      {/* Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={animationVariants[slide.effect as keyof typeof animationVariants]}
          animate={index === currentIndex ? { opacity: 1, scale: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" } : {}}
          transition={{ duration: 1 }}
          className={`absolute inset-0 ${index === currentIndex ? "z-10" : "hidden"}`}
        >
          {/* Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-5xl font-bold font-serif"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-4 text-lg md:text-xl font-sans"
            >
              {slide.description}
            </motion.p>
            <button className="bg-text  px-4 py-2 rounded-lg mt-16 font-sans">Book Now</button>
          </div>
        </motion.div>
      ))}

      {/* Left & Right Arrows */}
      <button onClick={prevSlide} className="absolute z-10 left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full">
        <ChevronLeft size={32} />
      </button>
      <button onClick={nextSlide} className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full">
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
