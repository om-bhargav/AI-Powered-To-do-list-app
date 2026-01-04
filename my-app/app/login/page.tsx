"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import SubmitButton from "@/components/SubmitButton";
const page = () => {
  const router = useRouter();
  return (
    <div className="my-10 flex-1 flex justify-center items-center">
      <form
        action={async (fd) => {
          const email = fd.get("email");
          const password = fd.get("password");
          const data = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
          });
          if(data.error){
            toast.error("Error Occured!");
          }else{
            toast.success("Signed In Successfully!");
            router.replace("/")
          }
        }}
        className="md:border gap-5 rounded p-5 max-w-[500px] grid w-full"
      >
        <div className="text-center text-xl font-semibold">
          TaskFlow AI - Login
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            placeholder="somexample@123.com"
            name="email"
            id="email"
            type="email"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="pass">Password</FieldLabel>
          <Input
            placeholder="*******"
            id="pass"
            name="password"
            type="password"
          />
        </Field>
        <SubmitButton text="Login" />
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => router.push("/signup")}
            variant="link"
          >
            Don't have any Account?
          </Button>
        </div>
      </form>
    </div>
  );
};

export default page;
