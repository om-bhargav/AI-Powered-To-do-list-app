"use server";
import { auth } from "@/lib/auth";
const BACKEND = process.env.BACKEND_URL;
export async function addItem(formdata: FormData){
    const session = await auth();
    const task = formdata.get("task") ?? "";
    const response = await fetch(`${BACKEND}/items/add`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({taskname:task,userid:session?.user?.id})});
    return response.json();
}
export async function removeItem(formdata: FormData){
    const session = await auth();
    const id = formdata.get("id") ?? "";
    const response = await fetch(`${BACKEND}/items/delete`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,userid:session?.user?.id})});
    return response.json();
}
export async function updateItem(formdata: FormData){
    const session = await auth();
    const id = formdata.get("id") ?? "";
    const data = formdata.get("data") ?? ""
    const response = await fetch(`${BACKEND}/items/update`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,data,userid:session?.user?.id})});
    return response.json();
}

