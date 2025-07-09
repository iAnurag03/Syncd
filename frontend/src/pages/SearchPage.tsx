import FeaturedSection from "@/components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/Layout/Topbar";
import { useMusicStore } from "@/store/useMusicStore";
import { Search } from "lucide-react";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const { songs, albums, fetchAlbums, fetchSongs, isLoading } = useMusicStore();

  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  const searchHandler = (e: any) => {
    setSearchWord(e.target.value.toLowerCase());
  };
  const searchedSongs = songs.filter((song) => {
    return song.title.toLowerCase().includes(searchWord);
  });

  const searchedAlbums = albums.filter((album) => {
    return album.title.toLowerCase().includes(searchWord);
  });

  console.log(searchedSongs);
  return (
    <div>
      <Topbar />
      <div className="flex mt-8 justify-center">
        <form className="flex items-center gap-2 w-full max-w-md">
          
          <input
            type="text"
            className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-[#1A659E] focus:ring-2 focus:ring-pink-500/20 h-12 rounded-md text-white px-4 placeholder-zinc-400 transition-all duration-200 shadow-sm outline-none"
            placeholder="Enter the Title"
            value={searchWord}
            onChange={searchHandler}
           
          />
          
        </form>
      </div>
      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Songs</h1>
          {searchedSongs.length === 0 && <p>No Matches Found </p>}
          <FeaturedSection songs={searchedSongs} isLoading={isLoading} />

          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Albums</h1>
          {searchedAlbums.length === 0 && <p>No Matches Found </p>}
          {searchedAlbums.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {searchedAlbums.map((album) => (
                <Link to={`/albums/${album._id}`} key={album._id}>
                <div
                  
                  className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-col group cursor-pointer relative"
                >
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex shrink-0"
                  />
                  <div className="flex-1 p-4">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      {album.artist}
                    </p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SearchPage;
