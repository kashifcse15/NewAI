import React, { useEffect } from 'react'
import { useState } from 'react'
import { dummyPublishedImages } from '../assets/assets/assets'
import Loading from './Loading';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Community = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const {axios}= useAppContext();

  const fetchImages = async () => {
    try {
      const {data}=await axios.get('/api/user/published-images');
      if(data.success){
        setImages(data.images);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }
  
  useEffect(() =>{
    fetchImages();
  },[]);

  if(loading) return <Loading />

    return (
    <div className='p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll'>
      <h1 className='text-3xl font-bold mb-6 text-center text-gray-800 dark:text-green-100'>Community Gallery</h1>
      {images.length > 0 ? (
        <div className='flex flex-wrap gap-6 max-sm:justify-center'>
          {images.map((item, index) => (
            <a href={item.imageUrl} key={index} target='_blank' className='relative group block border border-gray-300 dark:border-green-600 shawoe-sm  
            overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300'>
              <img src={item.imageUrl} alt="" className='w-full h-40 md:h-50 2xl:h-62 object-cover
              group-hover:scale-105 transition-transform duration-300 ease-in-out'/>
              <p className='absolute bottom-0 right-0 bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-xl 
              opacity-0 group-hover:opacity-100 transition duration-300 text-sm'>
                Created by {item.userName}
              </p>
            </a>
          ))}

        </div>

      ) : (
        <p className='text-center text-gray-500 dark:text-gray-400'>No images published yet. Be the first to share your creation!</p>
  
  )}
    </div>
  )
}

export default Community