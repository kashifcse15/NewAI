import React from 'react'
import { useNavigate,} from 'react-router-dom'
import { useEffect } from 'react'
import { useAppContext } from '../context/AppContext';

const Loading = () => {

    const navigate = useNavigate();
    const {fetchUser}= useAppContext();

    useEffect(() => {
        const timeout = setTimeout(() => {
          fetchUser();
            navigate('/')
        }, 6000);
        return () => clearTimeout(timeout);
    }, []);



return (
  <div className="bg-gradient-to-b from-[#0F1A14] via-[#13231B] to-black flex items-center justify-center h-screen w-screen">
    <div className="flex flex-col items-center gap-6">
      <div className="w-16 h-16 rounded-full border-4 border-green-400 border-t-transparent animate-spin"></div>

      <h1 className="text-3xl font-bold text-green-400">
        AI Assistant
      </h1>

      <p className="text-green-200/70">
        Loading your workspace...
      </p>
    </div>
  </div>
)
}

export default Loading