import { NavigationMenu } from "components/NavigationMenu";
import { Footer } from "components/Footer";

export const Sidebar = () => {
  return (
    <aside className="border-r border-color fixed top-0 bottom-0 flex flex-col p-4 surface z-10 overflow-scroll min-h-screen">
      <div className="flex-1">
        <NavigationMenu />
      </div>

      <Footer />
    </aside>
  );
};
