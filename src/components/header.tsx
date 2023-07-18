import React from "react";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

const Header = () => {
  return (
    <header className="h-20 border-b shadow sticky top-0 bg-transparent/10 backdrop-blur-sm backdrop-filter ">
      <nav className="container w-full h-full flex items-center  justify-between">
        <div>LOGO</div>
        <MainNav />
        <MobileNav />
      </nav>
    </header>
  );
};

export default Header;
