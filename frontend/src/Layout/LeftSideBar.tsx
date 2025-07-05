import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, Library, MessageCircleHeart, Search } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import FeaturedSkeleton from '@/skeletons/FeaturedSkeleton'

const LeftSideBar = () => {
  return (
    <div className='h-full flex flex-col gap-2'>
        <div className='rounded-lg bg-zinc-900 p-4'>
            <Link to ={"/"} className={cn(buttonVariants({
                variant:"ghost",
                className:"w-full justify-start text-white hover:bg-zinc-800"
            }))}>
            <HomeIcon className='mr-2 size-5'/>
            <span className='hidden md:inline'>Home</span>
            </Link>

            <Link to ={"/search"} className={cn(buttonVariants({
                variant:"ghost",
                className:"w-full justify-start text-white hover:bg-zinc-800"
            }))}>
            <Search className='mr-2 size-5'/>
            <span className='hidden md:inline'>Search</span>
            </Link>

            <SignedIn>
                <Link to ={"/chat"} className={cn(buttonVariants({
                variant:"ghost",
                className:"w-full justify-start text-white hover:bg-zinc-800"
            }))}>
            <MessageCircleHeart className='mr-2 size-5'/>
            <span className='hidden md:inline'>Message</span>
            </Link>
            </SignedIn>

        </div>

        <div className='flex-1 rounded-lg bg-zinc-900 p-4'>
            <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center text-white px-2'>
                    <Library className='size-5 mr-2'/>
                    <span className='hidden md:inline'>Featured Albums</span>
                </div>
            </div>
            <FeaturedSkeleton/>
        </div>
      
    </div>
  )
}

export default LeftSideBar
