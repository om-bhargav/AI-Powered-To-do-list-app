"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {SignUpAction} from "@/actions/AuthActions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import SubmitButton from "@/components/SubmitButton";
const signup = () => {
  const router = useRouter();
  const [error,setError] = useState<undefined | string>(undefined);
  const {pending} = useFormStatus();
  return (
    <div className="my-10 flex-1 flex justify-center items-center">
      <form action={async (fd)=>{
        const data = await SignUpAction(fd);
        if(data.success){
            toast.success(data.message);
        }else{
          setError(data.message);
        }
        }} className="md:border gap-5 rounded p-5 max-w-[500px] grid w-full">
        <div className="text-center text-xl font-semibold">
          TaskFlow AI - Signup
        </div>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input required placeholder="Bob The Builder" name="name" id="name" type="text" />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input required placeholder="somexample@123.com" name="email" id="email" type="email" />
        </Field>
        <Field>
          <FieldLabel htmlFor="pass">Password</FieldLabel>
          <Input required placeholder="*******" id="pass" name="pass" type="password" />
        </Field>
        <Field>
          <FieldLabel htmlFor="cpass">Confirm Password</FieldLabel>
          <Input required placeholder="*******" id="cpass" name="cpass" type="password" />
        </Field>
        {
          error && <div className="text-red-500 text-sm text-right capitalize">{error}</div>
        }
        <SubmitButton text={"Signup"}/>
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => router.push("/login")}
            variant="link"
          >
            Already have an Account?
          </Button>
        </div>
      </form>
    </div>
  );
};

export default signup;
