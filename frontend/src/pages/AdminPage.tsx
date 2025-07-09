import AlbumsTab from '@/components/AlbumsTab';
import DashBoardHeader from '@/components/DashBoardHeader';
import DashBoardStats from '@/components/DashBoardStats';
import SongsTab from '@/components/SongsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/useAuthStore'
import { useMusicStore } from '@/store/useMusicStore';

import { Disc3, Music } from 'lucide-react';
import  { useEffect } from 'react'

const AdminPage = () => {
  const {isAdmin, isLoading} = useAuthStore();
  const {fetchAlbums, fetchSongs, fetchStats} = useMusicStore()
  useEffect(()=>{
    fetchAlbums();
    fetchSongs();
    fetchStats();
  },[fetchAlbums, fetchSongs, fetchStats])
  if(!isAdmin && !isLoading) return <div>Unauthorized</div>

 
  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8'>
      <DashBoardHeader/>
      <DashBoardStats/>

      <Tabs defaultValue='songs' className='space-y-6'>
        <TabsList className='p-1 bg-zinc-800/50'>
            <TabsTrigger value='songs' className='data-[state=active] bg-zinc-700'>
                <Music className='mr-2 size-4'/>Songs
            </TabsTrigger>
            <TabsTrigger value='albums' className='data-[state=active] bg-zinc-700'>
                <Disc3 className='mr-2 size-4'/>Albums
            </TabsTrigger>
          </TabsList>
            <TabsContent value='songs'>
               <SongsTab/>
            </TabsContent>
            <TabsContent value='albums'>
                <AlbumsTab/>
            </TabsContent>

       
      </Tabs>
    </div>
  )
}

export default AdminPage
