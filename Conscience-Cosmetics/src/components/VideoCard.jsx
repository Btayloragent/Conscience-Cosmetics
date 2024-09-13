import React, { useState, useRef } from 'react';
import Rating from './Rating'; // Import your Rating component

function VideoCard({videoThumbnail}) {
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
  };

  const handleSubmit = () => {
    console.log("Textarea submitted:", textareaValue);
    setTextareaVisible(false);
    setTextareaValue("");
  };

  const handleCancel = () => {
    setTextareaVisible(false);
    setTextareaValue("");
  };

  return (
    <div className="card bg-base-100 shadow-xl inline-block p-0 m-0 rounded-lg">
      <div className="relative rounded-lg overflow-hidden">
        <figure className="m-0 p-0 rounded-lg overflow-hidden">
          <img
            src={videoThumbnail}
            alt="Video Thumbnail"
            className="w-full m-0 p-0 rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
            <p className="p-4">
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
        <div className="relative p-4 rounded-lg bg-white">
          {/* Rating Component */}
          <div className="flex justify-center mb-4">
            <Rating />
          </div>
          <textarea
            ref={textareaRef}
            className="textarea textarea-bordered w-full rounded-lg"
            placeholder="Write your comment..."
            value={textareaValue}
            onChange={handleTextareaChange}
            style={{ 
              resize: 'none', 
              overflow: 'hidden', 
              margin: 0, 
              padding: '0.5rem 0.5rem 2.5rem 0.5rem' // Adjusted padding for the buttons
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

export default VideoCard;
