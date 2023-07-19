"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import UserAvatar from "./ui/user-avatar";
import { Session } from "next-auth";

interface MobileNavProps {
  currentUser: Session | null;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentUser:session }) => {
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
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <Separator className="my-3" />
          <div className="w-full h-auto">
            {routes.map((route) => (
              <div
                className={cn(
                  "w-full py-3 px-2 rounded-md",
                  route.active
                    ? "bg-black/10 dark:bg-white/10"
                    : "bg-transparent hover:bg-black/10"
                )}
                key={route.id}
              >
                <Link href={route.href}>{route.label}</Link>
              </div>
            ))}

            <Separator className="my-5" />
            <div className="flex flex-row items-center justify-between">
              {/* Profile  */}
              {session?.user?.email ? (
                <UserAvatar username="salman sheriff" src={session.user?.image!} />
              ) : (
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants({
                      variant: "default",
                    })
                  )}
                >
                  Sign up
                </Link>
              )}
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
