import { Footer } from "./Footer";
import { NavigationMenu } from "./NavigationMenu";

export const Sidebar = () => {
  return (
    <aside className="border-r border-color-1 fixed top-0 bottom-0 flex-col p-4 bg-color-1 z-10 overflow-scroll min-h-screen hidden md:flex">
      <div className="flex-1">
        <NavigationMenu />
      </div>
      <Footer />
    </aside>
  );
};
