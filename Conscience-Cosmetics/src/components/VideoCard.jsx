import React, { useState, useRef } from 'react';

function CardComponent() {
  const [isTextareaVisible, setTextareaVisible] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);

  const toggleTextarea = () => {
    setTextareaVisible(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = () => {
    // Handle the submit action here
    console.log("Textarea submitted:", textareaValue);
    setTextareaVisible(false); // Hide textarea after submission
    setTextareaValue(""); // Clear textarea value
  };

  const handleCancel = () => {
    setTextareaVisible(false); // Hide textarea
    setTextareaValue(""); // Clear textarea value
  };

  return (
    <div className="card bg-base-100 shadow-xl inline-block p-0 m-0">
      <div className="relative">
        <figure className="m-0 p-0">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="w-full m-0 p-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <p className="p-4">
              {/* Add your video description here */}
              This is a sample description for the video. It provides context and details about the content.
            </p>
          </div>
        </figure>
        {!isTextareaVisible && (
          <button 
            className="btn btn-xs px-2 py-1 text-xs absolute bottom-2 right-2 rounded-lg bg-transparent text-white border border-white"
            onClick={toggleTextarea}
          >
            Comment
          </button>
        )}
      </div>
      {isTextareaVisible && (
        <div className="relative p-4">
          <textarea
            ref={textareaRef}
            className="textarea textarea-bordered w-full"
            placeholder="Comment"
            value={textareaValue}
            onChange={handleTextareaChange}
            style={{ 
              resize: 'none', 
              overflow: 'hidden', 
              margin: 0, 
              padding: '0.5rem', 
              paddingBottom: '2.5rem' // Adding padding to the bottom to make room for the buttons
            }}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              className="btn btn-xs px-2 py-1 text-xs rounded-lg bg-transparent text-red-500 border border-red-500 mr-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn btn-xs px-2 py-1 text-xs rounded-lg bg-green-500 text-white border border-green-500"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <div className="card-body p-0">
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
}

export default CardComponent;





