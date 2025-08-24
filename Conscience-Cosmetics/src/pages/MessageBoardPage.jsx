import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios'; // For making HTTP requests to your backend
import { io } from 'socket.io-client'; // For real-time WebSocket communication

// IMPORTANT: Replace with your backend URL.
// Using import.meta.env for Vite compatibility, and VITE_ prefix for env variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'; // Default to 5001

let socket; // Declare socket outside to maintain its instance across renders

function MessageBoardPage() { // Renamed from App to MessageBoardPage
  const [messages, setMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [channels, setChannels] = useState(['General Chat', 'Makeup Looks', 'Product Reviews', 'Tips & Tricks']);
  const [currentChannel, setCurrentChannel] = useState('General Chat');
  const [user, setUser] = useState(null); // Stores logged-in user info { _id, username, avatarUrl }

  const messagesEndRef = useRef(null);

  // Function to get user data from localStorage (e.g., after login)
  const getAuthUser = () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store JWT here
      if (token) {
        // Decode JWT to get user info (assuming it contains userId, username, avatarUrl)
        // In a real app, you'd send this token to your backend for verification
        // and fetch fresh user data to prevent forged tokens.
        // For simplicity here, we'll decode it on the client side.
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return {
          _id: decodedToken.userId,
          username: decodedToken.username,
          avatarUrl: decodedToken.avatarUrl // Assuming avatarUrl is in the token
        };
      }
    } catch (e) {
      console.error("Failed to parse user token:", e);
      localStorage.removeItem('token'); // Clear invalid token
    }
    return null;
  };

  // --- Effect for User Authentication and Socket.IO Connection ---
  useEffect(() => {
    // Authenticate user (or set up anonymous for testing)
    const authenticatedUser = getAuthUser();
    if (authenticatedUser) {
      setUser(authenticatedUser);
    } else {
      // For testing without a full login flow, you might generate an anonymous ID
      // In a production app, anonymous users might not be allowed to chat,
      // or you'd have a backend API to create a temporary anonymous session.
      // For this example, let's just use a placeholder if not logged in.
      setUser({ _id: 'anonymous-user-' + Math.random().toString(36).substr(2, 9), username: 'Guest', avatarUrl: 'https://placehold.co/40x40/cccccc/000000?text=G' });
    }

    // Initialize Socket.IO client connection
    // Pass the user ID or token if your backend needs it for auth on connection
    socket = io(BACKEND_URL, {
      withCredentials: true, // Important for CORS and potential session/cookie handling
      query: { userId: authenticatedUser?._id, username: authenticatedUser?.username } // Pass user info
    });

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server!');
      setLoading(false);
      // Automatically join the current channel on connect
      socket.emit('joinChannel', currentChannel);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server.');
      // Handle reconnection logic if needed
    });

    // Listen for new messages from the server
    socket.on('receiveMessage', (message) => {
      // Only add the message if it belongs to the currently active channel
      if (message.channelName === currentChannel) {
        setMessages((prevMessages) => [...prevMessages, message]);
        // Scroll to the bottom of messages after new messages arrive
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });

    socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err.message);
      setError('Failed to connect to chat server.');
      setLoading(false);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.emit('leaveChannel', currentChannel); // Leave channel on component unmount/cleanup
      socket.disconnect(); // Disconnect socket on component unmount
    };
  }, []); // Run once on component mount for initial setup

  // --- Effect for fetching messages when channel changes ---
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !currentChannel) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/channels/${currentChannel}/messages`);
        // Ensure messages are sorted by timestamp
        const sortedMessages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setMessages(sortedMessages);
        setTimeout(() => { // Scroll to bottom after loading new channel history
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages for this channel.");
      } finally {
        setLoading(false);
      }
    };

    // If socket is already connected, handle joining/leaving channels
    if (socket && socket.connected) {
      // Before changing channel, leave the old one
      const prevChannel = messages.length > 0 ? messages[0].channelName : null;
      if (prevChannel && prevChannel !== currentChannel) {
        socket.emit('leaveChannel', prevChannel);
      }
      socket.emit('joinChannel', currentChannel);
    }
    fetchMessages();

    // Cleanup: When the channel changes, ensure we're set to fetch for the new one.
    // The socket.off('receiveMessage') in the first useEffect's cleanup handles the main listener.
  }, [currentChannel, user]); // Re-run when currentChannel or user changes

  // Handler for changing channels
  const handleChannelChange = (channelName) => {
    if (socket && socket.connected) {
      socket.emit('leaveChannel', currentChannel); // Explicitly leave old channel room
    }
    setCurrentChannel(channelName);
    setMessages([]); // Clear messages when switching channels to show loading state for new channel
  };

  // Handler for sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessageContent.trim()) {
      setError("Please enter a message to send.");
      return;
    }
    if (!user || !user._id) {
      setError("You must be logged in to send messages.");
      return;
    }
    if (!socket || !socket.connected) {
      setError("Not connected to the chat server.");
      return;
    }

    // Emit message via Socket.IO
    socket.emit('sendMessage', {
      channelName: currentChannel,
      content: newMessageContent,
      authorId: user._id,
      username: user.username,
      avatarUrl: user.avatarUrl
    });
    setNewMessageContent(''); // Clear input immediately
    setError(null);
  };

  if (loading && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 text-gray-700">
        <div className="flex flex-col items-center p-8 rounded-xl shadow-lg bg-white">
          <svg className="animate-spin h-8 w-8 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg font-medium">Connecting to chat server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 to-purple-50 font-inter text-gray-800">
      {/* Tailwind CSS CDN script */}
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Makeup Chat Board</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Left Sidebar for Channels */}
      <div className="w-1/4 min-w-[200px] max-w-[300px] bg-purple-800 text-white flex flex-col shadow-lg rounded-r-xl p-4">
        <h2 className="text-2xl font-bold mb-6 text-pink-300 text-center">Channels</h2>
        {user && (
          <div className="bg-purple-900 text-pink-200 text-xs font-mono px-3 py-2 rounded-lg mb-4 text-center break-all">
            Logged in as: <span className="font-semibold">{user.username}</span> (ID: {user._id.substring(0, 8)}...)
          </div>
        )}
        <nav className="flex-grow space-y-2">
          {channels.map((channelName) => (
            <button
              key={channelName}
              onClick={() => handleChannelChange(channelName)}
              className={`block w-full text-left py-2 px-3 rounded-lg transition duration-200 ease-in-out
                ${currentChannel === channelName ? 'bg-pink-600 text-white shadow-md' : 'hover:bg-purple-700 hover:text-pink-100'}`}
            >
              # {channelName}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col p-4">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-2 text-center drop-shadow-sm">
          💄 # {currentChannel} 💅
        </h1>
        <p className="text-lg text-purple-600 mb-6 text-center">
          Join the conversation on {currentChannel.toLowerCase()}!
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}

        {/* Messages Display Area */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg mb-6 overflow-y-auto custom-scrollbar">
          {messages.length === 0 && !loading ? (
            <p className="text-center text-gray-600 text-lg p-4">
              No messages in this channel yet. Start the conversation!
            </p>
          ) : (
            messages.map(message => (
              <Message key={message._id || message.timestamp} message={message} currentUserId={user?._id} />
            ))
          )}
          {loading && (
            <div className="text-center text-gray-500 mt-4">Loading messages...</div>
          )}
          <div ref={messagesEndRef} /> {/* Dummy div for auto-scrolling */}
        </div>

        {/* Message Input Form */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <input
              type="text"
              className="flex-1 shadow appearance-none border rounded-xl py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={newMessageContent}
              onChange={(e) => setNewMessageContent(e.target.value)}
              placeholder={`Send a message to #${currentChannel}...`}
              required
              disabled={!user?._id || !socket?.connected}
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
              disabled={!user?._id || !socket?.connected}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Component for a single chat message
