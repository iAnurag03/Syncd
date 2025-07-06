import { useMusicStore } from '@/store/useMusicStore'
import React from 'react'
import FeaturedSkeleton from './skeletons/FeaturedSkeleton';
import type { Song } from '@/types';

type FeaturedSongsProps={
    songs : Song[];
    isLoading : boolean;
}

const FeaturedSection = ({songs, isLoading}:FeaturedSongsProps) => {
  
  if(isLoading) return <FeaturedSkeleton/>


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
        {
          songs.map((song)=>(
            <div key={song._id} className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-col group cursor-pointer relative'>
                <img src={song.imageUrl} alt={song.title} className='w-16 sm:w-20 h-16 sm:h-20 object-cover flex shrink-0'/>
                <div className='flex-1 p-4'>
                <p className='font-medium truncate'>{song.title}</p>
                <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
                </div>
            </div>
          ))

        }
    </div>
  )
}

export default FeaturedSection
