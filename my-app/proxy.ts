import { auth } from "./lib/auth";
import { NextRequest,NextResponse } from "next/server";
import { Session } from "next-auth";
interface AuthRequest extends NextRequest{
    auth: Session | null
}
export default auth((req:AuthRequest)=>{
    const url = req.nextUrl.pathname;
    const loggedIn = !!req?.auth;

    if(url.startsWith("/dashboard")){
        if(!loggedIn){
            return NextResponse.redirect(new URL("/not-found",req.url));
        }
    }
    if((url.startsWith("/login") || url.startsWith("/signup")) && loggedIn){
        return NextResponse.redirect(new URL("/not-found",req.url));
    }
    return NextResponse.next();
});