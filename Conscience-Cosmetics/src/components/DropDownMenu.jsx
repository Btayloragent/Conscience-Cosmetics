import React, { useState } from 'react';

const CardWithDropdown = ({ tagsData, cosmeticsData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [...new Set(cosmeticsData.map(product => product.category).filter(category => category))];
    const tags = tagsData.map(tag => (
        { label: tag }
    ));

    const filteredTags = tags.filter(tag =>
        tag.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCategoryClick = (category) => {
        window.location.href = `https://makeup-api.herokuapp.com/api/v1/products?product_category=${category.toLowerCase()}`;
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl" style={{ fontFamily: "'Roboto', Merriweather" }}>
            <div className="card-body">
                <h2 className="card-title">By Category</h2>
                <p>Product filtered by type.</p>
                {/* Tag Labels on the Card */}
                <div className="py-2">
                    <div className="border-t border-gray-200">
                        <div className="py-1 flex flex-wrap">
                            {categories.map((category, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCategoryClick(category)}
                                    className="tag-label badge badge-outline mx-1 my-1 cursor-pointer"
                                    style={{ fontFamily: "'Roboto', sans-serif" }}
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dropdown Positioned at the Bottom */}
                <div className="relative mt-4">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="btn btn-outline btn-primary"
                        style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                        <i className="icon filter"></i> Filter By Tags
                    </button>

                    {isOpen && (
                        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <div className="px-4 py-2 flex justify-between items-center">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search tags..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="input input-bordered w-full"
                                        style={{ fontFamily: "'Roboto', sans-serif" }}
                                    />
                                </div>

                                {/* X button to close the dropdown */}
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="ml-2 text-gray-500 hover:text-gray-800"
                                >
                                    <span className="text-lg">&times;</span>
                                </button>
                            </div>
                            <div className="border-t border-gray-200">
                                <div className="px-4 py-2 text-gray-700 font-semibold">
                                    {/* Badge Section Inside Dropdown */}
                                    {filteredTags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="tag-label badge badge-outline mx-1 my-1"
                                            style={{ fontFamily: "'Roboto', sans-serif" }}
                                        >
                                            {tag.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardWithDropdown;
