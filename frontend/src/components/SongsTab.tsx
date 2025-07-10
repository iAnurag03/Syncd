
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Music } from 'lucide-react'
import SongTable from './SongTable'
import AddSongDialog from './AddSongDialog'

const SongsTab = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2' >
               <Music className='size-5 text-[#e7436c]' />
               Songs Library
            </CardTitle>
            <CardDescription>Add/Remove Tracks </CardDescription>
          </div>
          <AddSongDialog/>
        </div>
      </CardHeader>
      <CardContent>
         <SongTable/>
      </CardContent>
    </Card>
  )
}

export default SongsTab
