import React, { useEffect } from 'react'
import { LuUser, LuBot } from 'react-icons/lu'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({ message }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [message.content]) 

  return (
    <div>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#0F1A14] border border-[#1F4D36] rounded-md max-w-xl'>
            <p className='text-sm text-black dark:text-green-100'>
              {message.content}
            </p>

            <span className='text-xs text-gray-400 dark:text-green-300/70'>
              {moment(message.timestamp).fromNow()}
            </span>
          </div>

          <LuUser className='w-8 h-8 p-1 rounded-full bg-green-200 dark:bg-[#1F4D36] text-black dark:text-green-300' />
        </div>
      ) : (
        <div className='flex items-start gap-2 my-4'>
          <LuBot className='w-8 h-8 p-1 rounded-full bg-green-200 dark:bg-[#1F4D36] text-black dark:text-green-300 shrink-0' />

          <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-green-100/20 dark:bg-[#13231B] border border-[#1F4D36] rounded-md'>
            {message.isImage ? (
              <img
                src={message.content}
                alt=""
                className='w-full max-w-md mt-2 rounded-md'
              />
            ) : (
              <div className='text-sm text-black dark:text-green-100 reset-tw'>
                <Markdown>{message.content}</Markdown>
              </div>
            )}

            <span className='text-xs text-gray-400 dark:text-green-300/70'>
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message