
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Disc3 } from 'lucide-react'
import AlbumsTable from './AlbumsTable'
import AddAlbumDialog from './AddAlbumDialog'

const AlbumsTab = () => {
  return (
    <Card className='bg-zinc-800/50 border-zinc-700/50'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='flex items-center gap-2'>
							<Disc3 className='h-5 w-5 text-[#1A659E]' />
							Albums Library
						</CardTitle>
						<CardDescription>Manage your album collection</CardDescription>
					</div>
					<AddAlbumDialog />
				</div>
			</CardHeader>

			<CardContent>
				<AlbumsTable />
			</CardContent>
		</Card>
  )
}

export default AlbumsTab
