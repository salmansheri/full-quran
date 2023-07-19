import React from "react";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import { getCurrentUser } from "@/lib/auth";

const Header = async () => {
  const currentUser = await getCurrentUser();

  return (
    <header className="h-20 border-b shadow sticky w-full top-0 bg-transparent/10 backdrop-blur-sm backdrop-filter z-50">
      <nav className="container w-full h-full flex items-center  justify-between">
        <div>LOGO</div>
        <MainNav currentUser={currentUser} />
        <MobileNav currentUser={currentUser} />
      </nav>
    </header>
  );
};

export default Header;
