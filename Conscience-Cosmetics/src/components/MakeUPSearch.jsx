import React, { useState } from "react";
import Dropdown from "../components/DropDownMenu"; // Ensure the path is correct
import SidePic from '../pictures/SidePics/Side3.png'; // Ensure the path is correct and pointing to the image

const MakeUpSearch = ({tagsData, cosmeticsData}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Updated slides array with all provided slides
    const slides = [
        {
            image: "https://images.pexels.com/photos/5403542/pexels-photo-5403542.jpeg?auto=compress&cs=tinysrgb&w=600",
            title: "Blush",
            description: "Explore the elegance with this glamorous makeup look.",
            productType: "blush" // Added product type
        },
        {
            image: "https://images.pexels.com/photos/5141085/pexels-photo-5141085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Bronzer",
            description: "A perfect blend of elegance and sophistication.",
            productType: "bronzer" // Added product type
        },
        {
            image: "https://images.pexels.com/photos/5128084/pexels-photo-5128084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "EyeBrow",
            description: "Make a bold statement with this vibrant makeup style.",
            productType: "eyebrow" // Added product type
        },
        {
            image: "https://images.pexels.com/photos/2517447/pexels-photo-2517447.jpeg",
            title: "EyeLiner",
            description: "Achieve a natural and fresh look with this makeup.",
            productType: "eyeliner" // Added product type
        },
        {
            image: "https://images.pexels.com/photos/13019072/pexels-photo-13019072.jpeg",
            title: "EyeShadow",
            description: "A timeless classic makeup that suits every occasion.",
            productType: "eyeshadow" // Added product type
        },
        {
            image: "https://images.pexels.com/photos/5403543/pexels-photo-5403543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Foundation",
            description: "Stay on trend with this stylish makeup look.",
            productType: "foundation" // Added product type
        },
        {
            image: "https://images.pexels.com/photos/2535928/pexels-photo-2535928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "LipLiner",
            description: "Express your creativity with this unique makeup design.",
            productType: "lipliner" // Added product type
        },
        {
            image: "https://images.pexels.com/photos/1377034/pexels-photo-1377034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "LipStick",
            description: "Combine art and beauty with this artistic makeup look.",
            productType: "lipstick" // Added product type
        },
        {
            image: "https://images.pexels.com/photos/27462673/pexels-photo-27462673/free-photo-of-a-mascara-tube-with-a-black-lid-and-a-pink-brush.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Mascara",
            description: "Highlight your eyes with this mascara-focused look.",
            productType: "mascara" // Added product type
        },
        {
            image: "https://images.pexels.com/photos/19321230/pexels-photo-19321230/free-photo-of-close-up-of-pink-nail-polishes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "NailPolish",
            description: "Add a pop of color with these trendy nail polishes.",
            productType: "nailpolish" // Added product type
        }
    ];

    const handleImageClick = () => {
        // Use the productType to construct the URL
        const productType = slides[currentSlide].productType; // Get the product type from the current slide
        window.location.href = `https://makeup-api.herokuapp.com/api/v1/products?product_type=${productType}`; // Redirect to the corresponding page
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    return (
        <div className="card bg-base-100 w-full max-w-4xl shadow-xl relative">
            {/* Carousel with rounded top corners */}
            <div className="relative w-full h-80 overflow-hidden rounded-t-lg">
                <div
                    onClick={handleImageClick}
                    className="w-full h-full cursor-pointer"
                >
                    <img
                        src={slides[currentSlide].image}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                        alt={slides[currentSlide].title}
                    />
                </div>

                {/* Left arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black text-4xl p-2 bg-transparent border-none focus:outline-none"
                    aria-label="Previous slide"
                >
                    &#9668;
                </button>

                {/* Right arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black text-4xl p-2 bg-transparent border-none focus:outline-none"
                    aria-label="Next slide"
                >
                    &#9658;
                </button>
            </div>

            {/* Card content */}
            <div className="card-body">
                <h2 className="card-title font-bold text-3xl" style={{ fontFamily: 'Roboto, Merriweather' }}>
                    {slides[currentSlide].title} {/* Dynamic Title */}
                </h2>
                <p>{slides[currentSlide].description}</p> {/* Dynamic Description */}
                
                {/* Flex container for dropdown and image */}
                <div className="flex items-start justify-between mt-4"> {/* Adjust alignment to items-start */}
                    {/* Dropdown */}
                    <Dropdown tagsData={tagsData} cosmeticsData={cosmeticsData} />

                    {/* PNG image */}
                    <img
                        src={SidePic} // Use the imported image variable
                        alt="MakeUp Collection"
                        className="relative object-contain"
                        style={{ width: '450px', height: '450px', objectFit: 'contain' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MakeUpSearch;

