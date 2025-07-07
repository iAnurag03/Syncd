import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSideBar from "./LeftSideBar"
import UserActivity from "./UserActivity"
import AudioPlayer from "@/components/AudioPlayer"
import { PlaybackControls } from "./PlaybackControls"
import { useEffect, useState } from "react"



const MainLayout = () => {
  const [isMobile,setIsMobile] = useState(false);

  useEffect(()=>{
    const  checkMobile = ()=>{
      setIsMobile(window.innerWidth<768);
    };
    checkMobile();
    window.addEventListener("resize",checkMobile);
    return ()=> window.removeEventListener("resize",checkMobile);
  },[])
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <AudioPlayer/>
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
        <ResizablePanel defaultSize={20} minSize={isMobile?0:10} maxSize={30}>
            <LeftSideBar/>
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"/>
        <ResizablePanel defaultSize={isMobile?80 : 60 }>
            <Outlet/>
           
        </ResizablePanel>
        {!isMobile && (
          <>
          <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"/>
        <ResizablePanel defaultSize={20} minSize={isMobile?0:10} maxSize={30} collapsedSize={0}>
          <UserActivity/>
        </ResizablePanel>
        </>
        )}
 
      </ResizablePanelGroup>
      <PlaybackControls/>
    </div>
  )
}

export default MainLayout
