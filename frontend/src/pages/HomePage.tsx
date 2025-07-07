import FeaturedSection from '@/components/FeaturedSection';
import SectionGrid from '@/components/SectionGrid';
import { ScrollArea } from '@/components/ui/scroll-area';
import Topbar from '@/Layout/Topbar'
import { useMusicStore } from '@/store/useMusicStore'
import { usePlayerStore } from '@/store/usePlayerStore';
import  { useEffect } from 'react'

const HomePage = () => {
  const {fetchFeaturedSongs, fetchTrendingSongs, isLoading, trendingSongs, featuredSongs} = useMusicStore();
   const {intializeQueue} = usePlayerStore();

  useEffect(()=>{
    fetchFeaturedSongs();
    fetchTrendingSongs();
  },[fetchFeaturedSongs, fetchTrendingSongs]);

  useEffect(()=>{
      if(featuredSongs.length>0 && trendingSongs.length>0){
        const allSongs = [...featuredSongs,...trendingSongs];
        intializeQueue(allSongs);
      }
  },[featuredSongs, trendingSongs, intializeQueue])

 
  return (
    <div>
     <Topbar/>
     <ScrollArea className='h-[calc(100vh-100px)]'>
         <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Featured Songs</h1>
          <FeaturedSection songs={featuredSongs} isLoading={isLoading}/>
          
          <div className='space-y-8'>
           <SectionGrid songs={trendingSongs} isLoading={isLoading}/>
          </div>
        </div>
     </ScrollArea>
      
    </div>
  )
}

export default HomePage
