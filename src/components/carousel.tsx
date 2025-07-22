'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const images = [
    "/carousel1.jpg",
    "/carousel2.jpg",
    "/carousel3.png",
    "/carousel4.jpg",
    "/carousel5.jpg",
    "/carousel6.jpg",
    "/carousel7.jpg",
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-96 min-w-full overflow-hidden">
            <Image
                key={images[currentIndex]}
                src={images[currentIndex]}
                alt="Carousel"
                priority={currentIndex === 0}
                fill={true}
                className="transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            <FaAngleLeft onClick={() =>
                setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
            }
                className="absolute left-3 top-1/4 z-20 text-muted-text cursor-pointer" size={35} />
            <FaAngleRight onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % images.length)
            }
                className="absolute right-3 top-1/4 z-20 text-muted-text cursor-pointer" size={35} />
        </div>
    );
}