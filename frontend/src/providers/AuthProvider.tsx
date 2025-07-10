import React, { useEffect, useState } from 'react'
import {useAuth} from "@clerk/clerk-react"
import { Loader } from "lucide-react";
import { useAuthStore } from '@/store/useAuthStore';
import { useClerkAxios } from './useClerkAxios';
import { useChatStore } from '@/store/useChatStore';



const AuthProvider = ({children}:{children: React.ReactNode})=> {
    
     
    const {getToken, userId} = useAuth()
    const [loading, setLoading] = useState(true)
    const {checkAdminStatus} = useAuthStore();
    const {initSocket, disconnectSocket} = useChatStore()

    useClerkAxios(); 

    useEffect(()=>{
       const initAuth = async()=>{
        try{

            await checkAdminStatus();
            if(userId) initSocket(userId)
        }catch(error){
            // updateApiToken(null)
             console.log("error in auth provider", error)
        }finally{
            setLoading(false)
        }
       };

       initAuth();

        return ()=>disconnectSocket();
    },[getToken, checkAdminStatus, userId, initSocket, disconnectSocket]);


  if(loading) return (
    <div className='h-screen w-full flex items-center justify-center '>
      <Loader className="size-8 animate-spin text-[#E7436C]" />
    </div>
  )

  return <>{children}</>
}

export default AuthProvider
