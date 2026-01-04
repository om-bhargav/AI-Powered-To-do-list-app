import {create} from "zustand";
interface User{
    id: string;
    name: string;
    email: string;
}
interface payload{
    data: User | null;
    isAuthenticated: boolean;
    setUser: (data: User) => void
    reset: ()=>void
}
export const useAuthStore = create<payload>((set,get) => ({
    data:null,
    isAuthenticated: false,
    setUser: (data: User)=>set({isAuthenticated:true,data:data}),
    reset: ()=>{set({isAuthenticated:false,data:null})}
}));