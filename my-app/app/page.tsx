"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ArrowRight } from "lucide-react";
export default function Home() {
  const router = useRouter();
  const {isAuthenticated} = useAuthStore();
  return (
      <div className="p-3 flex-1 flex justify-center items-center flex-col bg-[url('/bg-element.svg')] dark:bg-[url('/bg-dark-element.svg')] bg-cover bg-center">
          <div className="my-10 max-w-[1000px] flex justify-center flex-col items-center gap-5">
          <div className="capitalize text-lg md:text-4xl tracking-tighter leading-loose text-center font-semibold">TaskFlow AI is an AI based application to store your regular tasks and also it helps to generate headlines for your tasks if you don't know the correct headlines for your task</div>
        <div className="gap-5 w-full md:w-auto flex md:flex-row flex-col">
            {
              isAuthenticated ? 
              <>
            <Button onClick={()=>router.push("/dashboard")} size="lg" >Go To Dashboard <ArrowRight/></Button>
              </>:<>
            <Button onClick={()=>router.push("/signup")} size="lg" >Get Started</Button>
            <Button onClick={()=>router.push("/login")} size="lg" variant="outline">Already have an account ?</Button>
            </>
            }
          </div>
          </div>
      </div>
  );
}
// http://192.168.137.1:3000