import React, { useState } from "react";

const MakeUpSearch = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
        "https://images.pexels.com/photos/5403542/pexels-photo-5403542.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/5141085/pexels-photo-5141085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/5128084/pexels-photo-5128084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2517447/pexels-photo-2517447.jpeg",
        "https://images.pexels.com/photos/13019072/pexels-photo-13019072.jpeg",
        "https://images.pexels.com/photos/5403543/pexels-photo-5403543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/2535928/pexels-photo-2535928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1377034/pexels-photo-1377034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/27462673/pexels-photo-27462673/free-photo-of-a-mascara-tube-with-a-black-lid-and-a-pink-brush.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2https://images.pexels.com/photos/27462671/pexels-photo-27462671/free-photo-of-a-tube-of-lipstick-on-a-green-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/19321230/pexels-photo-19321230/free-photo-of-close-up-of-pink-nail-polishes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ];

    const handleImageClick = () => {
        alert(`Image ${currentSlide + 1} clicked!`); // Replace this with your desired action
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === images.length - 1 ? 0 : prevSlide + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? images.length - 1 : prevSlide - 1
        );
    };

    return (
        <div className="card bg-base-100 w-full max-w-4xl shadow-xl relative">
            {/* Carousel with fixed size */}
            <div className="relative w-full h-60 overflow-hidden">
                <div
                    onClick={handleImageClick}
                    className="w-full h-full cursor-pointer"
                >
                    <img
                        src={images[currentSlide]}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                        alt={`Slide ${currentSlide + 1}`}
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
                <h2 className="card-title">
                    {`Image ${currentSlide + 1}`} {/* Dynamic Title */}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{`Slide number ${currentSlide + 1} of the carousel.`}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    );
};

export default MakeUpSearch;
