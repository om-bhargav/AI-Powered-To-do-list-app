import { auth } from "./lib/auth";
import { NextRequest,NextResponse } from "next/server";
import { Session } from "next-auth";
interface AuthRequest extends NextRequest {
    auth: Session | null;
}

// The default export must be the handler wrapped by auth().
// We use the AuthRequest type to inform TypeScript that 'req' now has 'auth'.
export default auth(async (req: AuthRequest) => { // 👈 AuthRequest resolves the TypeScript error
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

