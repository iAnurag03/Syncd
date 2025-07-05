import { axiosInstance } from "@/lib/axios";
import type { Album, Song } from "@/types";
import {create} from "zustand"

type MusicStore = {
    songs: Song[];
    albums: Album[];
    isLoading:boolean;
    error:string|null;
    currAlbum: null|Album;
    currSong: null|Song;
    fetchAlbums:()=>Promise<void>;
    fetchAlbumById : (id:string)=>Promise<void>;
    fetchSongById: (id:string)=>Promise<void>;
}
export const useMusicStore = create<MusicStore>((set)=>({
    songs:[],
    albums:[],
    isLoading:false,
    error: null,
    currAlbum:null,
    currSong:null,

    fetchAlbums: async()=>{
       set({isLoading:true,error:null});
       try{
        const response = await axiosInstance.get("/albums");
        set({albums: response.data})
       }
       catch(error:any){
        set({error:error.response.data.message})
       }finally{
        set({isLoading:false})
       }
    },

    fetchAlbumById : async(albumId)=>{
       set({isLoading:true,error:null});
       try{
        const response = await axiosInstance.get(`/albums/${albumId}`);
        set({currAlbum: response.data})
       }
       catch(error:any){
        set({error:error.response.data.message})
       }finally{
        set({isLoading:false})
       }
    },

    fetchSongById: async(songId)=>{
       set({isLoading:true,error:null});
       try{
        const response = await axiosInstance.get(`/songs/${songId}`);
        set({currSong: response.data})
       }
       catch(error:any){
        set({error:error.response.data.message})
       }finally{
        set({isLoading:false})
       }
    }
}

))