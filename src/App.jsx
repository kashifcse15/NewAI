import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { LuMenu } from 'react-icons/lu'

const App = () => { // gradient
    const [isMenuOpen, setIsMenuOpen] = useState(null);
    return (
        <> 
        {!isMenuOpen && <LuMenu className='absolute top-3 left-3 w-8 h-8 cursor-pointer 
        md:hidden not-dark:invert text-fuchsia-50' onClick={()=>setIsMenuOpen(true)}/>}
        <div className='dark:bg-linear-to-b from-[#242124] to-[#000000]
        dark:text-white'>  
        <div className='flex h-screen w-screen'>
                <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
                <Routes>
                    <Route path='/' element={<ChatBox />} />
                    <Route path='/credits' element={<Credits />} />
                    <Route path='/community' element={<Community />} />
                </Routes>
            </div>
        </div>
            
        </>
    )
}
export default App;