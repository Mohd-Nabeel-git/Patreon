"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    const noScrollPages = ["/no-scroll", "/restricted-page"];

    if (noScrollPages.includes(pathname)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [pathname]);

  return <>{children}</>;
};

export default Layout;
