"use client";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
const LogoutButton = () => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated)
    return (
      <div className="flex gap-5 flex-col md:flex-row">
        <Button onClick={() => signOut({ redirect: true, redirectTo: "/" })}>
          <LogOut size={25} />
        </Button>
      </div>
    );
};

export default LogoutButton;
