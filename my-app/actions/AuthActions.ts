"use server";
const BACKEND = process.env.BACKEND_URL;
export async function SignUpAction(formdata: FormData){
    const name = formdata.get("name") ?? "";
    const email = formdata.get("email") ?? "";
    const pass = formdata.get("pass") ?? "";
    const cpass = formdata.get("cpass") ?? "";
    const response = await fetch(`${BACKEND}/auth/signup`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name,email:email,password:pass,cpass:cpass})});
    return response.json();
}

