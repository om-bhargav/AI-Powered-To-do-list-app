"use client";
import React,{useEffect} from 'react'
import { useAuthStore } from '@/store/useAuthStore';
import { useSession } from 'next-auth/react';
const SessionUpdation = () => {
  const {isAuthenticated,data,setUser,reset} = useAuthStore();
  const {data:session,status} = useSession();
  useEffect(()=>{
    if(status==="authenticated"){
      setUser({id: session?.user?.id ?? "",email:session?.user?.email ?? "",name:session?.user?.name ?? ""});
    }else{
        reset();
    }   
  },[isAuthenticated,session,status]);
  return null;
}

export default SessionUpdation