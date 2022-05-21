import { NavigationMenu } from "components/NavigationMenu";
import { Footer } from "components/Footer";

export const Sidebar = () => {
  return (
    <aside className="border-r border-color fixed top-0 bottom-0 flex flex-col p-4 surface z-[999999]">
      <NavigationMenu />
      <Footer />
    </aside>
  );
};
