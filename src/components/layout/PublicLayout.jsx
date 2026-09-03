import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PublicHeader } from "./PublicHeader";
import { PublicFooter } from "./PublicFooter";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <ScrollToTop />
      <PublicHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
