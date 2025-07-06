import { axiosInstance } from "@/lib/axios";
import type { Album, Song } from "@/types";
import {create} from "zustand"

type MusicStore = {
    songs: Song[];
    albums: Album[];
    isLoading:boolean;
    error:string|null;
    currAlbum: null|Album;
    featuredSongs: Song[];
    trendingSongs:Song[];

    fetchAlbums:()=>Promise<void>;
    fetchAlbumById : (id:string)=>Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
	fetchTrendingSongs: () => Promise<void>;
}
export const useMusicStore = create<MusicStore>((set)=>({
    songs:[],
    albums:[],
    isLoading:false,
    error: null,
    currAlbum:null,
    featuredSongs:[],
	trendingSongs:[],

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
    fetchFeaturedSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/featured");
			set({ featuredSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},


	fetchTrendingSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/trending");
			set({ trendingSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
    
}

))