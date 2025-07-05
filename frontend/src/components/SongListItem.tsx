import React from 'react';
import { Play } from 'lucide-react';
import type { Song } from '@/types';

interface SongListItemProps {
  song: Song;
  index: number;
}

const SongListItem = ({ song, index }: SongListItemProps) => {
  return (
    <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
    text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer">
      <div className="flex items-center justify-center">
        <span className="group-hover:hidden">{index + 1}</span>
        <Play className="h-4 w-4 bg-black hidden group-hover:block rounded-lg" />
      </div>
      
      <div className="flex items-center gap-3">
        <img
          src={song.imageUrl}
          alt={song.title}
          className="size-10 rounded"
        />
        <div>
          <div className="font-medium text-white">{song.title}</div>
          <div>{song.artist}</div>
        </div>    
      </div>
      
      <div className="flex items-center">
        {song.createdAt ? song.createdAt.split("T")[0] : 'N/A'}
      </div>
      
      <div className="flex items-center">{song.duration}s</div>
    </div>
  );
};

export default SongListItem; 