function Message({ message, currentUserId }) {
  const timestamp = new Date(message.timestamp);
  const isCurrentUser = message.authorId === currentUserId;

  // Determine the correct avatar URL
  const avatarSrc = message.avatarUrl && message.avatarUrl.startsWith('/uploads')
    ? `${BACKEND_URL}${message.avatarUrl}` // Prepend backend URL for relative paths
    : message.avatarUrl || 'https://placehold.co/40x40/cccccc/000000?text=U'; // Fallback for missing or non-relative avatarUrl

  return (
    <div className={`chat mb-4 ${isCurrentUser ? 'chat-end' : 'chat-start'}`}>
      {/* Chat Image (Avatar) */}
      {avatarSrc && ( // Only render avatar div if avatarSrc is available
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt={`${message.username} avatar`}
              src={avatarSrc}
              className="object-cover"
              // Fallback for image loading errors
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = 'https://placehold.co/40x40/cccccc/000000?text=X'; // Broken image placeholder
              }}
            />
          </div>
        </div>
      )}

      {/* Chat Header */}
      <div className="chat-header">
        {isCurrentUser ? 'You' : message.username}
        {/* Timestamp in header for context */}
        <time className="text-xs opacity-50 ml-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>

      {/* Chat Bubble - Main Message Content */}
      <div className={`chat-bubble p-3 rounded-xl shadow-md ${isCurrentUser ? 'bg-purple-200 text-purple-800' : 'bg-gray-200 text-gray-800'}`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      {/* Chat Footer (for time as in DaisyUI example) */}
      <div className="chat-footer opacity-50">
        {isCurrentUser ? `Delivered at ` : `Seen at `}
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}

export default MessageBoardPage; // Exporting MessageBoardPage