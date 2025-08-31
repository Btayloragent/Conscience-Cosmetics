import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate

// IMPORTANT: Replace with your backend URL.
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

let socket;

function MessageBoardPage() {
  const [messages, setMessages] = useState([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [channels, setChannels] = useState(['General Chat', 'Makeup Looks', 'Product Reviews', 'Tips & Tricks']);
  const [currentChannel, setCurrentChannel] = useState('General Chat');
  const [user, setUser] = useState(null);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate(); // 👈 Initialize the hook

  // Function to go back
  const handleGoBack = () => {
    navigate(-1); // This navigates back one step in the browser history
  };

  const getAuthUser = () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return {
          _id: decodedToken.userId,
          username: decodedToken.username,
          avatarUrl: decodedToken.avatarUrl
        };
      }
    } catch (e) {
      console.error("Failed to parse user token:", e);
      localStorage.removeItem('token');
    }
    return null;
  };

  useEffect(() => {
    const authenticatedUser = getAuthUser();
    if (authenticatedUser) {
      setUser(authenticatedUser);
    } else {
      setUser({ _id: 'anonymous-user-' + Math.random().toString(36).substr(2, 9), username: 'Guest', avatarUrl: 'https://placehold.co/40x40/cccccc/000000?text=G' });
    }

    socket = io(BACKEND_URL, {
      withCredentials: true,
      query: { userId: authenticatedUser?._id, username: authenticatedUser?.username }
    });

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server!');
      setLoading(false);
      socket.emit('joinChannel', currentChannel);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server.');
    });

    socket.on('receiveMessage', (message) => {
      if (message.channelName === currentChannel) {
        setMessages((prevMessages) => [...prevMessages, message]);
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
      socket.emit('leaveChannel', currentChannel);
      socket.disconnect();
    };
  }, []);

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
        const sortedMessages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setMessages(sortedMessages);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages for this channel.");
      } finally {
        setLoading(false);
      }
    };

    if (socket && socket.connected) {
      const prevChannel = messages.length > 0 ? messages[0].channelName : null;
      if (prevChannel && prevChannel !== currentChannel) {
        socket.emit('leaveChannel', prevChannel);
      }
      socket.emit('joinChannel', currentChannel);
    }
    fetchMessages();
  }, [currentChannel, user]);

  const handleChannelChange = (channelName) => {
    if (socket && socket.connected) {
      socket.emit('leaveChannel', currentChannel);
    }
    setCurrentChannel(channelName);
    setMessages([]);
  };

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

    socket.emit('sendMessage', {
      channelName: currentChannel,
      content: newMessageContent,
      authorId: user._id,
      username: user.username,
      avatarUrl: user.avatarUrl
    });
    setNewMessageContent('');
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
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Makeup Chat Board</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Left Sidebar for Channels */}
      <div className="w-1/4 min-w-[200px] max-w-[300px] bg-purple-800 text-white flex flex-col shadow-lg rounded-r-xl p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-300">Channels</h2>
          <button
            onClick={handleGoBack}
            className="text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 px-4 rounded-xl transition duration-300"
          >
            Go Back
          </button>
        </div>
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
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
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
          <div ref={messagesEndRef} />
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

function Message({ message, currentUserId }) {
  const timestamp = new Date(message.timestamp);
  const isCurrentUser = message.authorId === currentUserId;

  const avatarSrc = message.avatarUrl && message.avatarUrl.startsWith('/uploads')
    ? `${BACKEND_URL}${message.avatarUrl}`
    : message.avatarUrl || 'https://placehold.co/40x40/cccccc/000000?text=U';

  return (
    <div className={`chat mb-4 ${isCurrentUser ? 'chat-end' : 'chat-start'}`}>
      {avatarSrc && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt={`${message.username} avatar`}
              src={avatarSrc}
              className="object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/40x40/cccccc/000000?text=X';
              }}
            />
          </div>
        </div>
      )}

      <div className="chat-header">
        {isCurrentUser ? 'You' : message.username}
        <time className="text-xs opacity-50 ml-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>

      <div className={`chat-bubble p-3 rounded-xl shadow-md ${isCurrentUser ? 'bg-purple-200 text-purple-800' : 'bg-gray-200 text-gray-800'}`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      <div className="chat-footer opacity-50">
        {isCurrentUser ? `Delivered at ` : `Seen at `}
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}

export default MessageBoardPage;