import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import darklogo from "../assets/dark.jpeg";
import lightlogo from "../assets/light.jpeg";
import Message from "./Message";
import {assets} from '../assets/assets/assets'
import { LuSend, LuCircleStop } from 'react-icons/lu'

const ChatBox = () => {
  const { selectedChat, theme } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false);

  const containerRef = useRef(null);

   const onSubmit = async (e) => {
        e.preventDefault();
      }

  useEffect(() => { // Update messages when selectedChat changes
    setMessages(selectedChat?.messages || []);
  }, [selectedChat]);

useEffect(() => { // Scroll to the bottom of the chat container when messages change
  if (containerRef.current) {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }
}, [messages]);

  return ( // Main container for the chat box
    <div
      className="flex-1 flex flex-col justify-between m-5 md:m-10
      xl:mx-30 max-md:mt-14 2xl:pr-40"
    >
      <div ref={containerRef} className="flex-1 mb-5 overflow-y-scroll"> {/* CHAT MESSAGES */}
        {messages.length === 0 && (
          <div
            className="h-full flex flex-col items-center justify-center
  m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40"
          >
            <img
              src={theme === "dark" ? darklogo : lightlogo}
              alt="Logo"
              className="w-full max-w-56 sm:max-w-68"
            />

            <p
              className="mt-5 text-4xl sm:text-6xl text-center
              text-gray-400 dark:text-white"
            >
              Ask me anything.
            </p>
          </div>
        )}
        {messages.map((message, index) => <Message key={index} message={message} />)}

        { // three dot
          loading && <div className='loader flex items-center gap-1.5'>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white-600 animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white-600 animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white-600 animate-bounce'></div>
          </div>

        }
      </div>

      {
        mode === "image" && (
          <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
            <p className='text-sm'> Publish generated image to Community</p>
            <input type="checkbox" className='form-checkbox h-5 w-5 text-green-600' checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
          </label>
      )}
     
      <form onSubmit={onSubmit} className='bg-green-100/20 dark:bg-[#0F1A14] border border-green-300 dark:border-[#1F4D36] rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'
>
  <select
  onChange={(e) => setMode(e.target.value)}
  value={mode}
  className='text-sm px-3 py-2 rounded-lg bg-green-100/30 dark:bg-[#13231B] border border-green-300 dark:border-[#1F4D36] text-gray-700 dark:text-green-300 outline-none cursor-pointer hover:border-green-500 transition'
>
  <option className='bg-[#13231B]' value="text">Text</option>
  <option className='bg-[#13231B]' value="image">Image</option>
</select>

  <input
    onChange={(e) => setPrompt(e.target.value)}
    value={prompt}
    type="text"
    placeholder="Type your Prompt here..."
    className='flex-1 w-full text-sm outline-none bg-transparent dark:text-white dark:placeholder:text-green-200/50'
    required
  />

  <button
  type="submit"
  disabled={loading}
  className="p-2 rounded-full bg-[#1F4D36] hover:bg-[#2A6A4A] transition"
>
  {loading ? (
    <LuCircleStop className="w-5 h-5 text-green-200" />
  ) : (
    <LuSend className="w-5 h-5 text-green-200" />
  )}
</button>
</form>
    </div>
  );
};

export default ChatBox;