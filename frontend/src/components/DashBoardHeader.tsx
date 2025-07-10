import { AudioWaveform } from 'lucide-react'
import { Link } from 'react-router-dom'


const DashBoardHeader = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
			<div className='flex items-center gap-3 mb-8'>
				<Link to='/' className='rounded-lg'>
				  <AudioWaveform className='size-10 text-[#e7436c]'/>
				</Link>
				<div>
					<h1 className='text-3xl font-bold'>Admin Dashboard</h1>
					<p className='text-zinc-400 mt-1'>Manage your music catalog</p>
				</div>
			</div>
			
		</div>
           
    </div>
  )
}

export default DashBoardHeader
