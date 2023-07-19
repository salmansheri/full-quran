"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UserAvatar from "./ui/user-avatar";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/mode-toggle";
import { Session } from 'next-auth'; 

interface MainNavProps {
  currentUser: Session | null; 
}

const MainNav: React.FC<MainNavProps> = ({
  currentUser: session
}) => {
 
  const pathname = usePathname();
  const routes = [
    {
      id: 1,
      label: "Home",
      active: pathname === "/",
      href: "/",
    },
  ];

  return (
    <div className="hidden md:flex space-x-10 items-center">
      {routes.map((route) => (
        <Link
          className="font-semibold  text-medium"
          href={route.href}
          key={route.id}
        >
          {route.label}
        </Link>
      ))}

      {session?.user?.email ? (
        <UserAvatar src={session?.user?.image!}  username="salman sheriff" />
      ) : (
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({
              variant: "default",
            }),
          )}
        >
          Sign in
        </Link>
      )}
      <ModeToggle />
    </div>
  );
};

export default MainNav;
